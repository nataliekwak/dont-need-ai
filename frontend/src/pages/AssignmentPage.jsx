import React from "react";
import { useLocation } from "react-router-dom";

const AssignmentPage = () => {
  const location = useLocation();
  const assignment = location.state?.assignment;

  return (
    <div>
      <h1>{assignment.title}</h1>
    </div>
  );
};

export default AssignmentPage;
