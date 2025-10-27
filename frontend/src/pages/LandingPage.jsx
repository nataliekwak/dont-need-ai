import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { NotebookPen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../components";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex overflow-hidden flex-col">
      <NavBar />
      <div className="w-full relative flex flex-col min-h-screen items-center justify-center">
        <div className="flex flex-col items-center text-center mt-15 mb-20">
          <h1 className="ml-5 mr-5 mb-4 text-5xl font-bold text-center">
            You don't need AI.
          </h1>
          <h2 className="text-2xl text-default-600 font-semibold">
            How can we help?
          </h2>
        </div>
        <Card
          isPressable
          onPress={() => navigate("/writing-guide")}
          className="flex flex-col  shadow-xl border-1.5 border-default-500 p-5 justify-center text-center max-w-md"
        >
          <CardHeader className="flex justify-center">
            <NotebookPen className="size-10" />
          </CardHeader>
          <CardBody className="text-center">
            <h1 className="text-2xl font-semibold">Writing Guide</h1>
          </CardBody>
          <CardFooter className="text-center text-default-600">
            <p>Get help writing an essay.</p>
          </CardFooter>
        </Card>
        <div className="flex">
          <p className="text-default-600 text-sm mt-15">
            More options coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
