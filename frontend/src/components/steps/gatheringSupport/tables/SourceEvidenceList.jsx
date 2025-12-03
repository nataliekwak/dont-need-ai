import {
  Button,
  Listbox,
  ListboxItem,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";
import AddEvidenceBox from "./AddEvidenceBox";

// The displays a list of all evidence related to the source as a text area
const SourceEvidenceList = ({ isEditable }) => {
  const {
    getAllEvidenceBySource,
    evidence,
    currentAssignment,
    currentTopic,
    currentSource,
    setCurrentSource,
  } = useAssignmentStore();

  const [newEvidenceType, setNewEvidenceType] = useState(null);

  // Retrieve evidence for the current source on mount or when currentSource changes
  useEffect(() => {
    if (currentSource) {
      getAllEvidenceBySource(
        currentAssignment._id,
        currentTopic._id,
        currentSource._id
      );
    } else {
      // If no source is selected, clear evidence
      setCurrentSource(null);
    }
  }, [
    currentSource,
    getAllEvidenceBySource,
    currentAssignment,
    currentTopic,
    setCurrentSource,
  ]);

  // Function to handle adding new evidence
  const handleAddEvidence = (type) => {
    if (!isEditable) return;
    setNewEvidenceType(type);
  };

  // Callback to reset after evidence is created
  const handleEvidenceCreated = () => {
    if (!isEditable) return;
    setNewEvidenceType(null);
    if (currentAssignment && currentTopic && currentSource) {
      getAllEvidenceBySource(
        currentAssignment._id,
        currentTopic._id,
        currentSource._id
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {isEditable && (
        <div className="flex self-end mb-2">
          {/* Options to add evidence */}
          <Popover>
            <PopoverTrigger>
              <Button
                variant="flat"
                color="secondary"
                endContent={<Plus size={18} />}
                className="font-semibold w-fit p-0"
              >
                Add
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Listbox
                aria-label="Evidence Types"
                className="border-small rounded-small border-secondary"
              >
                <ListboxItem
                  key="direct-quote"
                  onPress={() => handleAddEvidence("Direct Quote")}
                >
                  Direct Quote
                </ListboxItem>
                <ListboxItem
                  key="paraphrase"
                  onPress={() => handleAddEvidence("Paraphrase")}
                >
                  Paraphrase
                </ListboxItem>
                <ListboxItem
                  key="note"
                  onPress={() => handleAddEvidence("Note")}
                >
                  Note
                </ListboxItem>
              </Listbox>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="flex flex-col ml-5 max-w-[500px] justify-center">
        {/* Render AddEvidenceBox for new evidence */}
        {newEvidenceType && (
          <AddEvidenceBox
            isEditable={isEditable}
            initialIsEditing={true}
            newEvidenceType={newEvidenceType}
            onCreate={handleEvidenceCreated}
            onDelete={() => setNewEvidenceType(null)}
          />
        )}

        {/* List of existing evidence for the selected source */}
        {evidence.map((ev) => (
          <AddEvidenceBox
            key={ev._id}
            initialIsEditing={false}
            existingEvidence={ev}
            onUpdate={getAllEvidenceBySource.bind(
              null,
              currentAssignment._id,
              currentTopic._id,
              currentSource._id
            )}
            onDelete={getAllEvidenceBySource.bind(
              null,
              currentAssignment._id,
              currentTopic._id,
              currentSource._id
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SourceEvidenceList;
