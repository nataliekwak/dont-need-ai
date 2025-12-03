import { Button, Divider } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";
import AddAnalysisBox from "./AddAnalysisBox";

const AnalysisTab = ({ isEditable }) => {
  const { analyses, currentAssignment, currentTopic, getAllAnalyses } =
    useAssignmentStore();

  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(() => {
    return localStorage.getItem("isAnalysisExpanded") === "true";
  });
  const [addingAnalysis, setAddingAnalysis] = useState(false);

  // Update localStorage if isAnalysisExpanded changes
  useEffect(() => {
    localStorage.setItem("isAnalysisExpanded", isAnalysisExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isAnalysisExpanded]);

  useEffect(() => {
    if (
      currentAssignment &&
      currentAssignment._id &&
      currentTopic &&
      currentTopic._id
    ) {
      getAllAnalyses(currentAssignment._id, currentTopic._id);
    }
  }, [currentAssignment, currentTopic, getAllAnalyses]);

  const collapseAnalysis = () => setIsAnalysisExpanded((prev) => !prev);

  return (
    <div className="h-full flex flex-col border-medium border-default rounded-small">
      <div className="flex flex-row w-full items-center pt-3 pr-3 pl-3">
        <h3 className="font-semibold text-[1.3rem] ml-1 mr-4">Analysis</h3>
        <Button isIconOnly variant="light" size="sm" onPress={collapseAnalysis}>
          <Minus />
        </Button>
      </div>

      <div className="flex flex-col ml-4 mr-4 mb-4 justify-center h-full">
        <div className="flex self-end mb-2">
          {analyses && analyses.length > 0 && isEditable ? (
            <Button
              variant="flat"
              color="secondary"
              endContent={<Plus size={18} />}
              className="font-semibold w-fit p-0"
              onPress={() => setAddingAnalysis(true)}
            >
              Add
            </Button>
          ) : null}
        </div>
        <div>
          {analyses && analyses.length > 0 ? (
            <>
              {addingAnalysis && (
                <AddAnalysisBox
                  isEditable={isEditable}
                  initialIsEditing={true}
                  onCreate={() => {
                    setAddingAnalysis(false);
                    getAllAnalyses(currentAssignment._id, currentTopic._id);
                  }}
                  onDelete={() => setAddingAnalysis(false)}
                />
              )}
              {analyses.map((analysis) => (
                <AddAnalysisBox
                  key={analysis._id}
                  initialIsEditing={false}
                  existingAnalysis={analysis}
                  onUpdate={getAllAnalyses.bind(
                    null,
                    currentAssignment._id,
                    currentTopic._id
                  )}
                  onDelete={getAllAnalyses.bind(
                    null,
                    currentAssignment._id,
                    currentTopic._id
                  )}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="font-light text-center">
                What does the evidence tell you?
              </p>
              {addingAnalysis && isEditable ? (
                <>
                  <AddAnalysisBox
                    isEditable={isEditable}
                    initialIsEditing={true}
                    onCreate={() => {
                      setAddingAnalysis(false);
                      getAllAnalyses(currentAssignment._id, currentTopic._id);
                    }}
                    onDelete={() => setAddingAnalysis(false)}
                  />
                  <Button
                    variant="flat"
                    color="secondary"
                    startContent={<Plus />}
                    onPress={() => setAddingAnalysis(true)}
                  >
                    Add Analysis
                  </Button>
                </>
              ) : isEditable ? (
                <Button
                  variant="flat"
                  color="secondary"
                  startContent={<Plus />}
                  onPress={() => setAddingAnalysis(true)}
                >
                  Add Analysis
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisTab;
