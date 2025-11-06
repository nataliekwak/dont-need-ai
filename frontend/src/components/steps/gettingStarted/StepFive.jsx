import { Button, Chip, Form, Input } from "@heroui/react";
import { useState } from "react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepFive = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  const [bigAnswer, setBigAnswer] = useState(assignment.bigAnswer || "");

  // Helper functions to handle navigation based on startSmall value
  const getNextStep = () => {
    if (assignment.startSmall === false) {
      return 4;
    } else {
      return 6;
    }
  };

  const getPrevStep = () => {
    if (assignment.startSmall === false) {
      return 6;
    } else {
      return 4;
    }
  };

  const onSubmit = () => {
    updateAssignment(assignment._id, {
      bigAnswer,
      step: getNextStep(),
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex items-center text-center max-w-200"
    >
      {assignment.startSmall ? (
        <span className="flex flex-col px-5 max-w-175">
          <p className="text-[1rem] opacity-55">Let's brainstorm...</p>
          <p className="text-[1.5rem]">
            Now that we have all your smaller answers, come up with one "big
            answer" that ties them all together.
          </p>
          <p className="text-[1rem] opacity-80">
            This will be the <b>main focus</b> of your writing.
          </p>
        </span>
      ) : (
        <span className="flex flex-col px-5 max-w-175">
          <p className="text-[1rem] opacity-55">Let's brainstorm...</p>
          <p className="text-[1.5rem]">
            Based on your prompt and topics, come up with one "big idea"
            sentence that encapsulates the <b>main focus</b> of your writing.
          </p>
        </span>
      )}

      <div className="flex flex-wrap gap-2 mt-4 mb-4 justify-center max-w-150">
        {assignment.smallAnswers.map((answer, index) => (
          <Chip
            key={index}
            size="sm"
            variant="bordered"
            radius="sm"
            className="text-[0.85rem] py-4 px-2 whitespace-normal max-w-70 border-primary"
          >
            {answer}
          </Chip>
        ))}
      </div>
      <div className="flex flex-row align-center gap-2">
        <Input
          placeholder="Enter your big answer"
          value={bigAnswer}
          onChange={(e) => setBigAnswer(e.target.value)}
        ></Input>
        <Button
          className="self-end mr-5"
          type="submit"
          isDisabled={bigAnswer.trim() === ""}
        >
          Next
        </Button>
      </div>
      <Button
        className="self-start mt-20"
        onPress={() =>
          updateAssignment(assignment._id, { step: getPrevStep() })
        }
      >
        Back
      </Button>
    </Form>
  );
};

export default StepFive;
