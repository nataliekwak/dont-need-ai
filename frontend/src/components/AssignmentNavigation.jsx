import { Accordion, AccordionItem, Listbox, ListboxItem } from "@heroui/react";

const AssignmentNavigation = ({ assignment }) => {
  return (
    <div className="w-fit">
      <Accordion
        key="title"
        aria-label="Assignment Navigation"
        variant="shadow"
        disabledKeys={["1"]}
      >
        <AccordionItem
          key="1" title={<h2 className="text-2xl">{assignment.title}</h2>}
        >
          <Listbox aria-label="Assignment Topics">
            {/* {assignment.sections.map((section) => (
          <ListboxItem key={section.id} value={section.id}>
            {section.title}
          </ListboxItem>
        ))} */}
          </Listbox>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AssignmentNavigation;
