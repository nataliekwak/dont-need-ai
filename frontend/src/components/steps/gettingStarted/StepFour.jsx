import { Button, Form, Input } from "@heroui/react";
import { useEffect, useState } from "react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const LOCAL_STORAGE_KEY = "smallAnswersList";

const StepFour = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  const [smallAnswer, setSmallAnswer] = useState("");

  // Get the list of small answers from local storage or from assignment state if it exists
  const [smallAnswersList, setSmallAnswersList] = useState(
    assignment.smallAnswers.length > 0
      ? assignment.smallAnswers
      : (() => {
          const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
          return saved ? JSON.parse(saved) : [];
        })()
  );

  // Helper functions to handle navigation based on startSmall value
  const getNextStep = () => {
    if (assignment.startSmall === false) {
      return 7;
    } else {
      return 5;
    }
  };

  const getPrevStep = () => {
    if (assignment.startSmall === false) {
      return 5;
    } else {
      return 3;
    }
  };

  // Handle adding the small answer to the list displayed
  const handleAdd = () => {
    console.log("Small answer added:", smallAnswer);
    setSmallAnswersList([...smallAnswersList, smallAnswer]);
    setSmallAnswer("");
  };

  const onSubmit = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    updateAssignment(assignment._id, {
      smallAnswers: smallAnswersList,
      step: getNextStep(),
    });
  };

  // Save the small answers list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(smallAnswersList));
  }, [smallAnswersList]);

  return (
    <Form onSubmit={onSubmit} className="flex items-center">
      {assignment.startSmall ? (
        <>
          <p>Let's brainstorm...</p>
          <p>
            Off the top of your head, try to generate as many smaller answers to
            your prompt as you can.
          </p>
        </>
      ) : (
        <>
          <p>Let's get specific...</p>
          <p>
            Off the top of your head, try to generate as many smaller ideas from
            your big idea as you can.
            <br />
            {assignment.bigAnswer}
          </p>
        </>
      )}
      <p>Focus on quantity for now, not quality.</p>
      <div className="flex flex-row align-center gap-2">
        {/* TO DO: Add the 'Remember you are trying to EXPLAIN and DESCRIBE.' part based on writing goals */}
        {/* and dynamic 1/5 item counter */}
        <Input
          placeholder="Enter a small answer"
          value={smallAnswer}
          onChange={(e) => setSmallAnswer(e.target.value)}
        ></Input>
        <Button onPress={handleAdd}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 mb-4 justify-center">
        {smallAnswersList.map((answer, index) => (
          // display a box with rounded corners and an outline
          <div className="w-fit border rounded-lg pl-2 pr-2 p-1" key={index}>
            {answer}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between w-full mt-4">
        <Button
          onPress={() =>
            updateAssignment(assignment._id, { step: getPrevStep() })
          }
        >
          Back
        </Button>
        <Button
          className="self-end mr-5"
          type="submit"
          isDisabled={smallAnswersList.length < 5}
        >
          Next
        </Button>
      </div>
    </Form>
  );
};

export default StepFour;
