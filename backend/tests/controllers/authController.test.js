import { describe, expect, it, vi } from 'vitest';
import { register, verifyEmail, login, logout, forgotPassword, resetPassword, checkAuth } from '../../src/controllers/authController.js';
import * as verificationUtils from '../../src/utils/verification.js';
import * as mailUtils from '../../src/utils/mailtrap/emails.js';
import bcrypt from 'bcryptjs';

// Mock User before importing controller
vi.mock('../../src/models/User.js', () => {
    return {
        User: class {
            constructor(props) {
                this._id = 'mocked-user-id';
                this.email = props?.email ?? 'test@example.com';
                this.password = props?.password ?? 'hashedpass';
                this.name = props?.name ?? 'Test User';
                this.verificationToken = props?.verificationToken ?? 'token123';
                this.verificationTokenExpiresAt = props?.verificationTokenExpiresAt ?? (Date.now() + 3600000);
                this._doc = {
                    email: this.email,
                    name: this.name,
                    password: undefined
                };
            }
            async save() { return; }
            static async findOne() { return null; }
        }
    };
});

vi.mock('bcryptjs', () => ({
    default: {
        hash: vi.fn(),
        compare: vi.fn(() => true), // Always returns true for tests
    },
    hash: vi.fn(),
    compare: vi.fn(() => true),
}));

// Helper to create a mock user instance
function createMockUser(User, overrides = {}) {
    const defaults = {
        email: 'test@example.com',
        password: 'hashedpass',
        name: 'Test User',
        _id: 'mocked-user-id',
        verificationToken: 'token123',
        verificationTokenExpiresAt: Date.now() + 3600000,
        _doc: {
            email: 'test@example.com',
            name: 'Test User',
            password: undefined
        }
    };
    return new User({ ...defaults, ...overrides });
}

// Helper to create a mock response object
function createMockRes() {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        clearCookie: vi.fn && vi.fn() // for logout
    };
}

