import express from 'express';
import { register, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/authController.js';
import { verifyUser } from '../utils/verification.js'; 

const router = express.Router();

router.get('/check-auth', verifyUser, checkAuth);

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

export default router;