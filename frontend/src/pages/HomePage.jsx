import { useEffect, useState } from "react";
import { Button, Link } from "@heroui/react";

import { NavBar } from "../components";

function HomePage() {
  const taglines = [
    "Empowering you to achieve more without relying on artificial intelligence.",
    "Brainpower is so in right now.",
    "Unlock your full potential using your own mind.",
  ];

  const [tagline, setTagline] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prev, setPrev] = useState(null);

  // Rotate between taglines every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setPrev(tagline);
      setTimeout(() => {
        setTagline((prevIdx) => (prevIdx + 1) % taglines.length);
        setIsAnimating(false);
      }, 700);
    }, 7000);
    return () => clearInterval(interval);
  }, [tagline, taglines.length]);

  return (
    <div className="min-h-screen flex overflow-hidden flex-col">
      <NavBar />
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative">
        <h1 className="ml-5 mr-5 text-7xl font-bold text-center">
          You don't need AI.
        </h1>
        <div className="relative w-full max-w-200 mt-5 h-25 flex items-center justify-center overflow-hidden">
          {isAnimating ? (
            <h2
              key={prev}
              className="absolute m-5 p-5 transition-all duration-700 ease-in-out opacity-0 -translate-y-4 text-center text-primary text-3xl font-bold"
            >
              {taglines[prev]}
            </h2>
          ) : (
            <h2
              key={tagline}
              className={`absolute m-5 p-5 transition-all duration-700 opacity-100 translate-y-0 ease-in-out text-center text-primary text-3xl font-bold
              `}
            >
              {taglines[tagline]}
            </h2>
          )}
        </div>
        <div className="flex flex-row mt-10 space-x-4">
          <Button
            className="btn"
            as={Link}
            color="primary"
            href="/login"
            variant="bordered"
            size="lg"
          >
            Login
          </Button>
          <Button
            className="btn"
            as={Link}
            color="primary"
            href="/register"
            variant="shadow"
            size="lg"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
