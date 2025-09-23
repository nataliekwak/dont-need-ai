import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateVerificationToken, generateTokenAndSetCookie } from "../utils/verification.js";

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

export const login = (req, res) => {
    res.status(200).send("login route");
}

export const logout = (req, res) => {
    res.status(200).send("logout route");
}