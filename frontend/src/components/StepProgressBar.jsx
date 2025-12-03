import { Check } from "lucide-react";

const STAGES = [
  { id: 1, name: "Getting Started", start: 1, end: 7 },
  { id: 2, name: "Gathering Support", start: 8, end: 8 },
  { id: 3, name: "Finalize", start: 9, end: 11 },
];

const getStageIndex = (step) => {
  if (step >= 1 && step <= 7) return 0;
  if (step === 8) return 1;
  if (step >= 9 && step <= 11) return 2;
  return 0;
};

const StepProgressBar = ({ currentStep }) => {
  const currentStageIndex = getStageIndex(currentStep);

  // Calculate user progress as a percentage
  let progress = 0;
  if (currentStep >= 1 && currentStep <= 7) {
    // Steps 1-7: 0% to 50%
    progress = ((currentStep - 1) / 7) * 50;
  } else if (currentStep === 8) {
    // Step 8: exactly 50%
    progress = 50;
  } else if (currentStep >= 9 && currentStep <= 11) {
    // Steps 9-11: 50% to 100%
    progress = 50 + ((currentStep - 9) / 2) * 50;
  }

  return (
    <div className="w-full max-w-80 min-w-40 flex flex-col items-center">
      {/* Progress bar with circles representing each stage */}
      <div className="relative w-full flex items-center">
        {/* Progress background */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-default-200 rounded-full -translate-y-1/2 z-0" />
        {/* Progress fill */}
        <div
          className="absolute top-1/2 left-0 h-2 bg-primary rounded-full -translate-y-1/2 z-10 transition-all"
          style={{ width: `${progress}%` }}
        />

        {/* Stage circles */}
        <div className="w-full flex justify-between z-20 relative">
          {STAGES.map((stage, index) => {
            const isCompleted = currentStageIndex > index;
            const isCurrent = currentStageIndex === index;

            return (
              <div key={stage.id} className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center rounded-full border-2
                    w-10 h-10 text-lg font-bold
                    ${
                      isCompleted
                        ? "bg-primary border-primary"
                        : ""
                    }
                    ${
                      isCurrent && !isCompleted
                        ? "border-primary bg-primary"
                        : ""
                    }
                    ${
                      !isCompleted && !isCurrent
                        ? "bg-default-300 text-primary-400 border-default-300"
                        : ""
                    }
                    transition-all
                  `}
                >
                  {isCompleted ? <Check size={24} /> : stage.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Display the name of the stage the user is currently on */}
      <div className="mt-3 text-lg font-semibold text-center text-primary">
        {STAGES[currentStageIndex].name}
      </div>
    </div>
  );
};

export default StepProgressBar;
