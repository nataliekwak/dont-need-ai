import { Card } from "@heroui/react";
// This custom component takes in an assignment prop
// and displays the assignment title inside a styled card.

const AssignmentCard = ({ assignment }) => {
  return (
    <Card className="flex h-15 justify-center p-5 bg-content2 mt-2 mb-3">
      <p className="text-lg">{assignment.title}</p>
      {/* TO DO: add a ... menu that allows the user to delete (and potentially edit) */}
    </Card>
  );
};

export default AssignmentCard;
