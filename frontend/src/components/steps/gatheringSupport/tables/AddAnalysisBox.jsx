import { Button, Textarea } from "@heroui/react";
import { Check, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";

const AddAnalysisBox = ({
  isEditable,
  initialIsEditing,
  existingAnalysis = null,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const {
    currentAssignment,
    currentTopic,
    createAnalysis,
    updateAnalysis,
    deleteAnalysis,
  } = useAssignmentStore();

  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [content, setContent] = useState(
    existingAnalysis ? existingAnalysis.content : ""
  );

  const handleClick = async () => {
    if (!isEditable) return;

    if (!existingAnalysis) {
      // Creating new analysis
      await createAnalysis(currentAssignment._id, currentTopic._id, {
        content,
      });
      setIsEditing(false);
      if (onCreate) onCreate();
    } else if (isEditing) {
      // Updating existing analysis
      await updateAnalysis(
        currentAssignment._id,
        currentTopic._id,
        existingAnalysis._id,
        { content }
      );
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (!isEditable) return;

    if (existingAnalysis) {
      await deleteAnalysis(
        currentAssignment._id,
        currentTopic._id,
        existingAnalysis._id
      );
      if (onDelete) onDelete();
    } else {
      if (onDelete) onDelete();
    }
  };

  return (
    <div className="flex flex-row justify-center items-center mb-4 mt-2">
      <Textarea
        variant="bordered"
        placeholder="Enter analysis here"
        isReadOnly={!isEditing || !isEditable}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {isEditable && (
        <div className="flex flex-col gap-2 ml-2">
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
      )}
    </div>
  );
};

export default AddAnalysisBox;
