import { Button } from "@heroui/react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepSeven = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  // Helper function to handle navigation based on startSmall value
  const getPrevStep = () => {
    if (assignment.startSmall === false) {
      return 4;
    } else {
      return 6;
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 max-w-200 text-center pt-10">
      <p className="text-[2rem]">Are you ready to gather support?</p>
      <Button
        size="lg"
        color="primary"
        onPress={() => updateAssignment(assignment._id, { step: 8 })}
      >
        Next Step
      </Button>
      <Button
        className="self-start mt-30"
        onPress={() =>
          updateAssignment(assignment._id, { step: getPrevStep() })
        }
      >
        Back
      </Button>
    </div>
  );
};

export default StepSeven;
