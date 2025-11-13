import { Accordion, AccordionItem, Listbox, ListboxItem } from "@heroui/react";
import { useEffect, useState } from "react";

import { useAssignmentStore } from "../store/assignmentsStore.js";

// The sidebar shown on the assignment page that displays the assignment title,
// prompt, and topic sections for navigation

const AssignmentNavigation = ({ assignment }) => {
  const { getAllTopics, setCurrentTopic, topics } = useAssignmentStore();

  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    // Disable if prompt is missing, null, or empty string
    if (!assignment.prompt || assignment.prompt === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [assignment.prompt, assignment.step]);

  // Set selectedTopic only if step >= 8 and topics exist
  // useEffect(() => {
  //   if (assignment.step >= 8 && topics && topics.length > 0) {
  //     setSelectedTopic((prev) => prev || topics[0]._id);
  //   } else {
  //     setSelectedTopic(null);
  //   }
  // }, [assignment.step, topics]);

  // If the selected topic changes, update the current topic in the store
  useEffect(() => {
    setCurrentTopic(selectedTopic);
  }, [selectedTopic, setCurrentTopic]);

  useEffect(() => {
    // If topics fail to load, populate topics
    if (topics.length === 0 && assignment.topicNames) {
      getAllTopics(assignment._id);
    }

    console.log("Topics loaded:", topics);
  }, [topics, assignment.topicNames, assignment._id, getAllTopics]);

  const handleSelect = (topic) => {
    // Set the selected topic when a topic is clicked or close the currently selected topic
    if (selectedTopic === topic) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic);
    }
  };

  return (
    <div className="w-55 flex flex-col gap-5">
      <Accordion
        key="title"
        aria-label="Assignment Navigation"
        variant="shadow"
        isDisabled={isDisabled}
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

      {/* Display the assignment topics when they exist */}
      {topics && topics.length > 0 && (
        <div className="border-medium rounded-small border-default-200 dark:border-default-100">
          <Listbox
            aria-label="Assignment Topics"
            variant="solid"
            color="primary"
          >
            {topics.map((topic) => (
              <ListboxItem
                key={topic._id}
                value={topic._id}
                onPress={() => handleSelect(topic)}
              >
                <p className="text-xl break-words whitespace-normal">
                  {topic.name}
                </p>
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      )}
    </div>
  );
};

export default AssignmentNavigation;
