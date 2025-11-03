import { describe, expect, it, vi } from 'vitest';
import { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../../src/utils/mailtrap/emails.js';
import { mailtrapClient } from '../../src/utils/mailtrap/mailtrap.config.js';

describe('Emails Tests', () => {

    describe('sendVerificationEmail', () => {
        it('should send a verification email to the user', async () => {
            const userEmail = 'test@example.com';
            const verificationToken = '994';
            const sendMock = vi.fn().mockResolvedValue({ success: true });
            vi.spyOn(mailtrapClient, 'send').mockImplementation(sendMock);

            await sendVerificationEmail(userEmail, verificationToken);

            expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
                to: [{ email: userEmail }],
                subject: 'Verify your email',
                html: expect.stringContaining(verificationToken),
                category: 'Email Verification',
            }));
        });

        it('should handle errors when sending verification email', async () => {
            const userEmail = 'test@example.com';
            const verificationToken = '994';
            const sendMock = vi.fn().mockResolvedValue({ success: false });
            vi.spyOn(mailtrapClient, 'send').mockImplementation(sendMock);

            await sendVerificationEmail(userEmail, verificationToken);

            expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
                to: [{ email: userEmail }],
                subject: 'Verify your email',
                html: expect.stringContaining(verificationToken),
                category: 'Email Verification',
            }));
        });
    });

    describe('sendPasswordResetEmail', () => {
        it('should send a password reset email to the user', async () => {
            const userEmail = 'test@example.com';
            const resetURL = 'https://example.com/reset';
            const sendMock = vi.fn().mockResolvedValue({ success: true });
            vi.spyOn(mailtrapClient, 'send').mockImplementation(sendMock);

            await sendPasswordResetEmail(userEmail, resetURL);

            expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
                to: [{ email: userEmail }],
                subject: 'Password Reset Request',
                html: expect.stringContaining(resetURL),
                category: 'Password Reset',
            }));
        });

        it('should handle errors when sending password reset email', async () => {
            const userEmail = 'test@example.com';
            const resetURL = 'https://example.com/reset';
            const sendMock = vi.fn().mockResolvedValue({ success: false });
            vi.spyOn(mailtrapClient, 'send').mockImplementation(sendMock);

            await sendPasswordResetEmail(userEmail, resetURL);

            expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
                to: [{ email: userEmail }],
                subject: 'Password Reset Request',
                html: expect.stringContaining(resetURL),
                category: 'Password Reset',
            }));
        });
    });

    describe('sendResetSuccessEmail', () => {
        it('should send a password reset success email to the user', async () => {
            const userEmail = 'test@example.com';
            const sendMock = vi.fn().mockResolvedValue({ success: true });
            vi.spyOn(mailtrapClient, 'send').mockImplementation(sendMock);

            await sendResetSuccessEmail(userEmail);

            expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
                to: [{ email: userEmail }],
                subject: 'Password Reset Successful',
                html: expect.stringContaining('Your password has been successfully reset.'),
                category: 'Password Reset',
            }));
        });

        it('should handle errors when sending password reset success email', async () => {
            const userEmail = 'test@example.com';
            const sendMock = vi.fn().mockResolvedValue({ success: false });
            vi.spyOn(mailtrapClient, 'send').mockImplementation(sendMock);

            await sendResetSuccessEmail(userEmail);

            expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
                to: [{ email: userEmail }],
                subject: 'Password Reset Successful',
                html: expect.stringContaining('Your password has been successfully reset.'),
                category: 'Password Reset',
            }));
        });
    });
});