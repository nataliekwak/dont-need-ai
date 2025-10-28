import { StepOne, StepTwo, StepThree } from "./gettingStarted";

const StepContent = ({ assignment }) => {
  switch (assignment.step) {
    case 1:
      return <StepOne assignment={assignment} />;
    case 2:
      return <StepTwo assignment={assignment} />;
    case 3:
      return <StepThree assignment={assignment} />;
    case 4:
      return <div>Step 4 content goes here.</div>;

    default:
      return <div>Error displaying content, please try again later.</div>;
  }
};

export default StepContent;
