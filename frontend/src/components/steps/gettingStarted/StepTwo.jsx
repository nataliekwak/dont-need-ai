import { Button, Form } from "@heroui/react";
import { useState } from "react";
import { Plus } from "lucide-react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

const goals = [
  "Support/Critique",
  "Explain",
  "Summarize",
  "Describe",
  "Agree/Disagree",
  "Critically analyze",
  "Find a solution",
];

const StepTwo = ({ assignment }) => {
  const { updateAssignment } = useAssignmentStore();
  const [selectedGoals, setSelectedGoals] = useState([]);

  const isInvalid = selectedGoals.length === 0;

  const handleGoalClick = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const onSubmit = () => {
    updateAssignment(assignment._id, { writingGoals: selectedGoals, step: 3 });
  };

  return (
    <Form onSubmit={onSubmit} className="flex items-center">
      <p>What is the goal of your writing?</p>
      <div className="flex max-w-110 flex-wrap gap-2 mt-4 justify-center">
        {goals.map((goal) => (
          <Button
            key={goal}
            variant={selectedGoals.includes(goal) ? "solid" : "ghost"}
            onPress={() => handleGoalClick(goal)}
          >
            {goal}
          </Button>
        ))}
      </div>
      <div className="flex self-end m-4">
        <Button variant="ghost" startContent={<Plus />}>
          Add a custom goal
        </Button>
      </div>
      <Button className="self-end mr-5" type="submit" isDisabled={isInvalid}>
        Next
      </Button>
    </Form>
  );
};

export default StepTwo;
