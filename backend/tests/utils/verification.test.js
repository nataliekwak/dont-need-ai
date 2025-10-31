import { describe, expect, it, vi } from 'vitest';
import { generateVerificationToken, generateTokenAndSetCookie, verifyUser } from '../../src/utils/verification.js';

process.env.JWT_SECRET = 'testsecret';

describe('Verification Utils', () => {
    describe('generateVerificationToken', () => {
        it('should generate a 6-digit verification token', () => {
            const token = generateVerificationToken();

            expect(token).toMatch(/^\d{6}$/);
        });
    });

    describe('generateTokenAndSetCookie', () => {
        it('should generate a JWT token and set it as an HTTP-only cookie', () => {
            const res = {
                cookie: vi.fn(),
            };

            const userId = 'sampleUserId';
            const token = generateTokenAndSetCookie(res, userId);

            expect(res.cookie).toHaveBeenCalledWith('authToken', token, expect.objectContaining({
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }));
        });
    });

    describe('verifyUser', () => {
        it('should fail if no token is provided', () => {
            const req = {
                cookies: {},
            };

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };

            const next = vi.fn();

            verifyUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Unauthorized. Please log in." });
        });

        it('should fail for invalid token', () => {
            const req = {
                cookies: {
                    authToken: 'invalidtoken',
                },
            };

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };

            const next = vi.fn();

            verifyUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Unauthorized. Please log in." });
        });

        it('should verify JWT token from cookies and keep user signed in', () => {
            const req = {
                cookies: {
                    authToken: generateTokenAndSetCookie({ cookie: vi.fn() }, 'sampleUserId'),
                },
            };

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };

            const next = vi.fn();

            const { verifyUser } = require('../../src/utils/verification.js');

            verifyUser(req, res, next);

            expect(req).toHaveProperty('userId', 'sampleUserId');
            expect(next).toHaveBeenCalled();
        });
    });
});