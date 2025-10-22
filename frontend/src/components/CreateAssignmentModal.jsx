import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

const CreateAssignmentModal = ({ isModalOpen, onOpenChange }) => {
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
              ></Input>
            </ModalBody>
            <ModalFooter>
                <Button>Create</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateAssignmentModal;
