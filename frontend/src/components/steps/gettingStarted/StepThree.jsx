import { Button, Form, Radio, RadioGroup } from "@heroui/react";
import { useState } from "react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepThree = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  const [selected, setSelected] = useState(
    assignment.startSmall === true
      ? "startSmall"
      : assignment.startSmall === false
      ? "startBig"
      : null
  );
  const isInvalid = selected === null;

  // Helper functions to handle navigation based on startSmall value
  const getNextStep = () => {
    if (assignment.startSmall === false || selected === "startBig") {
      return 6;
    } else {
      return 4;
    }
  };

  const onSubmit = () => {
    var startSmall = true;

    if (selected === "startBig") {
      startSmall = false;
    } else {
      startSmall = true;
    }

    // Save the preference and proceed to the next step
    updateAssignment(assignment._id, { startSmall, step: getNextStep() });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <p>To help this process work best for you...</p>
        <p>How do you prefer to approach large tasks?</p>
        <div>
          <RadioGroup onValueChange={setSelected} value={selected}>
            <Radio
              className="hover:bg-content2 m-2 rounded-lg"
              value="startBig"
            >
              Starting with the big picture, then narrowing it down.
            </Radio>
            <Radio
              className="hover:bg-content2 m-2 rounded-lg"
              value="startSmall"
            >
              Starting small then building up to something bigger.
            </Radio>
            <Radio
              className="hover:bg-content2 m-2 rounded-lg"
              value="noPreference"
            >
              I have no preference.
            </Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-row justify-between w-full mt-4">
          <Button onPress={() => updateAssignment(assignment._id, { step: 2 })}>
            Back
          </Button>
          <Button
            className="self-end mr-5"
            type="submit"
            isDisabled={isInvalid}
          >
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StepThree;
