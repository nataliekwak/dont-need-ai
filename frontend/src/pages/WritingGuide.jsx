import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
import { Plus } from "lucide-react";

import { useAssignmentStore } from "../store/assignmentsStore.js";
import NavBar from "../components/Navbar.jsx";
import AssignmentCard from "../components/AssignmentCard.jsx";
import CreateAssignmentModal from "../components/CreateAssignmentModal.jsx";

// Displays the list of all the user's assignments and
// gives the user the ability to create a new assignment

const WritingGuide = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { assignments, isLoading, getAllAssignments } = useAssignmentStore();

  useEffect(() => {
    getAllAssignments();
  }, [getAllAssignments]);

  return (
    <>
      <div className="min-h-screen flex overflow-hidden flex-col items-center">
        <NavBar />
        <div className="max-w-lg w-full flex flex-col items-center mt-35">
          <Card fullWidth className="h-auto">
            <CardHeader className="flex justify-between items-center pl-6 pr-6">
              <h1 className="text-2xl font-bold">Assignments</h1>

              <Tooltip content="Create Assignment" showArrow color="foreground">
                <Button
                  variant="ghost"
                  isIconOnly
                  aria-label="Create Assignment"
                  onPress={onOpen}
                >
                  <Plus />
                </Button>
              </Tooltip>

              {/* Custom modal component to create a new assignment */}
              <CreateAssignmentModal
                isModalOpen={isOpen}
                onOpenChange={onOpenChange}
              />
            </CardHeader>
            <Divider />

            {/* List of the user's assignments */}
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
                <p>You currently have no assignments...</p>
                // TO DO: Add a button to create a new assignment
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default WritingGuide;
