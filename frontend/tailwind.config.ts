import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      themes: ["light", "dark"],
      defaultTheme: "dark",
    }),
  ],
};

export default config;
