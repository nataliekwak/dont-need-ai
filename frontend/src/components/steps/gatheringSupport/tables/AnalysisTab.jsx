import { Button, Divider } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

// import { useAssignmentStore } from "../../../../store/assignmentsStore";

const AnalysisTab = () => {
  // const { currentTopic } = useAssignmentStore();

  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(() => {
    return localStorage.getItem("isAnalysisExpanded") === "true";
  });

  // Update localStorage if isAnalysisExpanded changes
  useEffect(() => {
    localStorage.setItem("isAnalysisExpanded", isAnalysisExpanded);
    window.dispatchEvent(new Event("evidence-analysis-expanded"));
  }, [isAnalysisExpanded]);

  const collapseAnalysis = () => setIsAnalysisExpanded((prev) => !prev);
  return (
    <div className="h-full flex flex-col border-medium border-default rounded-small">
      <div className="flex flex-row w-full p-3">
        <h3>Analysis</h3>
        <Button isIconOnly variant="light" onPress={collapseAnalysis}>
          <Minus />
        </Button>
      </div>

      <div className="flex flex-row h-[90%] m-4"></div>
    </div>
  );
};

export default AnalysisTab;
