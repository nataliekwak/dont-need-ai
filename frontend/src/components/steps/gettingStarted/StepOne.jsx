import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

// This is the content for step one
// where the user is asked to enter their prompt

const StepOne = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  const [prompt, setPrompt] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    // Save the prompt and proceed to the next step
    updateAssignment(assignment._id, { prompt, step: 2 });
  };

  return (
    <div>
      <p className="mb-8">What are you writing about?</p>
      <Form onSubmit={onSubmit}>
        <Input
          label="Enter your prompt, question, or idea."
          name="prompt"
          labelPlacement="outside"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button className="self-end mr-5" type="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};

export default StepOne;
