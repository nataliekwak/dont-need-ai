import { Button } from "@heroui/react";

import TopicSummary from "../../TopicSummary.jsx";
import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const StepEight = ({ assignment }) => {
  const { currentTopic, setCurrentTopic, updateAssignment } =
    useAssignmentStore();

  return (
    <div className="flex flex-col items-center gap-5 text-center w-full">
      {/* If current topic is selected, show the editable version of TopicSummary */}
      {currentTopic && currentTopic !== null ? (
        <TopicSummary isEditable={true} />
      ) : (
        <div className="flex max-w-50 m-5 pt-12 text-[1rem] font-light text-center">
          <p className="text-[1.5rem] opacity-70 max-w-90">
            Select a topic from the sidebar to begin gathering support.
          </p>
        </div>
      )}
      <div className="flex flex-row w-full justify-between">
        <Button
          onPress={() => {
            updateAssignment(assignment._id, { step: 7 });
            setCurrentTopic(null);
          }}
        >
          Back
        </Button>
        <Button
          onPress={() => {
            updateAssignment(assignment._id, { step: 9 });
            setCurrentTopic(null);
          }}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default StepEight;
