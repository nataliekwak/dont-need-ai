import { Button, ButtonGroup, Form } from "@heroui/react";
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
    <Form
      onSubmit={onSubmit}
      className="flex flex-col text-center items-center justify-center"
    >
      <p className="text-[1rem] opacity-55">
        To help this process work best for you...
      </p>
      <p className="text-[1.5rem]">
        How do you prefer to approach large tasks?
      </p>
      <div>
        <div className="p-4 flex flex-wrap justify-center max-w-200">
          <Button
            className="hover:bg-content2 m-2 rounded-lg px-4 py-8 whitespace-normal max-w-70 text-[1rem]"
            value="startBig"
            onPress={() => setSelected("startBig")}
            variant={selected === "startBig" ? "solid" : "ghost"}
            color={selected === "startBig" ? "primary" : "default"}
          >
            Starting with the big picture, then narrowing it down.
          </Button>
          <Button
            className="hover:bg-content2 m-2 rounded-lg px-4 py-8 whitespace-normal max-w-70 text-[1rem]"
            value="startSmall"
            onPress={() => setSelected("startSmall")}
            variant={selected === "startSmall" ? "solid" : "ghost"}
            color={selected === "startSmall" ? "primary" : "default"}
          >
            Starting small then building up to something bigger.
          </Button>
          <Button
            className="hover:bg-content2 m-2 rounded-lg px-4 py-7 whitespace-normal max-w-70 text-[1rem]"
            value="noPreference"
            onPress={() => setSelected("noPreference")}
            variant={selected === "noPreference" ? "solid" : "ghost"}
            color={selected === "noPreference" ? "primary" : "default"}
          >
            I have no preference.
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-4">
        <Button onPress={() => updateAssignment(assignment._id, { step: 2 })}>
          Back
        </Button>
        <Button className="self-end mr-5" type="submit" isDisabled={isInvalid}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default StepThree;
