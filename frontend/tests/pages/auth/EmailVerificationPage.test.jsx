import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmailVerificationPage from "../../../src/pages/auth/EmailVerificationPage.jsx";
import { useAuthStore } from "../../../src/store/authStore.js";

// Mock useAuthStore
vi.mock("../../../src/store/authStore.js", () => ({
  useAuthStore: vi.fn(),
}));

// Mock useNavigate
let mockNavigate;
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock heroui components
const mockAddToast = vi.fn();
vi.mock("@heroui/react", () => ({
  addToast: (...args) => mockAddToast(...args),
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardBody: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  InputOtp: ({ value, onValueChange }) => (
    <input
      data-testid="otp-input"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      maxLength={6}
    />
  ),
  Form: ({ children, onSubmit }) => <form onSubmit={onSubmit}>{children}</form>,
}));

// Mock NavBar component
vi.mock("../../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
}));

describe("Email Verification Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate = vi.fn();
  });

  it("renders NavBar, heading, and form", () => {
    useAuthStore.mockReturnValue({
      error: null,
      isLoading: false,
      verifyEmail: vi.fn(),
    });

    render(
      <MemoryRouter>
        <EmailVerificationPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/NavBar/)).toBeInTheDocument();
    expect(screen.getByText(/Verify Your Email/)).toBeInTheDocument();
    expect(screen.getByText(/Enter the 6-digit code/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
    expect(screen.getByTestId("otp-input")).toBeInTheDocument();
  });

  it("shows error message if error exists", () => {
    useAuthStore.mockReturnValue({
      error: "Invalid code",
      isLoading: false,
      verifyEmail: vi.fn(),
    });

    render(
      <MemoryRouter>
        <EmailVerificationPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Invalid code/)).toBeInTheDocument();
  });

  it("shows loading state on button if isLoading is true", () => {
    useAuthStore.mockReturnValue({
      error: null,
      isLoading: true,
      verifyEmail: vi.fn(),
    });

    render(
      <MemoryRouter>
        <EmailVerificationPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /verify/i });

    expect(button).toBeInTheDocument();
  });

  it("updates OTP input value on change", () => {
    useAuthStore.mockReturnValue({
      error: null,
      isLoading: false,
      verifyEmail: vi.fn(),
    });

    render(
      <MemoryRouter>
        <EmailVerificationPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("otp-input");
    fireEvent.change(input, { target: { value: "123456" } });

    expect(input.value).toBe("123456");
  });

  it("calls verifyEmail and navigates on successful submit", async () => {
    const mockVerify = vi.fn().mockResolvedValue();

    useAuthStore.mockReturnValue({
      error: null,
      isLoading: false,
      verifyEmail: mockVerify,
    });

    render(
      <MemoryRouter>
        <EmailVerificationPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("otp-input");
    fireEvent.change(input, { target: { value: "654321" } });

    const button = screen.getByRole("button", { name: /verify/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockVerify).toHaveBeenCalledWith("654321");
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.any(String),
          description: expect.any(String),
          color: "success",
        })
      );
    });
  });

  it("does not navigate or show toast if verifyEmail throws", async () => {
    const mockVerify = vi.fn().mockRejectedValue(new Error("fail"));

    useAuthStore.mockReturnValue({
      error: null,
      isLoading: false,
      verifyEmail: mockVerify,
    });

    render(
      <MemoryRouter>
        <EmailVerificationPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId("otp-input");
    fireEvent.change(input, { target: { value: "000000" } });

    const button = screen.getByRole("button", { name: /verify/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockVerify).toHaveBeenCalledWith("000000");
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(mockAddToast).not.toHaveBeenCalled();
    });
  });
});
