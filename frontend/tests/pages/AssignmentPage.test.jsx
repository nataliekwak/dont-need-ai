import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AssignmentPage from "../../src/pages/AssignmentPage.jsx";
import { useAssignmentStore } from "../../src/store/assignmentsStore.js";

// Mock useAssignmentStore
vi.mock("../../src/store/assignmentsStore.js", () => ({
  useAssignmentStore: vi.fn(),
}));

// Mock useNavigate and useParams
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ assignmentId: "1" }),
  };
});

// Mock button
vi.mock("@heroui/react", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

// Mock custom components used on page
vi.mock("../../src/components", () => ({
  NavBar: () => <div>NavBar</div>,
  AssignmentNavigation: ({ assignment }) => {
    return assignment ? (
      <div>AssignmentNavigation - {assignment.title}</div>
    ) : null;
  },
  StepProgressBar: ({ currentStep }) =>
    currentStep ? <div>StepProgressBar - Step {currentStep}</div> : null,
  StepContent: ({ assignment }) =>
    assignment ? <div>StepContent - {assignment.title}</div> : null,
}));

describe("Assignment Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when no current assignment", () => {
    useAssignmentStore.mockImplementation((selector) =>
      selector({
        currentAssignment: null,
        getAssignmentById: vi.fn(),
      })
    );

    render(
      <MemoryRouter>
        <AssignmentPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading assignment/i)).toBeInTheDocument();
  });

  it("renders assignment page when current assignment is present", () => {
    useAssignmentStore.mockImplementation((selector) =>
      selector({
        currentAssignment: { _id: "1", step: 2, title: "Test Assignment" },
        getAssignmentById: vi.fn(),
      })
    );

    render(
      <MemoryRouter>
        <AssignmentPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/NavBar/)).toBeInTheDocument();
    expect(
      screen.getByText(/AssignmentNavigation - Test Assignment/)
    ).toBeInTheDocument();
    expect(screen.getByText(/StepProgressBar - Step 2/)).toBeInTheDocument();
    expect(
      screen.getByText(/StepContent - Test Assignment/)
    ).toBeInTheDocument();
  });

  it("calls getAssignmentById when currentAssignment is null and assignmentId is present", () => {
    const mockGetAssignmentById = vi.fn();

    useAssignmentStore.mockImplementation((selector) =>
      selector({
        currentAssignment: null,
        getAssignmentById: mockGetAssignmentById,
      })
    );

    render(
      <MemoryRouter>
        <AssignmentPage />
      </MemoryRouter>
    );

    expect(mockGetAssignmentById).toHaveBeenCalledWith("1");
  });
});
