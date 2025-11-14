import { Button, Divider } from "@heroui/react";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

const EvidenceAndAnalysis = () => {
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(() => {
    return localStorage.getItem("isEvidenceExpanded") === "true";
  });
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(() => {
    return localStorage.getItem("isAnalysisExpanded") === "true";
  });

  // Update localStorage if isEvidenceExpanded or isAnalysisExpanded changes
  useEffect(() => {
    localStorage.setItem("isEvidenceExpanded", isEvidenceExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isEvidenceExpanded]);
  useEffect(() => {
    localStorage.setItem("isAnalysisExpanded", isAnalysisExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isAnalysisExpanded]);

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
        </div>
      </div>
    </>
  );
};

export default EvidenceAndAnalysis;
