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

const AddSourceModal = ({ isModalOpen, onOpenChange }) => {
  const { currentAssignment, currentTopic, createSource, isLoading, error } =
    useAssignmentStore();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async () => {
    try {
      // Only add the fields if they are not empty
      await createSource(currentAssignment._id, currentTopic._id, {
        ...(title && { title }),
        ...(author && { author }),
        ...(publicationDate && { publicationDate }),
        ...(url && { url }),
      });
      setTitle("");
      setAuthor("");
      setPublicationDate("");
      setUrl("");
      onOpenChange(false);
    } catch (error) {
      addToast({
        title: "Error adding source",
        description: error.message,
        color: "danger",
      });
      console.error("Error adding source:", error);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        <ModalHeader>Add a Source</ModalHeader>
        <ModalBody>
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            variant="bordered"
            isRequired
          />
          <Input
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author"
            variant="bordered"
          />
          <Input
            label="Publication Date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            placeholder="Enter publication date"
            variant="bordered"
            type="date"
          />
          <Input
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            variant="bordered"
          />
        </ModalBody>
        <ModalFooter>
          {error && <p className="text-danger font-semibold">{error}</p>}
          <Button onPress={handleCreate} isLoading={isLoading}>
            Add Source
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSourceModal;
