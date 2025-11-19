import { Button, Divider } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";
import AddAnalysisBox from "./AddAnalysisBox";

const AnalysisTab = () => {
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

  // Refresh analyses after add/update/delete
  //   const refreshAnalyses = () => {
  //     getAllAnalyses(currentAssignment._id, currentTopic._id);
  //   };

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
      <div className="flex flex-row w-full p-3">
        <h3>Analysis</h3>
        <Button isIconOnly variant="light" onPress={collapseAnalysis}>
          <Minus />
        </Button>
      </div>

      <div className="">
        {analyses && analyses.length > 0 ? (
          <>
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
            {addingAnalysis && (
              <AddAnalysisBox
                initialIsEditing={true}
                onCreate={() => {
                  setAddingAnalysis(false);
                  getAllAnalyses(currentAssignment._id, currentTopic._id);
                }}
                onDelete={() => setAddingAnalysis(false)}
              />
            )}
            <Button
              startContent={<Plus />}
              onPress={() => setAddingAnalysis(true)}
            >
              Add Analysis
            </Button>
          </>
        ) : (
          <>
            <p>What does the evidence tell you?</p>
            {addingAnalysis ? (
              <>
                <AddAnalysisBox
                  initialIsEditing={true}
                  onCreate={() => {
                    setAddingAnalysis(false);
                    getAllAnalyses(currentAssignment._id, currentTopic._id);
                  }}
                  onDelete={() => setAddingAnalysis(false)}
                />
                <Button
                  startContent={<Plus />}
                  onPress={() => setAddingAnalysis(true)}
                >
                  Add Analysis
                </Button>
              </>
            ) : (
              <Button
                startContent={<Plus />}
                onPress={() => setAddingAnalysis(true)}
              >
                Add Analysis
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysisTab;
