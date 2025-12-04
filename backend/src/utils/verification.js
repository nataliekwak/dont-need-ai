import jwt from 'jsonwebtoken';

// Generates a 6-digit verification code
export const generateVerificationToken = () => { 
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generates a JWT token and sets it as an HTTP-only cookie
export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('authToken', token, {
        httpOnly: true, // Prevent XSS attacks
        secure: true, // Always use secure cookies in production (HTTPS)
        sameSite: 'none', // Required for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
}

// Middleware to verify JWT token from cookies and keep user signed in
export const verifyUser = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }

    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }
        
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }
}