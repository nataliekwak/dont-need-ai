import {
  addToast,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { useAssignmentStore } from "../store/assignmentsStore.js";

const DeleteAssignmentModal = ({ isModalOpen, onOpenChange, assignment }) => {
  const { deleteAssignment, isLoading } = useAssignmentStore();

  const [title, setTitle] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(true);

  const handleDelete = async () => {
    try {
      await deleteAssignment(assignment._id);
      onOpenChange(false);
      addToast({
        title: "Assignment deleted successfully",
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Error deleting assignment",
        description: error.message,
        color: "danger",
      });
      console.error("Error deleting assignment:", error);
    }
  };

  // Check if the title is valid whenever it changes
  useEffect(() => {
    if (title.length > 0) {
      setIsTitleValid(title === assignment.title);
    }
  }, [title, assignment.title]);

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>Delete Assignment</ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete <b>{assignment.title}</b>?
          </p>
          <Input
            label="Re-enter the assignment title to confirm"
            labelPlacement="outside-top"
            variant="bordered"
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={handleDelete}
            isLoading={isLoading}
            isDisabled={!isTitleValid}
            color="danger"
            startContent={<Trash2 />}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAssignmentModal;
