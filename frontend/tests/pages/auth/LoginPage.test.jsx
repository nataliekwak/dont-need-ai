import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../../../src/pages/auth/LoginPage.jsx";
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

// Mock NavBar component
vi.mock("../../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
}));

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders NavBar, heading, and form", () => {
    useAuthStore.mockReturnValue({
      login: vi.fn(),
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText("NavBar")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("calls login function on form submission", async () => {
    const mockLogin = vi.fn();
    useAuthStore.mockReturnValue({
      login: mockLogin,
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("shows error message if error exists", () => {
    useAuthStore.mockReturnValue({
      login: vi.fn(),
      error: "Invalid credentials",
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
