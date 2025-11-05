import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WritingGuide from "../../src/pages/WritingGuide.jsx";
import { useAssignmentStore } from "../../src/store/assignmentsStore.js";

// Mock Zustand store
vi.mock("../../src/store/assignmentsStore.js", () => ({
  useAssignmentStore: vi.fn(),
}));

// Mock router hooks
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock components
vi.mock("../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
  AssignmentCard: ({ assignment }) => (
    <div>AssignmentCard {assignment.title}</div>
  ),
  CreateAssignmentModal: ({ isModalOpen }) => (
    <div>Modal {isModalOpen ? "open" : "closed"}</div>
  ),
}));

// Mock @heroui/react Button, Card, Spinner, Tooltip, Divider
vi.mock("@heroui/react", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Card: ({ children }) => <div>Card {children}</div>,
  CardHeader: ({ children }) => <div>CardHeader {children}</div>,
  CardBody: ({ children }) => <div>CardBody {children}</div>,
  Divider: () => <div>Divider</div>,
  Spinner: () => <div>Spinner</div>,
  Tooltip: ({ children }) => <div>{children}</div>,
  useDisclosure: () => ({
    isOpen: false,
    onOpen: vi.fn(),
    onOpenChange: vi.fn(),
  }),
}));

describe("WritingGuide Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders NavBar and main heading", () => {
    useAssignmentStore.mockReturnValue({
      assignments: [],
      isLoading: false,
      getAllAssignments: vi.fn(),
    });

    render(
      <MemoryRouter>
        <WritingGuide />
      </MemoryRouter>
    );

    expect(screen.getByText(/NavBar/)).toBeInTheDocument();
    expect(screen.getByText(/Writing Guide/)).toBeInTheDocument();
  });

  it("shows Spinner when loading", () => {
    useAssignmentStore.mockReturnValue({
      assignments: [],
      isLoading: true,
      getAllAssignments: vi.fn(),
    });

    render(
      <MemoryRouter>
        <WritingGuide />
      </MemoryRouter>
    );

    expect(screen.getByText(/Spinner/)).toBeInTheDocument();
  });

  it("renders AssignmentCards when assignments exist", () => {
    useAssignmentStore.mockReturnValue({
      assignments: [
        { _id: "1", title: "Assignment 1" },
        { _id: "2", title: "Assignment 2" },
      ],
      isLoading: false,
      getAllAssignments: vi.fn(),
    });

    render(
      <MemoryRouter>
        <WritingGuide />
      </MemoryRouter>
    );

    expect(screen.getByText(/AssignmentCard Assignment 1/)).toBeInTheDocument();
    expect(screen.getByText(/AssignmentCard Assignment 2/)).toBeInTheDocument();
  });

  it("shows empty state when no assignments", () => {
    useAssignmentStore.mockReturnValue({
      assignments: [],
      isLoading: false,
      getAllAssignments: vi.fn(),
    });

    render(
      <MemoryRouter>
        <WritingGuide />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/You currently have no assignments/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Create a New Assignment/)).toBeInTheDocument();
  });

  it("renders CreateAssignmentModal closed by default", () => {
    useAssignmentStore.mockReturnValue({
      assignments: [],
      isLoading: false,
      getAllAssignments: vi.fn(),
    });

    render(
      <MemoryRouter>
        <WritingGuide />
      </MemoryRouter>
    );

    expect(screen.getByText(/Modal closed/)).toBeInTheDocument();
  });
});
