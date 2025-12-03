import { Button, Divider } from "@heroui/react";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { useAssignmentStore } from "../../../../store/assignmentsStore";

const EvidenceAndAnalysis = ({ isEditable }) => {
  const {
    analyses,
    currentAssignment,
    currentTopic,
    evidence,
    sources,
    getAllSources,
    getAllEvidenceByTopic,
    getAllAnalyses,
    evidenceError,
    analysisError,
  } = useAssignmentStore();

  // Fetch sources for the current topic when assignment or topic changes
  useEffect(() => {
    if (
      currentAssignment &&
      currentAssignment._id &&
      currentTopic &&
      currentTopic._id
    ) {
      getAllSources(currentAssignment._id, currentTopic._id);
    }
  }, [currentAssignment, currentTopic, getAllSources]);

  // Map of sourceId from evidence to source object
  const sourceMap =
    sources && Array.isArray(sources)
      ? Object.fromEntries(sources.map((src) => [src._id, src]))
      : {};

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
    if (
      currentAssignment &&
      currentTopic &&
      !isEvidenceExpanded &&
      !isAnalysisExpanded
    ) {
      getAllEvidenceByTopic(currentAssignment._id, currentTopic._id);
      getAllAnalyses(currentAssignment._id, currentTopic._id);
    }
  }, [
    currentAssignment,
    currentTopic,
    getAllEvidenceByTopic,
    getAllAnalyses,
    isEvidenceExpanded,
    isAnalysisExpanded,
  ]);

  const expandEvidence = () => setIsEvidenceExpanded((prev) => !prev);
  const expandAnalysis = () => setIsAnalysisExpanded((prev) => !prev);

  return (
    <>
      {/* Box for the overall table */}
      <div className="h-full flex flex-row justify-evenly border-medium border-default rounded-small">
        {/* Box for the evidence column */}
        <div className="flex flex-col w-full">
          {evidenceError && (
            <div className="text-danger-500 text-sm mb-2">{evidenceError}</div>
          )}
          <div className="flex flex-row w-full justify-between items-center pl-3 pr-3">
            <h3 className="font-semibold">Evidence</h3>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={expandEvidence}
            >
              <Plus />
            </Button>
          </div>
          <Divider className=" h-[2px]" />

          {/* If there is evidence, display it here. Otherwise, show a message */}
          {evidence && evidence.length === 0 ? (
            <>
              {isEditable ? (
                <p className="mt-5 pl-3 pr-3 text-center max-w-50 text-wrap font-light">
                  Click the + to begin adding evidence.
                </p>
              ) : (
                <p className="mt-5 pl-3 pr-3 text-center max-w-50 text-wrap font-light">
                  No evidence was added for this topic.
                </p>
              )}
            </>
          ) : (
            <>
              {evidence.map((item) => (
                <div className="flex flex-col" key={item._id}>
                  {/* Show the evidence's type */}
                  <div className="text-[0.7rem] font-extralight ml-2 mt-1">
                    {item.type}
                  </div>
                  <div className="border p-2 ml-2 mr-2 mt-1 mb-1 rounded">
                    {item.content}
                  </div>
                  {/* Show the evidence's source name */}
                  <div className="text-[0.7rem] italic font-light mb-3 ml-2">
                    {sourceMap[item.sourceId]?.title || "Unknown Source"}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <Divider orientation="vertical" className="w-[2px]" />

        {/* Box for the analysis column */}
        <div className="flex flex-col w-full">
          {analysisError && (
            <div className="text-danger-500 text-sm mb-2">{analysisError}</div>
          )}
          <div className="flex flex-row w-full justify-between items-center pl-3 pr-3">
            <h3 className="font-semibold">Analysis</h3>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={expandAnalysis}
            >
              <Plus />
            </Button>
          </div>
          <Divider className="h-[2px]" />

          {/* If there is analysis, display it here. Otherwise, show a message */}
          {analyses && analyses.length === 0 ? (
            <>
              {isEditable ? (
                <p className="mt-5 pl-3 pr-3 text-center max-w-50 text-wrap font-light">
                  Click the + to begin adding analysis.
                </p>
              ) : (
                <p className="mt-5 pl-3 pr-3 text-center max-w-50 text-wrap font-light">
                  No analysis was added for this topic.
                </p>
              )}
            </>
          ) : (
            <>
              {analyses.map((item) => (
                <div key={item._id} className="border p-2 m-2 mt-3 rounded">
                  {item.content}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EvidenceAndAnalysis;
