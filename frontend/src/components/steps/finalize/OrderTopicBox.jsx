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
    <div className="flex border-foreground border-medium rounded-small pl-3 p-2 items-center justify-between">
      {topicName}

      {/* Arrow and order number */}
      {isTopic && (
        <div className="flex flex-col self-end">
          <Button
            isIconOnly
            isDisabled={orderIndex === 0}
            onPress={handleMoveUp}
            variant="ghost"
            size="sm"
          >
            <ChevronUp />
          </Button>
          <div>{orderIndex + 1}</div>
          <Button
            isIconOnly
            isDisabled={orderIndex === topics.length - 1}
            onPress={handleMoveDown}
            variant="ghost"
            size="sm"
          >
            <ChevronDown />
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderTopicBox;
