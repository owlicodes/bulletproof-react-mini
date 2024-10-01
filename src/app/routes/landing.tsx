import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/auth";
import { PATHS } from "../paths";

export const LandingRoute = () => {
  const user = useUser();
  const navigate = useNavigate();

  const handleStart = () => {
    if (user.data) {
      navigate(PATHS.app.root);
    } else {
      navigate(PATHS.auth.register);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-4 text-gray-700">
      <h1 className="text-2xl font-semibold">Bulletproof React Mini</h1>
      <p>
        This is an mini version of{" "}
        <a
          href="https://github.com/alan2207/bulletproof-react"
          target="_blank"
          rel="noopener noreferrer"
          className="underline cursor-pointer font-semibold text-blue-500"
        >
          Bulletproof React
        </a>{" "}
        by{" "}
        <a
          href="https://github.com/alan2207"
          target="_blank"
          rel="noopener noreferrer"
          className="underline cursor-pointer font-semibold text-blue-500"
        >
          alan2207
        </a>
      </p>

      <p>
        Bulletproof React is a simple, scalable, and powerful architecture for
        building production ready React applications. It is built with lots of
        cool features that you might not need during the early stages of your
        development.
      </p>

      <p>
        The mini version of it is this project. I removed some of the features
        and you can decide to plug them in later. Some of the things I removed
        are Storybook, Playwright and implementation of Mock Service Worker in
        the client side. We will be using it however for unit testing.
      </p>

      <Button onClick={handleStart}>Get Started</Button>
    </div>
  );
};
