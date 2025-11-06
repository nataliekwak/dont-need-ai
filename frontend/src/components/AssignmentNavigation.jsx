import { Accordion, AccordionItem, Listbox, ListboxItem } from "@heroui/react";
import { useEffect, useState } from "react";

// The sidebar shown on the assignment page that displays the assignment title,
// prompt, and topic sections for navigation

const AssignmentNavigation = ({ assignment }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Disable if prompt is missing, null, or empty string
    if (!assignment.prompt || assignment.prompt === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [assignment.prompt]);

  return (
    <div className="w-55">
      <Accordion
        key="title"
        aria-label="Assignment Navigation"
        variant="shadow"
        isDisabled={isDisabled}
        className="overflow-hidden"
        defaultExpandedKeys={["1"]}
      >
        <AccordionItem
          key="1"
          title={<h2 className="text-2xl">{assignment.title}</h2>}
          aria-label="Assignment Prompt"
        >
          <p className="break-words whitespace-normal opacity-60">
            {assignment.prompt}
          </p>
        </AccordionItem>
      </Accordion>

      {/* Display the assignment topics when they exist */}
      {assignment.topics && assignment.topics.length > 0 && (
        <Listbox aria-label="Assignment Topics">
          {assignment.topics.map((topic) => (
            <ListboxItem variant="bordered" key={topic} value={topic}>
              <p className="text-xl break-words whitespace-normal">{topic}</p>
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
};

export default AssignmentNavigation;
