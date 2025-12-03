import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

// ClickableBox is a custom, reusable component that I
// created to represent a box that can be clicked on and
// display various styles and content based on props.

const ClickableBox = ({
  onClick,
  scale = "default",
  selected = false,
  showExpansionArrow = false,
  subtext = null,
  text,
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
    "flex rounded-small items-center justify-between cursor-pointer transition-colors ";

  if (variant === "default") {
    boxClasses += "border-medium ";
    boxClasses += selected
      ? "bg-primary border-primary hover:bg-primary-200 hover:border-primary-200 "
      : "bg-content1 hover:bg-default-200 border-default ";
  } else if (variant === "ghost") {
    boxClasses += selected
      ? "bg-primary border-primary hover:bg-primary-200 hover:border-primary-200 "
      : "bg-background hover:bg-default-200 border-default ";
  } else if (variant === "darker-ghost") {
    boxClasses += selected
      ? "bg-primary-100 border-primary-100 hover:bg-default-200 hover:border-default-200 "
      : "bg-content1 hover:bg-primary-100 border-default ";
  }

  if (scale === "small") {
    boxClasses += "p-2 pl-2 ";
  } else {
    boxClasses += "p-3 pl-3 ";
  }

  return (
    <div onClick={onClick} className={boxClasses}>
      <div className="flex flex-col">
        {/* Show the main text passed into the component */}
        <p
          className={`${
            scale === "small" ? "text-sm font-semibold" : "text-xl"
          } break-words whitespace-normal`}
        >
          {text}
        </p>
        {subtext && (
          <p className="text-tiny italic break-words whitespace-normal">
            {subtext}
          </p>
        )}
      </div>

      {/* If the expansion arrow should be shown, display properly when selected/deselected */}
      {showExpansionArrow && (isExpanded ? <ChevronLeft /> : <ChevronRight />)}
    </div>
  );
};

export default ClickableBox;
