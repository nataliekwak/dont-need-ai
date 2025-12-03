import { Button } from "@heroui/react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepNine = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  return (
    <div className="flex flex-col gap-5 text-center max-w-100 items-center">
      <p className="text-[1.5rem]">
        You're almost ready to start writing! Let’s finalize the flow of your
        work.
      </p>
      <div className="flex flex-row w-full justify-between">
        <Button onPress={() => updateAssignment(assignment._id, { step: 8 })}>
          Back
        </Button>
        <Button
          variant="shadow"
          color="primary"
          onPress={() => updateAssignment(assignment._id, { step: 10 })}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepNine;