describe('Auth Controller', () => {

    describe('register', () => {
        it('should fail when required fields are missing', async () => {
            const noEmail = {
                body: {
                    email: '',
                    password: 'password123',
                    name: 'Test User'
                }
            };

            const noPassword = {
                body: {
                    email: 'test@example.com',
                    password: '',
                    name: 'Test User'
                }
            };

            const noName = {
                body: {
                    email: 'test@example.com',
                    password: 'password123',
                    name: ''
                }
            };

            const res = createMockRes();

            // Missing email
            await register(noEmail, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "All fields are required."
            }));

            // Reset mocks
            res.status.mockClear();
            res.json.mockClear();

            // Missing password
            await register(noPassword, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "All fields are required."
            }));

            // Reset mocks
            res.status.mockClear();
            res.json.mockClear();

            // Missing name
            await register(noName, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "All fields are required."
            }));
        });

        it('should fail when user already exists', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123',
                    name: 'Test User'
                }
            };

            const res = createMockRes();

            // Mock User.findOne to return an existing user
            const User = (await import('../../src/models/User.js')).User;
            vi.spyOn(User, 'findOne').mockResolvedValue(new User({ email: 'test@example.com' }));

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "User already exists."
            }));
        });

        it('should register a user', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123',
                    name: 'Test User'
                }
            };
            const res = createMockRes();

            // Mock User.findOne to return null (no user exists)
            const User = (await import('../../src/models/User.js')).User;
            vi.spyOn(User, 'findOne').mockResolvedValue(null);

            // Mock other dependencies
            vi.spyOn(verificationUtils, 'generateVerificationToken').mockReturnValue('token123');
            vi.spyOn(verificationUtils, 'generateTokenAndSetCookie').mockImplementation(() => { });
            vi.spyOn(mailUtils, 'sendVerificationEmail').mockResolvedValue();

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: expect.any(String),
                user: expect.objectContaining({
                    email: 'test@example.com',
                    name: 'Test User'
                })
            }));
        });
    });

    describe('verifyEmail', () => {
        it('should fail for invalid or expired code', async () => {
            const req = {
                body: {
                    code: 'invalidcode'
                }
            };

            const res = createMockRes();

            // Mock User.findOne to return null
            const { User } = await import('../../src/models/User.js');
            vi.spyOn(User, 'findOne').mockResolvedValue(null);

            await verifyEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Invalid or expired verification code."
            }));
        });

        it('should verify email', async () => {
            const req = {
                body: {
                    code: 'code123'
                }
            };

            const res = createMockRes();

            // Mock User.findOne to return a user
            const User = (await import('../../src/models/User.js')).User;
            vi.spyOn(User, 'findOne').mockResolvedValue(new User({ email: 'test@example.com' }));

            await verifyEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: "Email verified successfully."
            }));
        });
    });

    describe('login', () => {
        it('should fail when email or password is missing', async () => {
            const reqMissingEmail = {
                body: {
                    password: 'password123'
                }
            };

            const reqMissingPassword = {
                body: {
                    email: 'test@example.com'
                }
            };

            const res = createMockRes();

            await login(reqMissingEmail, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Invalid credentials"
            }));

            await login(reqMissingPassword, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Invalid credentials"
            }));
        });

        it('should fail with invalid credentials', async () => {
            // Mock bcrypt.compare to return false
            vi.mock('bcryptjs', () => ({
                default: {
                    hash: vi.fn(),
                    compare: vi.fn(() => false),
                },
                hash: vi.fn(),
                compare: vi.fn(() => false),
            }));


            const { User } = await import('../../src/models/User.js');

            const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };

            const res = createMockRes();

            // Mock User.findOne to return a user with a valid password
            const userInstance = createMockUser(User);
            vi.spyOn(User, 'findOne').mockResolvedValue(userInstance);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Invalid credentials"
            }));
        });

        it('should login a user', async () => {
            const { User } = await import('../../src/models/User.js');

            const req = { body: { email: 'test@example.com', password: 'password123' } };

            const res = createMockRes();

            // Mock User.findOne to return a user with a valid password
            const userInstance = createMockUser(User);
            vi.spyOn(User, 'findOne').mockResolvedValue(userInstance);
            vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            vi.spyOn(verificationUtils, 'generateTokenAndSetCookie').mockImplementation(() => { });
            userInstance.save = vi.fn().mockResolvedValue();

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: expect.any(String),
                user: expect.objectContaining({
                    email: 'test@example.com',
                    name: 'Test User'
                })
            }));
        });
    });

    describe('logout', () => {
        it('should logout a user', async () => {
            const req = {
                userId: 'mocked-user-id'
            };

            const res = createMockRes();

            await logout(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: "Logged out successfully"
            }));
        });
    });

    describe('forgotPassword', () => {
        it('should fail when user does not exist', async () => {
            const { User } = await import('../../src/models/User.js');

            const req = {
                body: {
                    email: 'test@example.com'
                }
            };

            const res = createMockRes();

            // Mock User.findOne to return null
            vi.spyOn(User, 'findOne').mockResolvedValue(null);
            await forgotPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "User with this email does not exist."
            }));
        });

        it('should send a password reset email', async () => {
            const { User } = await import('../../src/models/User.js');
            const userInstance = createMockUser(User);
            vi.spyOn(User, 'findOne').mockResolvedValue(userInstance);

            const mailUtils = await import('../../src/utils/mailtrap/emails.js');
            vi.spyOn(mailUtils, 'sendPasswordResetEmail').mockResolvedValue();

            const req = { body: { email: 'test@example.com' } };

            const res = createMockRes();

            await forgotPassword(req, res);

            expect(mailUtils.sendPasswordResetEmail).toHaveBeenCalledWith(userInstance.email, expect.any(String));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: "Password reset email sent."
            }));
        });
    });

    describe('resetPassword', () => {
        it('should fail for invalid or expired token', async () => {
            const { User } = await import('../../src/models/User.js');

            const req = {
                params: {
                    token: 'invalidtoken'
                },
                body: {
                    password: 'newpassword123'
                }
            };

            const res = createMockRes();

            // Mock User.findOne to return null
            vi.spyOn(User, 'findOne').mockResolvedValue(null);
            await resetPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Invalid or expired password reset token."
            }));
        });

        it('should reset the password', async () => {
            const { User } = await import('../../src/models/User.js');
            const mailUtils = await import('../../src/utils/mailtrap/emails.js');
            const bcrypt = await import('bcryptjs');

            // Create mock user
            const userInstance = new User({
                email: 'test@example.com',
                password: 'oldpass',
                name: 'Test User',
                _id: 'mocked-user-id',
                _doc: {
                    email: 'test@example.com',
                    name: 'Test User',
                    password: undefined
                }
            });

            vi.spyOn(User, 'findOne').mockResolvedValue(userInstance);
            vi.spyOn(bcrypt, 'hash').mockResolvedValue('newhashedpass');
            vi.spyOn(mailUtils, 'sendResetSuccessEmail').mockResolvedValue();
            userInstance.save = vi.fn().mockResolvedValue();

            const req = { params: { token: 'mocked-token' }, body: { password: 'new-password' } };

            const res = createMockRes();

            vi.spyOn(User, 'findOne').mockResolvedValue(userInstance);

            await resetPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: "Password has been reset successfully."
            }));
        });
    });

    describe('checkAuth', () => {
        it('should fail if user not found', async () => {
            const { User } = await import('../../src/models/User.js');

            const req = { userId: 'nonexistent-user-id' };

            const res = createMockRes();

            // Mock User.findById to return null
            User.findById = vi.fn().mockReturnValue({ select: vi.fn().mockResolvedValue(null) });

            await checkAuth(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "User not found."
            }));
        });

        it('should return user data if authenticated', async () => {
            const { User } = await import('../../src/models/User.js');
            const userInstance = createMockUser(User);

            // Mock User.findById to return an object with .select
            User.findById = vi.fn().mockReturnValue({ select: vi.fn().mockResolvedValue(userInstance) });

            const req = { userId: 'mocked-user-id' };

            const res = createMockRes();

            vi.spyOn(User, 'findOne').mockResolvedValue(userInstance);

            await checkAuth(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                user: {
                    email: 'test@example.com',
                    name: 'Test User',
                    password: undefined
                }
            }));
        });
    });
});