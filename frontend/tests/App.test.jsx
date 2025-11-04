import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App.jsx";
import { useAuthStore } from "../src/store/authStore.js";

// Mock useAuthStore
vi.mock("../src/store/authStore.js", () => ({
  useAuthStore: vi.fn(),
}));

// Mock page components
vi.mock("../src/pages", () => ({
  AssignmentPage: () => <div>AssignmentPage</div>,
  EmailVerificationPage: () => <div>EmailVerificationPage</div>,
  ForgotPasswordPage: () => <div>ForgotPasswordPage</div>,
  HomePage: () => <div>HomePage</div>,
  LandingPage: () => <div>LandingPage</div>,
  LoginPage: () => <div>LoginPage</div>,
  RegisterPage: () => <div>RegisterPage</div>,
  ResetPasswordPage: () => <div>ResetPasswordPage</div>,
  WritingGuide: () => <div>WritingGuide</div>,
}));

// Mock Spinner
vi.mock("@heroui/react", () => ({
  Spinner: ({ size }) => <div>Spinner {size}</div>,
}));

describe("App.jsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows spinner when checking auth", () => {
    useAuthStore.mockReturnValue({
      isCheckingAuth: true,
      checkAuth: vi.fn(),
      isAuthenticated: false,
      user: {},
    });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Spinner/)).toBeInTheDocument();
  });

  it("renders HomePage when not authenticated", () => {
    useAuthStore.mockReturnValue({
      isCheckingAuth: false,
      checkAuth: vi.fn(),
      isAuthenticated: false,
      user: {},
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });

  it("renders LandingPage when authenticated and verified", () => {
    useAuthStore.mockReturnValue({
      isCheckingAuth: false,
      checkAuth: vi.fn(),
      isAuthenticated: true,
      user: { isVerified: true },
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("LandingPage")).toBeInTheDocument();
  });

  it("redirects to /login if not authenticated for protected route", () => {
    useAuthStore.mockReturnValue({
      isCheckingAuth: false,
      checkAuth: vi.fn(),
      isAuthenticated: false,
      user: {},
    });
    render(
      <MemoryRouter initialEntries={["/writing-guide"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("LoginPage")).toBeInTheDocument();
  });

  it("redirects to /verify-email if authenticated but not verified for protected route", () => {
    useAuthStore.mockReturnValue({
      isCheckingAuth: false,
      checkAuth: vi.fn(),
      isAuthenticated: true,
      user: { isVerified: false },
    });
    render(
      <MemoryRouter initialEntries={["/writing-guide"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("EmailVerificationPage")).toBeInTheDocument();
  });

  it("renders WritingGuide for authenticated and verified user", () => {
    useAuthStore.mockReturnValue({
      isCheckingAuth: false,
      checkAuth: vi.fn(),
      isAuthenticated: true,
      user: { isVerified: true },
    });
    render(
      <MemoryRouter initialEntries={["/writing-guide"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("WritingGuide")).toBeInTheDocument();
  });
});
