import { register, verifyEmail, login, logout, forgotPassword, resetPassword, checkAuth } from '../../src/controllers/authController.js';
import { User } from '../../src/models/User.js';
import { generateVerificationToken, generateTokenAndSetCookie } from '../../src/utils/verification.js';
import { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../../src/utils/mailtrap/emails.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

jest.mock('../../src/models/User.js');
jest.mock('../../src/utils/verification.js');
jest.mock('../../src/utils/mailtrap/emails.js');
jest.mock('bcryptjs');
jest.mock('crypto');

describe('authController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, userId: 'userid123' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should return error if fields are missing', async () => {
      req.body = { email: '', password: '', name: '' };
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });

    it('should return error if user already exists', async () => {
      req.body = { email: 'test@example.com', password: 'pass', name: 'Test' };
      User.findOne.mockResolvedValueOnce(true);
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false, message: 'User already exists.' }));
    });

    it('should register user and send verification email', async () => {
      req.body = { email: 'test@example.com', password: 'pass', name: 'Test' };
      User.findOne.mockResolvedValueOnce(null);
      bcrypt.hash.mockResolvedValueOnce('hashedpass');
      generateVerificationToken.mockReturnValueOnce('token123');
      const saveMock = jest.fn();
      const userObj = {
        _id: 'userid123',
        email: 'test@example.com',
        password: 'hashedpass',
        name: 'Test',
        verificationToken: 'token123',
        verificationTokenExpiresAt: Date.now() + 3600000,
        save: saveMock,
        _doc: { email: 'test@example.com', name: 'Test', password: 'hashedpass' },
      };
      User.mockImplementation(() => userObj);
      generateTokenAndSetCookie.mockImplementation(() => {});
      sendVerificationEmail.mockResolvedValueOnce();
      await register(req, res);
      expect(saveMock).toHaveBeenCalled();
      expect(generateTokenAndSetCookie).toHaveBeenCalledWith(res, 'userid123');
      expect(sendVerificationEmail).toHaveBeenCalledWith('test@example.com', 'token123');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
  });

  describe('verifyEmail', () => {
    it('should verify email if token is valid', async () => {
      req.body = { code: 'token123' };
      const saveMock = jest.fn();
      const userObj = {
        isVerified: false,
        verificationToken: 'token123',
        verificationTokenExpiresAt: Date.now() + 3600000,
        save: saveMock,
        _doc: { email: 'test@example.com', name: 'Test', password: 'hashedpass' },
      };
      User.findOne.mockResolvedValueOnce(userObj);
      await verifyEmail(req, res);
      expect(userObj.isVerified).toBe(true);
      expect(userObj.verificationToken).toBeUndefined();
      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });

    it('should return error if token is invalid or expired', async () => {
      req.body = { code: 'badtoken' };
      User.findOne.mockResolvedValueOnce(null);
      await verifyEmail(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
  });

  describe('login', () => {
    it('should return error if user not found', async () => {
      req.body = { email: 'test@example.com', password: 'pass' };
      User.findOne.mockResolvedValueOnce(null);
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });

    it('should return error if password is invalid', async () => {
      req.body = { email: 'test@example.com', password: 'wrongpass' };
      User.findOne.mockResolvedValueOnce({ password: 'hashedpass' });
      bcrypt.compare.mockResolvedValueOnce(false);
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });

    it('should login user and set cookie', async () => {
      req.body = { email: 'test@example.com', password: 'pass' };
      const saveMock = jest.fn();
      const userObj = {
        _id: 'userid123',
        password: 'hashedpass',
        save: saveMock,
        _doc: { email: 'test@example.com', name: 'Test', password: 'hashedpass' },
      };
      User.findOne.mockResolvedValueOnce(userObj);
      bcrypt.compare.mockResolvedValueOnce(true);
      generateTokenAndSetCookie.mockImplementation(() => {});
      await login(req, res);
      expect(generateTokenAndSetCookie).toHaveBeenCalledWith(res, 'userid123');
      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
  });

  describe('logout', () => {
    it('should clear cookie and return success', () => {
      logout(req, res);
      expect(res.clearCookie).toHaveBeenCalledWith('authToken');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
  });

  describe('forgotPassword', () => {
    it('should return error if user not found', async () => {
      req.body = { email: 'test@example.com' };
      User.findOne.mockResolvedValueOnce(null);
      await forgotPassword(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });

    it('should generate reset token and send email', async () => {
      req.body = { email: 'test@example.com' };
      const saveMock = jest.fn();
      const userObj = {
        email: 'test@example.com',
        save: saveMock,
      };
      User.findOne.mockResolvedValueOnce(userObj);
      crypto.randomBytes.mockReturnValueOnce({ toString: () => 'resettoken123' });
      sendPasswordResetEmail.mockResolvedValueOnce();
      process.env.CLIENT_URL = 'http://localhost:3000';
      await forgotPassword(req, res);
      expect(saveMock).toHaveBeenCalled();
      expect(sendPasswordResetEmail).toHaveBeenCalledWith('test@example.com', 'http://localhost:3000/reset-password/resettoken123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
  });

  describe('resetPassword', () => {
    it('should return error if token is invalid or expired', async () => {
      req.params = { token: 'badtoken' };
      req.body = { password: 'newpass' };
      User.findOne.mockResolvedValueOnce(null);
      await resetPassword(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });

    it('should reset password and send success email', async () => {
      req.params = { token: 'goodtoken' };
      req.body = { password: 'newpass' };
      const saveMock = jest.fn();
      const userObj = {
        email: 'test@example.com',
        save: saveMock,
        _doc: { email: 'test@example.com', name: 'Test', password: 'hashedpass' },
      };
      User.findOne.mockResolvedValueOnce(userObj);
      bcrypt.hash.mockResolvedValueOnce('hashednewpass');
      sendResetSuccessEmail.mockResolvedValueOnce();
      await resetPassword(req, res);
      expect(userObj.password).toBe('hashednewpass');
      expect(saveMock).toHaveBeenCalled();
      expect(sendResetSuccessEmail).toHaveBeenCalledWith('test@example.com');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
  });

  describe('checkAuth', () => {
    it('should return error if user not found', async () => {
      User.findById = jest.fn().mockResolvedValueOnce(null);
      await checkAuth(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });

    it('should return user if found', async () => {
      const userObj = {
        _doc: { email: 'test@example.com', name: 'Test', password: 'hashedpass' },
      };
      User.findById = jest.fn().mockResolvedValueOnce(userObj);
      userObj.select = jest.fn().mockReturnValue(userObj);
      await checkAuth(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
  });
});
