import { Button } from "@heroui/react";

import TopicTab from "./TopicTab.jsx";
import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepEight = ({ assignment }) => {
  const { currentTopic, updateAssignment } = useAssignmentStore();

  return (
    <div className="flex flex-col items-center gap-5 max-w-200 text-center pt-10">
      {/* If current topic is selected, show the TopicTab */}
      {currentTopic && currentTopic !== null ? (
        <TopicTab topic={currentTopic} />
      ) : (
        <p className="text-[1.5rem] opacity-70 max-w-90">
          Select a topic from the sidebar to begin gathering support.
        </p>
      )}
      <Button
        className="self-start mt-30"
        onPress={() => updateAssignment(assignment._id, { step: 7 })}
      >
        Back
      </Button>
    </div>
  );
};

export default StepEight;
