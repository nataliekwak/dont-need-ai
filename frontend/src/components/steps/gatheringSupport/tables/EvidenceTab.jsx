import { Button, Divider, useDisclosure } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { AddSourceModal } from "../../../modals";
import SourceEvidenceList from "./SourceEvidenceList.jsx";
import { useAssignmentStore } from "../../../../store/assignmentsStore";

const EvidenceTab = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    currentAssignment,
    currentTopic,
    currentSource,
    getAllSources,
    sources,
    setCurrentSource,
  } = useAssignmentStore();

  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(() => {
    return localStorage.getItem("isEvidenceExpanded") === "true";
  });

  // Update localStorage if isEvidenceExpanded changes
  useEffect(() => {
    localStorage.setItem("isEvidenceExpanded", isEvidenceExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isEvidenceExpanded]);

  // Retrieve sources for the current topic on mount or when currentTopic changes
  useEffect(() => {
    getAllSources(currentAssignment._id, currentTopic._id);
  }, [currentAssignment, currentTopic, getAllSources]);

  // Restore selected source from localStorage on mount or when sources change
  useEffect(() => {
    const savedSourceId = localStorage.getItem("selectedSourceId");
    if (savedSourceId && sources && sources.length > 0) {
      const found = sources.find((s) => s._id === savedSourceId);
      if (found) setCurrentSource(found);
    }
  }, [sources, setCurrentSource]);

  const collapseEvidence = () => setIsEvidenceExpanded((prev) => !prev);

  // Handle clicking on a source to set it as the current source
  // If the same source is clicked again, deselect it
  const handleSourceClick = (source) => {
    if (currentSource && currentSource._id === source._id) {
      setCurrentSource(null);
      localStorage.removeItem("selectedSourceId");
    } else {
      setCurrentSource(source);
      localStorage.setItem("selectedSourceId", source._id);
    }
  };

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
              <>
                {sources.map((source) => (
                  <div key={source._id}>
                    <Button
                      variant="light"
                      color="default"
                      radius="sm"
                      onPress={() => handleSourceClick(source)}
                      className={
                        currentSource && currentSource._id === source._id
                          ? "bg-primary-100"
                          : ""
                      }
                    >
                      <div className="flex flex-col">
                        <p className="font-semibold">{source.title}</p>
                        {source.author ? (
                          <p className="italic">{source.author}</p>
                        ) : null}
                      </div>
                    </Button>
                    <Divider />
                  </div>
                ))}
              </>
            )}
            <Button startContent={<Plus />} onPress={onOpen}>
              Add a source
            </Button>

            {/* Custom modal component to add a source*/}
            <AddSourceModal
              isModalOpen={isOpen}
              onOpenChange={(open, reason) => {
                onOpenChange();
                // If the modal was closed after a successful add, refresh sources
                if (!open && reason === "add") {
                  getAllSources(currentAssignment._id, currentTopic._id);
                }
              }}
            />
          </div>
        </div>

        {/* Evidence box for when a source is opened */}
        {currentSource && <SourceEvidenceList />}
      </div>
    </div>
  );
};

export default EvidenceTab;
