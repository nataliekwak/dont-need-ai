import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

import NavBar from "../components/Navbar.jsx";

// This page is the main container while working on
// a specific assignment in the writing guide.

const AssignmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state?.assignment;

  return (
    <div className="min-h-screen flex overflow-hidden flex-col items-center">
      <NavBar />
      <div className="w-full flex flex-row self-start mt-25 md:ml-40 ml-10 gap-5">
        <Button
          isIconOnly
          aria-label="Go back"
          variant="light"
          onPress={() => navigate("/writing-guide")}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-3xl font-bold">Writing Guide</h1>
      </div>
      <div className="max-w-lg w-full flex flex-col items-center justify-center">
        <h1>{assignment.title}</h1>
      </div>
    </div>
  );
};

export default AssignmentPage;
