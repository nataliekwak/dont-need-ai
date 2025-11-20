import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
} from "./gettingStarted";
import { StepEight } from "./gatheringSupport";
import { StepNine } from "./finalize";

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
    case 6:
      return <StepSix assignment={assignment} />;
    case 7:
      return <StepSeven assignment={assignment} />;
    case 8:
      return <StepEight assignment={assignment} />;
    case 9:
      return <StepNine assignment={assignment} />;

    default:
      return <div>Error displaying content, please try again later.</div>;
  }
};

export default StepContent;
