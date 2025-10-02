import { Card } from "@heroui/react";

import NavBar from "../components/Navbar.jsx";

function LandingPage() {
  return (
    <div className="min-h-screen flex overflow-hidden flex-col">
      <NavBar />
      <div className="bg-zinc-900 w-full relative flex min-h-screen items-center justify-center ">
        <Card>
          <h1 className="text-3xl font-bold">Landing Page</h1>
        </Card>
      </div>
    </div>
  );
}

export default LandingPage;
