import { Accordion, AccordionItem, Button } from "@heroui/react";
import { useEffect } from "react";

import OrderTopicBox from "./OrderTopicBox.jsx";
import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepTen = ({ assignment }) => {
  const { topics, getAllTopics, updateAssignment } = useAssignmentStore();

  useEffect(() => {
    // If there are no topics, fetch them
    if (!topics || topics.length === 0) {
      getAllTopics(assignment._id);
    }
  }, [assignment, topics, getAllTopics]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row gap-15 text-center">
        <div className="flex text-wrap max-w-45 items-center">
          <p className="text-[1.3rem] font-light">
            Use the arrows to adjust the order of each section as you see fit.
          </p>
        </div>
        <div className="flex flex-col w-55 gap-5">
          {/* Title box */}
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

          {/* Topic boxes */}
          <OrderTopicBox topicName="Introduction" isTopic={false} />
          {topics.map((topic, index) => (
            <OrderTopicBox
              key={index}
              topicName={topic.name}
              isTopic={true}
              orderIndex={index}
            />
          ))}
          <OrderTopicBox topicName="Conclusion" isTopic={false} />
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-8">
        <Button
          onPress={() =>
            updateAssignment(assignment._id, {
              step: 9,
              topicIds: topics.map((t) => t._id),
            })
          }
        >
          Back
        </Button>
        <Button
          onPress={() =>
            updateAssignment(assignment._id, {
              step: 11,
              topicIds: topics.map((t) => t._id),
            })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepTen;
