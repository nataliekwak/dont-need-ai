import { Button, Textarea } from "@heroui/react";
import { Check, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";

const AddEvidenceBox = ({
  initialIsEditing,
  newEvidenceType,
  existingEvidence = null,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const {
    currentAssignment,
    currentTopic,
    currentSource,
    createEvidence,
    updateEvidence,
    deleteEvidence,
  } = useAssignmentStore();

  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [content, setContent] = useState(
    existingEvidence ? existingEvidence.content : ""
  );
  const evidenceType = existingEvidence
    ? existingEvidence.type
    : newEvidenceType;

  const handleClick = async () => {
    if (!existingEvidence) {
      // Creating new evidence
      await createEvidence(
        currentAssignment._id,
        currentTopic._id,
        currentSource._id,
        {
          type: evidenceType,
          content,
        }
      );
      setIsEditing(false);
      if (onCreate) onCreate();
    } else if (isEditing) {
      // Updating existing evidence
      await updateEvidence(
        currentAssignment._id,
        currentTopic._id,
        currentSource._id,
        existingEvidence._id,
        {
          content,
        }
      );
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (existingEvidence) {
      await deleteEvidence(
        currentAssignment._id,
        currentTopic._id,
        currentSource._id,
        existingEvidence._id
      );
      if (onDelete) onDelete();
    } else {
      // If it's new evidence being created, just call onDelete to remove the box from the UI
      if (onDelete) onDelete();
    }
  };

  return (
    <div className="flex flex-row justify-center items-center mb-4">
      <Textarea
        label={evidenceType}
        labelPlacement="outside"
        variant="bordered"
        placeholder={`Enter ${evidenceType.toLowerCase()} here`}
        isReadOnly={!isEditing}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-col gap-2 pt-4 ml-2">
        <Button variant="light" size="sm" isIconOnly onPress={handleClick}>
          {isEditing ? <Check /> : <SquarePen />}
        </Button>
        <Button
          variant="light"
          size="sm"
          className="hover:text-danger"
          isIconOnly
          onPress={handleDelete}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default AddEvidenceBox;
