import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

import {
  AssignmentNavigation,
  NavBar,
  StepContent,
  StepProgressBar,
} from "../components";

// This page is the main container while working on
// a specific assignment in the writing guide.

import { useAssignmentStore } from "../store/assignmentsStore";

const AssignmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get assignmentId from location.state
  const assignmentId = location.state?.assignment?._id;
  const assignments = useAssignmentStore((state) => state.assignments);
  const getAllAssignments = useAssignmentStore(
    (state) => state.getAllAssignments
  );

  // Find the latest assignment from the store, fallback to location.state if not found
  let assignment = assignments.find((a) => a._id === assignmentId);
  if (!assignment && location.state?.assignment) {
    assignment = location.state.assignment;
  }

  // Fetch assignments if not loaded
  React.useEffect(() => {
    if (!assignments.length) {
      getAllAssignments();
    }
  }, [assignments.length, getAllAssignments]);

  // If assignment is not found, show loading or error
  if (!assignment) {
    return <div>Loading assignment...</div>;
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      <NavBar />
      <div className="flex flex-row w-full">
        <div className="min-w-fit flex flex-col self-start mt-25 ml-10 gap-5">
          <div className="flex flex-row items-center">
            <Button
              isIconOnly
              aria-label="Go back"
              variant="light"
              onPress={() => navigate("/writing-guide")}
            >
              <ArrowLeft />
            </Button>
            <h1 className="font-stretch-expanded font-bold">Writing Guide</h1>
          </div>
          <div>
            <AssignmentNavigation assignment={assignment} />
          </div>
        </div>
        <div className="flex flex-col mt-30 w-full h-full">
          <div className="flex justify-center w-full">
            <StepProgressBar currentStep={assignment.step} />
          </div>
          <div className="flex flex-col items-center justify-center mt-10 p-5">
            <StepContent assignment={assignment} />

            {/* <div className="flex self-start"> */}
            {/* If step is 2, make back button appear */}
            {/* {assignment.step > 1 && <Button>Back</Button>} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
