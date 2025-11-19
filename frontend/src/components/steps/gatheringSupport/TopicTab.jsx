import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { useEffect, useState } from "react";

import { EvidenceAndAnalysis, EvidenceTab, AnalysisTab } from "./tables";

// import { useAssignmentStore } from "../../../store/assignmentsStore";

const TopicTab = () => {
  // const { currentTopic } = useAssignmentStore();

  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(false);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);

  // Retrieve the expanded states from localStorage and update on custom event
  useEffect(() => {
    const updateExpanded = () => {
      setIsEvidenceExpanded(
        localStorage.getItem("isEvidenceExpanded") === "true"
      );
      setIsAnalysisExpanded(
        localStorage.getItem("isAnalysisExpanded") === "true"
      );
    };
    updateExpanded();
    window.addEventListener("evidence-analysis-expanded", updateExpanded);
    return () =>
      window.removeEventListener("evidence-analysis-expanded", updateExpanded);
  }, []);

  return (
    <Card className="w-full flex flex-col min-h-100 border-primary border-small">
      <CardHeader>
        <p>Topic Sentence</p>
      </CardHeader>
      {/* Display the evidence and analysis for this topic side-by-side */}
      <CardBody>
        {/* Only render the tab/component that is currently expanded/visible */}
        {isEvidenceExpanded && !isAnalysisExpanded ? (
          <EvidenceTab />
        ) : !isEvidenceExpanded && isAnalysisExpanded ? (
          <AnalysisTab />
        ) : !isEvidenceExpanded && !isAnalysisExpanded ? (
          <EvidenceAndAnalysis />
        ) : null}
      </CardBody>
    </Card>
  );
};

export default TopicTab;
