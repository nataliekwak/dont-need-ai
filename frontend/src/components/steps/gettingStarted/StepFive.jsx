import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepFive = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  const [bigAnswer, setBigAnswer] = useState("");

  const onSubmit = () => {
    updateAssignment(assignment._id, {
      bigAnswer,
      step: 6,
    });
  };

  return (
    <Form onSubmit={onSubmit} className="flex items-center">
      <p>Let's brainstorm...</p>
      <p>
        Now that we have all your smaller answers, come up with one "big answer"
        that ties them all together.
      </p>
      <p>
        This will be the <b>main focus</b> of your writing.
      </p>
      <div className="flex flex-wrap gap-2 mt-4 mb-4 justify-center">
        {assignment.smallAnswers.map((answer, index) => (
          <div className="w-fit border rounded-lg pl-2 pr-2 p-1" key={index}>
            {answer}
          </div>
        ))}
      </div>
      <div className="flex flex-row align-center gap-2">
        <Input
          placeholder="Enter the big answer"
          value={bigAnswer}
          onChange={(e) => setBigAnswer(e.target.value)}
        ></Input>
        <Button className="self-end mr-5" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default StepFive;
