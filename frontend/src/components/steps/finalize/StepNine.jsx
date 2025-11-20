import { Button } from "@heroui/react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepNine = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();

  const handleNext = () => {
    updateAssignment(assignment._id, { step: 10 });
  };

  return (
    <div className="flex flex-col gap-5 text-center max-w-100 items-center">
      <p className="text-[1.5rem]">
        You're almost ready to start writing! Let’s finalize the flow of your
        work.
      </p>
      <Button onPress={handleNext}>Next</Button>
    </div>
  );
};

export default StepNine;
