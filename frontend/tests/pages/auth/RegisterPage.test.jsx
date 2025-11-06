import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../../../src/pages/auth/RegisterPage";
import { useAuthStore } from "../../../src/store/authStore.js";

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
  Divider: ({ ...props }) => <hr {...props} />,
  Form: ({ children, onSubmit }) => <form onSubmit={onSubmit}>{children}</form>,
  Input: ({ value, onChange, ...props }) => (
    <input {...props} value={value} onChange={onChange} />
  ),
}));

// Mock custom components
vi.mock("../../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
  PasswordStrengthMeter: () => <div>PasswordStrengthMeter</div>,
}));

describe("Register Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders NavBar, heading, and form", () => {
    useAuthStore.mockReturnValue({
      signup: vi.fn(),
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByText("NavBar")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Register" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("PasswordStrengthMeter")).toBeInTheDocument();
  });

  it("calls signup function on form submission", async () => {
    const mockSignup = vi.fn().mockResolvedValue();

    useAuthStore.mockReturnValue({
      signup: mockSignup,
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        "",
        "test@example.com",
        "password123"
      );
    });
  });

  it("shows error message if error exists", () => {
    useAuthStore.mockReturnValue({
      signup: vi.fn(),
      error: "Registration failed",
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Registration failed")).toBeInTheDocument();
  });
});
