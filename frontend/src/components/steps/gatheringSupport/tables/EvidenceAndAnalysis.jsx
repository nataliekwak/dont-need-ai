import { Button, Divider } from "@heroui/react";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";

const EvidenceAndAnalysis = () => {
  const {
    analyses,
    currentAssignment,
    currentTopic,
    evidence,
    getAllEvidenceByTopic,
    getAllAnalyses,
  } = useAssignmentStore();

  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(() => {
    return localStorage.getItem("isEvidenceExpanded") === "true";
  });
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(() => {
    return localStorage.getItem("isAnalysisExpanded") === "true";
  });

  // Update localStorage if isEvidenceExpanded changes
  useEffect(() => {
    localStorage.setItem("isEvidenceExpanded", isEvidenceExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isEvidenceExpanded]);

  // Update localStorage if isAnalysisExpanded changes
  useEffect(() => {
    localStorage.setItem("isAnalysisExpanded", isAnalysisExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isAnalysisExpanded]);

  // Retrieve evidence and analyses for the current topic on mount or when currentTopic changes
  useEffect(() => {
    if (currentAssignment && currentTopic) {
      getAllEvidenceByTopic(currentAssignment._id, currentTopic._id);
      getAllAnalyses(currentAssignment._id, currentTopic._id);
    }
  }, [currentAssignment, currentTopic, getAllEvidenceByTopic, getAllAnalyses]);

  const expandEvidence = () => setIsEvidenceExpanded((prev) => !prev);
  const expandAnalysis = () => setIsAnalysisExpanded((prev) => !prev);

  return (
    <>
      {/* Box for the overall table */}
      <div className="h-full flex flex-row justify-evenly border-medium border-default rounded-small">
        {/* Box for the evidence column */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-center">
            <h3>Evidence</h3>
            <Button isIconOnly variant="light" onPress={expandEvidence}>
              <Plus />
            </Button>
          </div>
          <Divider className=" h-[2px]" />

          {/* If there is evidence, display it here. Otherwise, show a message */}
          {evidence && evidence.length === 0 ? (
            <p>Click the + to begin adding evidence.</p>
          ) : (
            <>
              {/* Display evidence items here */}
              {evidence.map((item) => (
                <div key={item._id}>{item.content}</div>
              ))}
            </>
          )}
        </div>

        <Divider orientation="vertical" className="w-[2px]" />

        {/* Box for the analysis column */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-center">
            <h3>Analysis</h3>
            <Button isIconOnly variant="light" onPress={expandAnalysis}>
              <Plus />
            </Button>
          </div>
          <Divider className="h-[2px]" />

          {/* If there is analysis, display it here. Otherwise, show a message */}
          {analyses && analyses.length === 0 ? (
            <p>Click the + to begin adding analysis.</p>
          ) : (
            <>
              {analyses.map((item) => (
                <div key={item._id}>{item.content}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EvidenceAndAnalysis;
