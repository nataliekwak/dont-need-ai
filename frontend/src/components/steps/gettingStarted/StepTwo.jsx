import {
  Button,
  Form,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { useState } from "react";
import { Plus } from "lucide-react";

import { useAssignmentStore } from "../../../store/assignmentsStore.js";

let goals = [
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

  const [customGoal, setCustomGoal] = useState("");
  const [goalsList, setGoalsList] = useState(
    assignment.writingGoals
      ? [
          ...goals,
          ...assignment.writingGoals.filter((goal) => !goals.includes(goal)),
        ]
      : goals
  );
  const [selectedGoals, setSelectedGoals] = useState(
    assignment.writingGoals || []
  );

  const isInvalid = selectedGoals.length === 0;

  const handleGoalClick = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateAssignment(assignment._id, { writingGoals: selectedGoals, step: 3 });
  };

  return (
    <Form onSubmit={onSubmit} className="flex items-center text-center">
      <p className="text-[1.5rem]">What is the goal of your writing?</p>
      <div className="flex max-w-110 flex-wrap gap-2 mt-4 justify-center">
        {goalsList.map((goal) => (
          <Button
            key={goal}
            variant={selectedGoals.includes(goal) ? "solid" : "ghost"}
            color={selectedGoals.includes(goal) ? "primary" : "default"}
            onPress={() => handleGoalClick(goal)}
          >
            {goal}
          </Button>
        ))}
      </div>

      {/* Popover that allows the user to add a custom goal */}
      <div className="flex self-end m-4">
        <Popover showArrow={true}>
          <PopoverTrigger>
            <Button variant="ghost" startContent={<Plus />}>
              Add a custom goal
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4 p-2">
              <h3>Add a Custom Goal</h3>
              <Input
                value={customGoal}
                variant="bordered"
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Enter your goal"
              />
              <Button
                className="w-fit self-end"
                isDisabled={customGoal.trim() === ""}
                onPress={() => {
                  goals.push(customGoal);
                  setGoalsList(
                    assignment.writingGoals
                      ? [
                          ...goals,
                          ...assignment.writingGoals.filter(
                            (goal) => !goals.includes(goal)
                          ),
                        ]
                      : goals
                  );
                  setSelectedGoals((prev) => [...prev, customGoal]);
                  setCustomGoal("");
                }}
              >
                Add
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-row justify-between w-full mt-4">
        <Button onPress={() => updateAssignment(assignment._id, { step: 1 })}>
          Back
        </Button>
        <Button className="self-end mr-5" type="submit" isDisabled={isInvalid}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default StepTwo;
