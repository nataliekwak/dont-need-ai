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
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AssignmentCard, CreateAssignmentModal, NavBar } from "../components";
import { useAssignmentStore } from "../store/assignmentsStore.js";

// Displays the list of all the user's assignments and
// gives the user the ability to create a new assignment

const WritingGuide = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { assignments, isLoading, getAllAssignments } = useAssignmentStore();

  useEffect(() => {
    getAllAssignments();
  }, [getAllAssignments]);

  return (
    <>
      <div className="min-h-screen flex overflow-hidden flex-col items-center">
        <NavBar />
        <div className="w-full flex flex-row self-start mt-25 md:ml-40 ml-10 gap-5">
          <Button
            isIconOnly
            aria-label="Go back"
            variant="light"
            onPress={() => navigate("/")}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold">Writing Guide</h1>
        </div>
        <div className="max-w-lg w-full flex flex-col items-center justify-center">
          <Card fullWidth className="h-auto mt-10">
            <CardHeader className="flex justify-between items-center pl-6 pr-6">
              <h1 className="text-2xl font-bold">Assignments</h1>

              {/* Create Assignment Button */}
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
                onOpenChange={() => {
                  onOpenChange();
                  getAllAssignments();
                }}
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
                // If there are no assignments, show a message and a 'Create Assignment' button
                <div className="flex flex-col items-center min-h-60 gap-5 pt-10 width-10">
                  <p className="font-semibold">
                    You currently have no assignments...
                  </p>
                  <Button
                    onPress={onOpen}
                    variant="ghost"
                    startContent={<Plus />}
                  >
                    Create a New Assignment
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default WritingGuide;
