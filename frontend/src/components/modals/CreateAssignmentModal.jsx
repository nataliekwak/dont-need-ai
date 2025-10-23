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
import { useState } from "react";

import { useAssignmentStore } from "../store/assignmentsStore.js";

const CreateAssignmentModal = ({ isModalOpen, onOpenChange }) => {
  const { createAssignment, isLoading, error } = useAssignmentStore();

  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    try {
      await createAssignment(title);
      setTitle("");
      onOpenChange(false);
    } catch (error) {
      addToast({
        title: "Error creating assignment",
        description: error.message,
        color: "danger",
      });
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>Create New Assignment</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter assignment title"
            label="Assignment Title"
            labelPlacement="outside"
            variant="bordered"
            isRequired
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          {error && <p className="text-danger font-semibold">{error}</p>}
          <Button
            onPress={handleCreate}
            isLoading={isLoading}
            isDisabled={!title.trim()}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAssignmentModal;
