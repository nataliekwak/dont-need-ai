import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ForgotPasswordPage from "../../../src/pages/auth/ForgotPasswordPage";
import { useAuthStore } from "../../../src/store/authStore.js";
import { Card } from "@heroui/react";

// Mock useAuthStore
vi.mock("../../../src/store/authStore.js", () => ({
  useAuthStore: vi.fn(),
}));

// Mock Link from react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

// Mock heroui components
vi.mock("@heroui/react", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardBody: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardFooter: ({ children, ...props }) => <div {...props}>{children}</div>,
  Form: ({ children, onSubmit }) => <form onSubmit={onSubmit}>{children}</form>,
  Input: ({ value, onChange, ...props }) => (
    <input {...props} value={value} onChange={onChange} />
  ),
  Divider: ({ ...props }) => <hr {...props} />,
}));

// Mock NavBar component
vi.mock("../../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
}));

describe("ForgotPasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders NavBar, heading, and form", () => {
    useAuthStore.mockReturnValue({
      isLoading: false,
      forgotPassword: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    );

    expect(screen.getByText("NavBar")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Send Reset Link")).toBeInTheDocument();
  });

  it("submits the form and shows confirmation message", async () => {
    const mockForgotPassword = vi.fn().mockResolvedValue();

    useAuthStore.mockReturnValue({
      isLoading: false,
      forgotPassword: mockForgotPassword,
    });

    render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByText("Send Reset Link"));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith("test@example.com");
      expect(
        screen.getByText((content) =>
          content.includes("you will receive a password reset link shortly")
        )
      ).toBeInTheDocument();
    });
  });
});
