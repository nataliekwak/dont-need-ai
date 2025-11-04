import "@testing-library/jest-dom";
import { useAuthStore } from '../../src/store/authStore.js';
import axios from 'axios';

// Mock axios
vi.mock('axios', () => {
	return {
		default: {
			defaults: { withCredentials: false },
			get: vi.fn(),
			post: vi.fn(),
		},
	};
});

describe('authStore', () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			isAuthenticated: false,
			error: null,
			isLoading: false,
			isCheckingAuth: true,
			message: null,
		});
		vi.clearAllMocks();
	});

	it('has correct initial state', () => {
		const state = useAuthStore.getState();

		expect(state.user).toBe(null);
		expect(state.isAuthenticated).toBe(false);
		expect(state.error).toBe(null);
		expect(state.isLoading).toBe(false);
		expect(state.isCheckingAuth).toBe(true);
		expect(state.message).toBe(null);
	});

	it('checkAuth sets user and isAuthenticated on success', async () => {
		axios.get.mockResolvedValue({ data: { user: { name: 'Test', isVerified: true } } });


		await useAuthStore.getState().checkAuth();
		const state = useAuthStore.getState();

		expect(state.user).toEqual({ name: 'Test', isVerified: true });
		expect(state.isAuthenticated).toBe(true);
		expect(state.isCheckingAuth).toBe(false);
	});

	it('checkAuth sets isAuthenticated false on error', async () => {
		axios.get.mockRejectedValue(new Error('fail'));

		await useAuthStore.getState().checkAuth();
		const state = useAuthStore.getState();

		expect(state.isAuthenticated).toBe(false);
		expect(state.isCheckingAuth).toBe(false);
	});

	it('signup sets user and isAuthenticated on success', async () => {
		axios.post.mockResolvedValue({ data: { user: { name: 'NewUser', isVerified: false } } });

		await useAuthStore.getState().signup('NewUser', 'new@user.com', 'pass');
		const state = useAuthStore.getState();

		expect(state.user).toEqual({ name: 'NewUser', isVerified: false });
		expect(state.isAuthenticated).toBe(true);
		expect(state.isLoading).toBe(false);
	});

	it('signup sets error on failure', async () => {
		axios.post.mockRejectedValue({ response: { data: { message: 'Signup error' } } });

		await expect(useAuthStore.getState().signup('a', 'b', 'c')).rejects.toBeDefined();
		const state = useAuthStore.getState();

		expect(state.error).toBe('Signup error');
		expect(state.isLoading).toBe(false);
	});

	it('login sets user and isAuthenticated on success', async () => {
		axios.post.mockResolvedValue({ data: { user: { name: 'LoginUser', isVerified: true } } });

		await useAuthStore.getState().login('login@user.com', 'pass');
		const state = useAuthStore.getState();

		expect(state.user).toEqual({ name: 'LoginUser', isVerified: true });
		expect(state.isAuthenticated).toBe(true);
		expect(state.isLoading).toBe(false);
	});

	it('login sets error on failure', async () => {
		axios.post.mockRejectedValue({ response: { data: { message: 'Login error' } } });

		await expect(useAuthStore.getState().login('a', 'b')).rejects.toBeDefined();
		const state = useAuthStore.getState();

		expect(state.error).toBe('Login error');
		expect(state.isLoading).toBe(false);
	});

	it('logout resets user and isAuthenticated on success', async () => {
		axios.post.mockResolvedValue({});
		useAuthStore.setState({ user: { name: 'User' }, isAuthenticated: true });

		await useAuthStore.getState().logout();
		const state = useAuthStore.getState();

		expect(state.user).toBe(null);
		expect(state.isAuthenticated).toBe(false);
		expect(state.isLoading).toBe(false);
	});

	it('logout sets error on failure', async () => {
		axios.post.mockRejectedValue({ response: { data: { message: 'Logout error' } } });

		await expect(useAuthStore.getState().logout()).rejects.toBeDefined();
		const state = useAuthStore.getState();

		expect(state.error).toBe('Logout error');
		expect(state.isLoading).toBe(false);
	});

	it('verifyEmail sets user and isAuthenticated on success', async () => {
		axios.post.mockResolvedValue({ data: { user: { name: 'User', isVerified: true } } });

		await useAuthStore.getState().verifyEmail('code');
		const state = useAuthStore.getState();

		expect(state.user).toEqual({ name: 'User', isVerified: true });
		expect(state.isAuthenticated).toBe(true);
		expect(state.isLoading).toBe(false);
	});

	it('verifyEmail sets error on failure', async () => {
		axios.post.mockRejectedValue({ response: { data: { message: 'Verify error' } } });

		await expect(useAuthStore.getState().verifyEmail('bad')).rejects.toBeDefined();
		const state = useAuthStore.getState();

		expect(state.error).toBe('Verify error');
		expect(state.isLoading).toBe(false);
	});

	it('forgotPassword sets message on success', async () => {
		axios.post.mockResolvedValue({ data: { message: 'Email sent' } });

		await useAuthStore.getState().forgotPassword('a@b.com');
		const state = useAuthStore.getState();

		expect(state.message).toBe('Email sent');
		expect(state.isLoading).toBe(false);
	});

	it('forgotPassword sets error on failure', async () => {
		axios.post.mockRejectedValue({ response: { data: { message: 'Forgot error' } } });

		await expect(useAuthStore.getState().forgotPassword('bad')).rejects.toBeDefined();
		const state = useAuthStore.getState();

		expect(state.error).toBe('Forgot error');
		expect(state.isLoading).toBe(false);
	});

	it('resetPassword sets message on success', async () => {
		axios.post.mockResolvedValue({ data: { message: 'Password reset' } });

		await useAuthStore.getState().resetPassword('token', 'newpass');
		const state = useAuthStore.getState();

		expect(state.message).toBe('Password reset');
		expect(state.isLoading).toBe(false);
	});

	it('resetPassword sets error on failure', async () => {
		axios.post.mockRejectedValue({ response: { data: { message: 'Reset error' } } });

		await expect(useAuthStore.getState().resetPassword('bad', 'bad')).rejects.toBeDefined();
		const state = useAuthStore.getState();

		expect(state.error).toBe('Reset error');
		expect(state.isLoading).toBe(false);
	});
});
