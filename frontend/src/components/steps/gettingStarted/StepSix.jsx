import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";
const StepSix = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  const [topic, setTopic] = useState("");
  const [topicsList, setTopicsList] = useState(assignment.topics || []);

  // Helper functions to handle navigation based on startSmall value
  const getNextStep = () => {
    if (assignment.startSmall === false) {
      return 5;
    } else {
      return 7;
    }
  };

  const getPrevStep = () => {
    if (assignment.startSmall === false) {
      return 3;
    } else {
      return 5;
    }
  };

  // Handle adding the topic to the list displayed
  const handleAdd = () => {
    console.log("Topic added:", topic);
    setTopicsList([...topicsList, topic]);
    setTopic("");
  };

  const onSubmit = () => {
    updateAssignment(assignment._id, {
      topics: topicsList,
      step: getNextStep(),
    });
  };

  return (
    <Form onSubmit={onSubmit} className="flex gap-5">
      <div className="flex flex-col items-center gap-2">
        {assignment.startSmall ? (
          <>
            <p>
              Finally, we have your main focus: <b>{assignment.bigAnswer}</b>
            </p>
          </>
        ) : (
          <></>
        )}

        <p>
          Create the topics that will be the subjects of your body paragraphs.
        </p>
        <p>
          Most academic essays require 2-3 body paragraphs, but add however many
          topics you need for <i>your</i> writing.
        </p>
        <div className="flex flex-row align-center gap-2">
          <Input
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          ></Input>
          <Button onPress={handleAdd}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 mb-4 justify-center">
          {topicsList.map((topic, index) => (
            <div className="w-fit border rounded-lg pl-2 pr-2 p-1" key={index}>
              {topic}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-4">
        <Button
          onPress={() =>
            updateAssignment(assignment._id, { step: getPrevStep() })
          }
        >
          Back
        </Button>
        <Button type="submit" isDisabled={topicsList.length < 1}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default StepSix;
