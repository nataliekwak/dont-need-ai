import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/User.js";
import { generateVerificationToken, generateTokenAndSetCookie } from "../utils/verification.js";
import { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../utils/mailtrap/emails.js";

export const register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Validate user input
        if (!email || !password || !name) {
            throw new Error("All fields are required.");
        }

        // If user already exists, don't let them register again
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("User already exists.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create token for verification
        const verificationToken = generateVerificationToken();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour from now
        });

        await user.save(); // Save new user to database

        // Authenticate user in the client
        generateTokenAndSetCookie(res, user._id);

        // Send user a verification email
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true, message: "User registered successfully.", user: {
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
        }

        user.isVerified = true;

        // Reset the verification fields
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save(); // Update the values in the db

        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { ...user._doc, password: undefined }
        })
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const logout = (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User with this email does not exist." });
        }

        // Generate a reset token and its expiry time
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 3600000; // 1 hour from now

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // Send reset email
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset email sent." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() } // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired password reset token." });
        }

        // Update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password has been reset successfully." });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.error("Error checking authentication:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}