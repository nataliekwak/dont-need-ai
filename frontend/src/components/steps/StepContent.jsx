import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
} from "./gettingStarted";

const StepContent = ({ assignment }) => {
  switch (assignment.step) {
    case 1:
      return <StepOne assignment={assignment} />;
    case 2:
      return <StepTwo assignment={assignment} />;
    case 3:
      return <StepThree assignment={assignment} />;
    case 4:
      return <StepFour assignment={assignment} />;
    case 5:
      return <StepFive assignment={assignment} />;

    default:
      return <div>Error displaying content, please try again later.</div>;
  }
};

export default StepContent;
