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

import { useAssignmentStore } from "../../store/assignmentsStore.js";

const EditTitleModal = ({ isModalOpen, onOpenChange, assignment }) => {
  const { updateAssignment, isLoading } = useAssignmentStore();

  const [title, setTitle] = useState("");

  const handleUpdate = async () => {
    try {
      await updateAssignment(assignment._id, { title });
      setTitle("");
      onOpenChange(false);
    } catch (error) {
      addToast({
        title: "Error updating assignment",
        description: error.message,
        color: "danger",
      });
      console.error("Error updating assignment:", error);
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
        <ModalHeader>Edit Assignment Title</ModalHeader>
        <ModalBody>
          <Input
            label="New Assignment Title"
            labelPlacement="outside-top"
            variant="bordered"
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={handleUpdate}
            isLoading={isLoading}
            isDisabled={!title.trim()}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTitleModal;
