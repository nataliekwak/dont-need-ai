import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";
import {
  AssignmentNavigation,
  NavBar,
  StepContent,
  StepProgressBar,
} from "../components";
import { useAssignmentStore } from "../store/assignmentsStore";

const AssignmentPage = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();

  const currentAssignment = useAssignmentStore(
    (state) => state.currentAssignment
  );
  const getAssignmentById = useAssignmentStore(
    (state) => state.getAssignmentById
  );

  // Fetch assignment from backend if not present
  React.useEffect(() => {
    if (!currentAssignment && assignmentId) {
      getAssignmentById(assignmentId);
    }
  }, [currentAssignment, assignmentId, getAssignmentById]);

  if (!currentAssignment) {
    return <div>Loading assignment...</div>;
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      <NavBar />
      <div
        className={`flex ${
          currentAssignment.step === 10 || currentAssignment.step === 11 ? "flex-col" : "flex-row"
        } w-full`}
      >
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
          {currentAssignment.step !== 10 && currentAssignment.step !== 11 && (
            <div>
              <AssignmentNavigation assignment={currentAssignment} />
            </div>
          )}
        </div>
        <div
          className={`flex flex-col w-full h-full ${
            currentAssignment.step !== 10 && currentAssignment.step !== 11 ? "mt-30" : "mt-3"
          } pb-10`}
        >
          <div className="flex justify-center w-full">
            <StepProgressBar currentStep={currentAssignment.step} />
          </div>
          <div
            className={`flex flex-col items-center justify-center ${
              currentAssignment.step !== 11 ? "mt-7" : ""
            } p-5`}
          >
            <StepContent assignment={currentAssignment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
