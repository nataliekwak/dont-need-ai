import { Button } from "@heroui/react";
import { ChevronUp, ChevronDown } from "lucide-react";

import { useAssignmentStore } from "../../../store/assignmentsStore";

const OrderTopicBox = ({ topicName, isTopic, orderIndex }) => {
  const { topics, moveTopic } = useAssignmentStore();

  const handleMoveUp = () => {
    if (orderIndex > 0) {
      moveTopic(orderIndex, orderIndex - 1);
    }
  };

  const handleMoveDown = () => {
    if (orderIndex < topics.length - 1) {
      moveTopic(orderIndex, orderIndex + 1);
    }
  };

  return (
    <div className="flex border-default border-medium rounded-small p-3 mb-3">
      {topicName}

      {/* Arrow and order number */}
      {isTopic && (
        <div className="flex flex-col">
          <Button
            isIconOnly
            isDisabled={orderIndex === 0}
            onPress={handleMoveUp}
          >
            <ChevronUp />
          </Button>
          <Button
            isIconOnly
            isDisabled={orderIndex === topics.length - 1}
            onPress={handleMoveDown}
          >
            <ChevronDown />
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderTopicBox;
