import { Accordion, AccordionItem, Button, Tooltip } from "@heroui/react";
import { CircleQuestionMark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ClickableBox from "../../ClickableBox.jsx";
import { useAssignmentStore } from "../../../store/assignmentsStore";

const StepEleven = ({ assignment }) => {
  const navigate = useNavigate();

  const { getAllTopics, topics, updateAssignment } = useAssignmentStore();

  const [expandedTopic, setExpandedTopic] = useState(null);
  // const expandedTopic = null;

  useEffect(() => {
    // If there are no topics, fetch them
    if (!topics || topics.length === 0) {
      getAllTopics(assignment._id);
    }
  }, [assignment, topics, getAllTopics]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex text-center w-full justify-center mb-3">
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

      <div className="flex flex-col m-5">
        {/* Title box */}
        <div className="flex max-w-60">
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
              <p className="break-words whitespace-normal opacity-60">
                {assignment.prompt}
              </p>
            </AccordionItem>
          </Accordion>
        </div>

        {/* List of assignment topics/sections */}
        <div className="flex flex-col gap-3 mt-5">
          {topics.map((topic, index) => (
            <ClickableBox
              key={index}
              text={topic.name}
              selected={expandedTopic === topic}
              showExpansionArrow={true}
              onClick={() =>
                setExpandedTopic(topic === expandedTopic ? null : topic)
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-8">
        <Button onPress={() => updateAssignment(assignment._id, { step: 10 })}>
          Back
        </Button>
        <Button onPress={() => navigate("/writing-guide")}>Done</Button>
      </div>
    </div>
  );
};

export default StepEleven;
