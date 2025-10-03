import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ToastProvider />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextThemesProvider>
    </HeroUIProvider>
  </StrictMode>
);
