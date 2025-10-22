import {
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
  const { createAssignment } = useAssignmentStore();

  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    try {
      await createAssignment(title);
      setTitle("");
      onOpenChange(false);
    } catch (error) {
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
        {() => (
          <>
            <ModalHeader>Create New Assignment</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Enter assignment title"
                label="Assignment Title"
                variant="bordered"
                isRequired
                onChange={(e) => setTitle(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={handleCreate}>Create</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateAssignmentModal;
