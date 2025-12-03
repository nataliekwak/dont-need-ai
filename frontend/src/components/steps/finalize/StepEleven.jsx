import { Accordion, AccordionItem, Button, Tooltip } from "@heroui/react";
import { CircleQuestionMark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ClickableBox from "../../ClickableBox.jsx";
import TopicSummary from "../../TopicSummary.jsx";
import { useAssignmentStore } from "../../../store/assignmentsStore";

const StepEleven = ({ assignment }) => {
  const navigate = useNavigate();

  const {
    getAllTopics,
    setCurrentSource,
    setCurrentTopic,
    topics,
    updateAssignment,
  } = useAssignmentStore();

  const [expandedTopic, setExpandedTopic] = useState(null);

  useEffect(() => {
    // If there are no topics, fetch them
    if (!topics || topics.length === 0) {
      getAllTopics(assignment._id);
    }
  }, [assignment, topics, getAllTopics]);

  // When the assignment topics change, reset the expanded topic and current topic
  useEffect(() => {
    setExpandedTopic(null);
    setCurrentTopic(null);
  }, [topics, setCurrentTopic]);

  const mainContainerClass = expandedTopic
    ? "flex flex-row w-full h-full items-stretch"
    : "flex flex-row w-full items-center justify-center";

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex text-center w-full justify-center mb-5">
        <h3 className="text-[1.5rem] font-semibold">
          Congratulations, you're ready to write!
          <Tooltip
            placement="right-end"
            shouldFlip={false}
            offset={-3}
            content={
              <p className="max-w-60 text-center font-light">
                Open up your favorite word processor and put all your hard work
                together into a final draft!
              </p>
            }
          >
            <Button isIconOnly variant="light" size="sm">
              <CircleQuestionMark size={18} />
            </Button>
          </Tooltip>
        </h3>
      </div>

      <div className={mainContainerClass}>
        <div
          className={`flex flex-col m-5 max-w-60 min-w-40 w-full ${
            expandedTopic ? "" : "items-center justify-center"
          }`}
          style={{ maxWidth: "15rem" }}
        >
          {/* Title Accordion */}
          <Accordion
            key="title"
            aria-label="Assignment Navigation"
            variant="shadow"
            className="overflow-hidden"
            defaultExpandedKeys={["1"]}
          >
            <AccordionItem
              key="1"
              title={<h2 className="text-2xl">{assignment.title}</h2>}
              aria-label="Assignment Prompt"
            >
              <p className="break-words whitespace-normal font-light">
                {assignment.prompt}
              </p>
            </AccordionItem>
          </Accordion>

          {/* List of assignment topics/sections */}
          <div className="flex flex-col gap-3 mt-5">
            {topics.map((topic, index) => (
              <ClickableBox
                key={index}
                text={topic.name}
                selected={expandedTopic === topic}
                showExpansionArrow={true}
                onClick={() => {
                  setExpandedTopic(topic === expandedTopic ? null : topic);
                  setCurrentTopic(topic === expandedTopic ? null : topic);
                }}
              />
            ))}
          </div>
        </div>

        {/* If there is a topic selected, show its uneditable TopicSummary.
        Otherwise, prompt the user to select a topic.*/}
        <div
          className={
            expandedTopic
              ? "flex flex-1 h-full items-center justify-center mt-5"
              : "flex items-center justify-center"
          }
        >
          {expandedTopic ? (
            <TopicSummary isEditable={false} />
          ) : (
            <div className="flex max-w-50 m-5 pt-12 text-[1rem] font-light text-center">
              <p>
                Select a topic on the left to review the sources, evidence, and
                analysis you gathered.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-8">
        <Button
          onPress={() => {
            updateAssignment(assignment._id, { step: 10 });
            setCurrentTopic(null);
            setCurrentSource(null);
          }}
        >
          Back
        </Button>
        <Button
          onPress={() => {
            navigate("/writing-guide");
            setCurrentTopic(null);
            setCurrentSource(null);
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default StepEleven;
