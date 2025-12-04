import { Card, CardBody, CardHeader, Input, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";

import {
  EvidenceAndAnalysis,
  EvidenceTab,
  AnalysisTab,
} from "./steps/gatheringSupport/tables";

import { useAssignmentStore } from "../store/assignmentsStore.js";

const TopicSummary = ({ isEditable }) => {
  const { currentTopic, updateTopic } = useAssignmentStore();

  const [topicSentence, setTopicSentence] = useState("");
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(false);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);

  // Set initial topic sentence from currentTopic
  useEffect(() => {
    if (currentTopic && currentTopic.topicSentence) {
      setTopicSentence(currentTopic.topicSentence);
    } else {
      setTopicSentence("");
    }
  }, [currentTopic]);

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
    <Card
      className={`
        flex flex-col min-h-100 border-primary border-medium
        ${!isEditable ? "h-full w-full" : "w-full max-w-[900px]"}
      `}
    >
      {/* The header contains the input for the topic's topic sentence */}
      <CardHeader className="flex flex-col self-start text-left">
        <Textarea
          label="Topic Sentence"
          labelPlacement="outside-top"
          variant="bordered"
          placeholder="Enter the topic sentence for this paragraph here."
          isReadOnly={!isEditable}
          value={topicSentence}
          onValueChange={setTopicSentence}
          onClear={
            isEditable
              ? () => {
                  setTopicSentence("");
                  if (currentTopic) {
                    updateTopic(
                      currentTopic.assignmentId ||
                        currentTopic.assignment_id ||
                        currentTopic.assignment,
                      currentTopic._id,
                      { topicSentence: "" }
                    );
                  }
                }
              : undefined
          }
          onBlur={
            isEditable
              ? () => {
                  if (
                    currentTopic &&
                    topicSentence !== currentTopic.topicSentence &&
                    topicSentence.trim() !== ""
                  ) {
                    updateTopic(
                      currentTopic.assignmentId ||
                        currentTopic.assignment_id ||
                        currentTopic.assignment,
                      currentTopic._id,
                      { topicSentence }
                    );
                  }
                }
              : undefined
          }
        />
      </CardHeader>

      {/* Display the evidence and analysis for this topic side-by-side */}
      <CardBody>
        {/* Only render the tab/component that is currently expanded/visible */}
        {isEvidenceExpanded && !isAnalysisExpanded ? (
          <EvidenceTab isEditable={isEditable} />
        ) : !isEvidenceExpanded && isAnalysisExpanded ? (
          <AnalysisTab isEditable={isEditable} />
        ) : !isEvidenceExpanded && !isAnalysisExpanded ? (
          <EvidenceAndAnalysis isEditable={isEditable} />
        ) : null}
      </CardBody>
    </Card>
  );
};

export default TopicSummary;
