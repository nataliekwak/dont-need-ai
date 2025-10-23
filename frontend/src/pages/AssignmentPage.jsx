import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

import NavBar from "../components/Navbar.jsx";
import AssignmentNavigation from "../components/AssignmentNavigation.jsx";

// This page is the main container while working on
// a specific assignment in the writing guide.

const AssignmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state?.assignment;

  return (
    <div className="min-h-screen flex overflow-hidden flex-row items-center">
      <NavBar />
      <div className="w-full flex flex-col self-start mt-25 ml-10 gap-5">
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
      <div className="max-w-lg w-full flex flex-col items-center justify-center">
        <p>content</p>
      </div>
    </div>
  );
};

export default AssignmentPage;
