import { StepOne } from "./gettingStarted";

const StepContent = ({ assignment }) => {
  switch (assignment.step) {
    case 1:
      return <StepOne assignment={assignment} />;
    case 2:
      return <div>Step Two Content</div>;

    default:
      return <div>Error displaying content, please try again later.</div>;
  }
};

export default StepContent;
