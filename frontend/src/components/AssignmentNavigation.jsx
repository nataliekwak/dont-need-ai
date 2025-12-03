import { Accordion, AccordionItem, Listbox, ListboxItem } from "@heroui/react";
import { useEffect, useState } from "react";

import ClickableBox from "./ClickableBox.jsx";
import { useAssignmentStore } from "../store/assignmentsStore.js";

// The sidebar shown on the assignment page that displays the assignment title,
// prompt, and topic sections for navigation

const AssignmentNavigation = ({ assignment }) => {
  const { currentTopic, getAllTopics, setCurrentTopic, topics } =
    useAssignmentStore();

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

  // On mount, restore selected topic from localStorage
  useEffect(() => {
    const savedTopicId = localStorage.getItem("selectedTopicId");
    if (savedTopicId && topics.some((t) => t._id === savedTopicId)) {
      setSelectedTopic(savedTopicId);
      setCurrentTopic(topics.find((t) => t._id === savedTopicId));
    }
  }, [topics, setCurrentTopic]);

  // If the selected topic changes, update the current topic in the store
  useEffect(() => {
    const topicObj = topics.find((t) => t._id === selectedTopic) || null;
    setCurrentTopic(topicObj);

    // Save selected topic to localStorage
    if (topicObj) {
      localStorage.setItem("selectedTopicId", topicObj._id);
    }
  }, [selectedTopic, setCurrentTopic, topics]);

  useEffect(() => {
    // If topics fail to load, populate topics
    if (topics.length === 0 && assignment.topicNames) {
      getAllTopics(assignment._id);
    }
  }, [topics, assignment.topicNames, assignment._id, getAllTopics]);

  // Make sure to always have the most recent currentTopic
  useEffect(() => {
    setSelectedTopic(currentTopic ? currentTopic._id : null);
  }, [currentTopic]);

  const handleSelect = (topicId) => {
    // Set the selected topic when a topic is clicked or close the currently selected topic
    setSelectedTopic((prev) => (prev === topicId ? null : topicId));
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
          title={<h2 className="text-2xl font-semibold">{assignment.title}</h2>}
          aria-label="Assignment Prompt"
        >
          <p className="break-words whitespace-normal opacity-60">
            {assignment.prompt}
          </p>
        </AccordionItem>
      </Accordion>

      {/* Display the assignment topics when they exist */}
      {topics && topics.length > 0 && (
        <div
          aria-label="Assignment Topics"
          className="flex flex-col gap-3 max-w-55 border-medium rounded-small border-default p-3"
        >
          {topics.map((topic) => (
            <ClickableBox
              key={topic._id}
              text={topic.name}
              variant="ghost"
              selected={selectedTopic === topic._id}
              onClick={() => handleSelect(topic._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentNavigation;
