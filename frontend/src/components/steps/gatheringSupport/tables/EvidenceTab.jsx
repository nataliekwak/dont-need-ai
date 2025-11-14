import { Button, Divider } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";

const EvidenceTab = () => {
  const { currentTopic } = useAssignmentStore();

  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(() => {
    return localStorage.getItem("isEvidenceExpanded") === "true";
  });

  // Update localStorage if isEvidenceExpanded changes
  useEffect(() => {
    localStorage.setItem("isEvidenceExpanded", isEvidenceExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isEvidenceExpanded]);

  const collapseEvidence = () => setIsEvidenceExpanded((prev) => !prev);

  return (
    <div className="h-full flex flex-col border-medium border-default rounded-small">
      <div className="flex flex-row w-full p-3">
        <h3>Evidence</h3>
        <Button isIconOnly variant="light" onPress={collapseEvidence}>
          <Minus />
        </Button>
      </div>

      <div className="flex flex-row h-[90%] m-4">
        {/* Sources box */}
        <div className="flex flex-col border-small border-default rounded-small">
          <h4>Sources</h4>
          <Divider />
          <div>
            {/* List of sources will go here */}
            {currentTopic.sourceIds.length === 0 ? (
              <p>You have no sources for '{currentTopic.name}' yet.</p>
            ) : (
              <></>
            )}
            <Button startContent={<Plus />}>Add a source</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceTab;
