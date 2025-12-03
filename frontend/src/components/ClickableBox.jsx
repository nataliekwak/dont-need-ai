import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

// ClickableBox is a custom, reusable component that I
// created to represent a box that can be clicked on and
// display various styles and content based on props.

const ClickableBox = ({
  text,
  onClick,
  showExpansionArrow = false,
  selected = false,
  variant = "default",
}) => {
  const [isExpanded, setIsExpanded] = useState(null);

  useEffect(() => {
    if (showExpansionArrow) {
      setIsExpanded(selected);
    }
  }, [selected, showExpansionArrow]);

  // Assign the proper classes based on the variant
  let boxClasses =
    "flex rounded-small pl-3 p-3 items-center justify-between cursor-pointer transition-colors ";

  if (variant === "default") {
    boxClasses += "border-medium ";
    boxClasses += selected
      ? "bg-primary border-primary hover:bg-primary-200 hover:border-primary-200 "
      : "bg-content1 hover:bg-default-200 border-default ";
  } else if (variant === "ghost") {
    boxClasses += selected
      ? "bg-primary border-primary hover:bg-primary-200 hover:border-primary-200 "
      : "bg-background hover:bg-default-200 border-default ";
  }

  return (
    <div onClick={onClick} className={boxClasses}>
      {/* Show the main text passed into the component */}
      <p className="text-xl break-words whitespace-normal">{text}</p>

      {/* If the expansion arrow should be shown, display properly when selected/deselected */}
      {showExpansionArrow && (isExpanded ? <ChevronLeft /> : <ChevronRight />)}
    </div>
  );
};

export default ClickableBox;
