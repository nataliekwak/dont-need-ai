import { useLocation, useNavigate } from "react-router-dom";
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

const AssignmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state?.assignment;

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
          <div className="flex flex-1 items-center justify-center">
            <StepContent assignment={assignment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
