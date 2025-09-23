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
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
}