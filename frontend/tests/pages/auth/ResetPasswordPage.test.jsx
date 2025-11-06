import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form, MemoryRouter } from "react-router-dom";
import ResetPasswordPage from "../../../src/pages/auth/ResetPasswordPage";
import { useAuthStore } from "../../../src/store/authStore.js";

// Mock useAuthStore
vi.mock("../../../src/store/authStore.js", () => ({
  useAuthStore: vi.fn(),
}));

// Mock useNavigate and useParams
let mockNavigate;
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ token: "mockToken" }),
  };
});

// Mock heroui components
let mockAddToast = vi.fn();
vi.mock("@heroui/react", () => ({
  addToast: (...args) => mockAddToast(...args),
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardBody: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  Form: ({ children, onSubmit }) => <form onSubmit={onSubmit}>{children}</form>,
  Input: ({ value, onChange, ...props }) => (
    <input {...props} value={value} onChange={onChange} />
  ),
}));

// Mock NavBar component
vi.mock("../../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
}));

describe("Reset Password Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAddToast.mockClear();
    mockNavigate = vi.fn();
  });

  it("renders NavBar, heading, and form", () => {
    useAuthStore.mockReturnValue({
      isLoading: false,
      resetPassword: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    expect(screen.getByText("NavBar")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Reset Password" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
  });

  it("calls resetPassword function on form submission", async () => {
    const mockResetPassword = vi.fn().mockResolvedValue();

    useAuthStore.mockReturnValue({
      isLoading: false,
      resetPassword: mockResetPassword,
    });

    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "newpassword123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByText("Set New Password"));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith(
        "mockToken",
        "newpassword123"
      );
    });
  });

  it("shows error toast on resetPassword failure", async () => {
    const mockResetPassword = vi
      .fn()
      .mockRejectedValue(new Error("Reset failed"));

    useAuthStore.mockReturnValue({
      isLoading: false,
      resetPassword: mockResetPassword,
    });

    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "newpassword123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByText("Set New Password"));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith(
        "mockToken",
        "newpassword123"
      );

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: expect.stringContaining("Reset failed"),
          color: "danger",
        })
      );
    });
  });
});
