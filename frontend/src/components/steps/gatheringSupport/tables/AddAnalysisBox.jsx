import { Button, Textarea } from "@heroui/react";
import { Check, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";

const AddAnalysisBox = ({
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
    <div className="flex flex-row">
      <Textarea
        label="Analysis"
        labelPlacement="outside"
        variant="bordered"
        placeholder="Enter your analysis here"
        isReadOnly={!isEditing}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-col">
        <Button variant="light" isIconOnly onPress={handleClick}>
          {isEditing ? <Check /> : <SquarePen />}
        </Button>
        <Button variant="light" isIconOnly onPress={handleDelete}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default AddAnalysisBox;
