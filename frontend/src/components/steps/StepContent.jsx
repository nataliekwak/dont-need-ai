import { StepOne } from "./gettingStarted";

const StepContent = ({ currentStep }) => {
  switch (currentStep) {
    case 1:
      return <StepOne />;

    default:
      return <div>Error displaying content, please try again later.</div>;
  }
};

export default StepContent;
