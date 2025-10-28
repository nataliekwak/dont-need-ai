import { Accordion, AccordionItem, Listbox, ListboxItem } from "@heroui/react";
import { useEffect, useState } from "react";

// The sidebar shown on the assignment page that displays the assignment title,
// prompt, and topic sections for navigation

const AssignmentNavigation = ({ assignment }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (assignment.prompt !== "" || assignment.prompt !== null) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
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
      >
        <AccordionItem
          key="1"
          title={<h2 className="text-2xl">{assignment.title}</h2>}
          aria-label="Assignment Prompt"
        >
          <p className="break-words whitespace-normal">{assignment.prompt}</p>
          {/* <Listbox aria-label="Assignment Topics"> */}
          {/* {assignment.sections.map((section) => (
          <ListboxItem key={section.id} value={section.id}>
            {section.title}
          </ListboxItem>
        ))} */}
          {/* </Listbox> */}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AssignmentNavigation;
