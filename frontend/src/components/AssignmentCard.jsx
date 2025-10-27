import {
  Button,
  Card,
  Listbox,
  ListboxItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from "@heroui/react";
import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DeleteAssignmentModal, EditTitleModal } from "./modals";
import { useAssignmentStore } from "../store/assignmentsStore.js";

// This custom component takes in an assignment prop
// and displays the assignment title inside a styled card.

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getAllAssignments } = useAssignmentStore();

  const [modalType, setModalType] = useState("");

  return (
    <Card
      isPressable
      onPress={() =>
        navigate(`/writing-guide/${assignment._id}`, { state: { assignment } })
      }
      className="flex flex-row h-15 p-5 bg-content2 mt-2 mb-3 justify-between items-center"
    >
      <p className="text-lg">{assignment.title}</p>

      {/* Opens a menu that allows the user to delete and edit the assignment */}
      <Popover showArrow>
        <PopoverTrigger>
          <Button isIconOnly aria-label="More options" color="content3">
            <Ellipsis />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox aria-label="Assignment options">
            <ListboxItem
              startContent={<SquarePen />}
              showDivider
              onAction={() => {
                onOpen();
                setModalType("edit");
              }}
            >
              Edit title
            </ListboxItem>

            <ListboxItem
              className="text-danger"
              color="danger"
              startContent={<Trash2 />}
              onAction={() => {
                onOpen();
                setModalType("delete");
              }}
            >
              Delete
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>

      <EditTitleModal
        isModalOpen={isOpen && modalType === "edit"}
        onOpenChange={() => {
          onOpenChange();
          getAllAssignments();
        }}
        assignment={assignment}
      />

      <DeleteAssignmentModal
        isModalOpen={isOpen && modalType === "delete"}
        onOpenChange={() => {
          onOpenChange();
          getAllAssignments();
        }}
        assignment={assignment}
      />
    </Card>
  );
};

export default AssignmentCard;
