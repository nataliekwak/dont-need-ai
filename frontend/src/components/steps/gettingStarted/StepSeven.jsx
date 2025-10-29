import { Button } from "@heroui/react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepSeven = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  return (
    <div className="flex flex-col items-center gap-5">
      <p>Are you ready to gather support?</p>
      <Button onPress={() => updateAssignment(assignment._id, { step: 8 })}>
        Next Step
      </Button>
      <Button
        className="self-start mt-20"
        onPress={() => updateAssignment(assignment._id, { step: 6 })}
      >
        Back
      </Button>
    </div>
  );
};

export default StepSeven;
