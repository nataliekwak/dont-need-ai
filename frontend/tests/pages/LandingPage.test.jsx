import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../../src/pages/LandingPage.jsx";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

// Mock heroui components
vi.mock("@heroui/react", () => ({
    Card: ({ children, ...props }) => <div {...props}>{children}</div>,
    CardBody: ({ children, ...props }) => <div {...props}>{children}</div>,
    CardHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
    CardFooter: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

// Mock useNavigate
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

// Mock custom components
vi.mock("../../src/components", () => ({
    NavBar: () => <div>NavBar</div>,
}));

describe("Landing Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders LandingPage correctly", async () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/NavBar/)).toBeInTheDocument();

        await screen.findByText("You don't need AI.");
        expect(screen.getByText("How can we help?")).toBeInTheDocument();
        expect(screen.getByText("Writing Guide")).toBeInTheDocument();
        expect(screen.getByText("Get help writing an essay.")).toBeInTheDocument();
        expect(screen.getByText("More options coming soon.")).toBeInTheDocument();
    });
});