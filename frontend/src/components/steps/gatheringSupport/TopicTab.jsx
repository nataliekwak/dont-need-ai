import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Plus } from "lucide-react";

// import { useAssignmentStore } from "../../../store/assignmentsStore";

const TopicTab = () => {
  // const { currentTopic } = useAssignmentStore();

  return (
    <Card className="w-full flex flex-col min-h-100 border-primary border-small">
      <CardHeader>
        <p>Topic Sentence</p>
      </CardHeader>
      {/* Display the evidence and analysis for this topic side-by-side */}
      <CardBody>
        {/* Box for the overall table */}
        <div className="h-full flex flex-row justify-evenly border-medium border-default rounded-small">
          {/* Box for the evidence column */}
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full justify-center">
              <h3>Evidence</h3>
              <Button isIconOnly variant="light">
                <Plus />
              </Button>
            </div>
            <Divider className=" h-[2px]" />
          </div>

          <Divider orientation="vertical" className="w-[2px]" />

          {/* Box for the analysis column */}
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full justify-center">
              <h3>Analysis</h3>
              <Button isIconOnly variant="light">
                <Plus />
              </Button>
            </div>
            <Divider className="h-[2px]" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopicTab;
