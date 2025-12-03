import { Button, Chip, Form, Input } from "@heroui/react";
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
    <Form
      onSubmit={onSubmit}
      className="flex items-center text-center max-w-200"
    >
      {assignment.startSmall ? (
        <span className="flex flex-col px-5 max-w-150">
          <p className="text-[1rem] font-light">Let's brainstorm...</p>
          <p className="text-[1.5rem]">
            Off the top of your head, try to generate as many smaller answers to
            your prompt as you can.
          </p>
        </span>
      ) : (
        <span className="flex flex-col px-5 max-w-150">
          <p className="text-[1rem] font-light">Let's get specific...</p>
          <p className="text-[1.5rem]">
            Off the top of your head, try to generate as many smaller ideas from
            your big idea as you can.
            <br />
            {assignment.bigAnswer}
          </p>
        </span>
      )}

      {/* Remind the user of their goals */}
      {assignment.writingGoals.length < 2 ? (
        <p className="font-light mb-2 max-w-150">
          Focus on quantity for now, not quality. Remember you are trying to{" "}
          {assignment.writingGoals[0].toUpperCase()}
        </p>
      ) : assignment.writingGoals.length === 2 ? (
        <p className="font-light mb-2 max-w-150">
          Focus on quantity for now, not quality. Remember you are trying to{" "}
          {assignment.writingGoals[0].toUpperCase()} and{" "}
          {assignment.writingGoals[1].toUpperCase()}.
        </p>
      ) : (
        // More than 2 goals, list them with commas and 'and' before the last one
        <p className="font-light mb-2 max-w-150">
          Focus on quantity for now, not quality. Remember you are trying to{" "}
          {assignment.writingGoals
            .slice(0, -1)
            .map((goal) => goal.toUpperCase())
            .join(", ")}
          , and{" "}
          {assignment.writingGoals.slice(-1).map((goal) => goal.toUpperCase())}.
        </p>
      )}

      <div className="flex flex-row align-center gap-2">
        <Input
          placeholder="Enter a small answer"
          value={smallAnswer}
          onChange={(e) => setSmallAnswer(e.target.value)}
        ></Input>
        <Button onPress={handleAdd}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 mb-4 justify-center max-w-175">
        {smallAnswersList.map((answer, index) => (
          <Chip
            key={index}
            size="md"
            variant="bordered"
            radius="sm"
            className="py-4 px-2 whitespace-normal max-w-70 border-primary"
            onClose={() => {
              setSmallAnswersList(
                smallAnswersList.filter((_, i) => i !== index)
              );
            }}
          >
            {answer}
          </Chip>
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
        <div className="flex flex-row align-center gap-4">
          <p
            className={
              smallAnswersList.length < 5 ? "text-danger" : "text-success"
            }
          >
            {smallAnswersList.length}/5
          </p>
          <Button
            className="self-end mr-5"
            type="submit"
            isDisabled={smallAnswersList.length < 5}
          >
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default StepFour;
