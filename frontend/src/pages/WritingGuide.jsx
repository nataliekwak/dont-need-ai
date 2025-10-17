import { Card, CardHeader, CardBody, Divider, Spinner } from "@heroui/react";
import { useEffect } from "react";

import { useAssignmentStore } from "../store/assignmentsStore.js";
import NavBar from "../components/Navbar.jsx";
import AssignmentCard from "../components/AssignmentCard.jsx";

// Displays the list of all the user's assignments and
// gives the user the ability to create a new assignment

const WritingGuide = () => {
  const { assignments, isLoading, getAllAssignments } = useAssignmentStore();

  useEffect(() => {
    getAllAssignments();
  }, [getAllAssignments]);

  return (
    <div className="min-h-screen flex overflow-hidden flex-col">
      <NavBar />
      <div className="w-full relative flex flex-col min-h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <h1>Assignments</h1>
          </CardHeader>
          <Divider />
          <CardBody>
            {isLoading && <Spinner />}
            {assignments.length > 0 ? (
              <>
                {assignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment._id}
                    assignment={assignment}
                  />
                ))}
              </>
            ) : (
              <p>No assignments found.</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default WritingGuide;