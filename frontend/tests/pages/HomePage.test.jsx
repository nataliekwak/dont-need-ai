import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../src/pages/HomePage.jsx";

// Mock button and link from @heroui/react
vi.mock("@heroui/react", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

// Mock custom components
vi.mock("../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
}));

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders HomePage correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/NavBar/)).toBeInTheDocument();
    expect(screen.getByText("You don't need AI.")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
