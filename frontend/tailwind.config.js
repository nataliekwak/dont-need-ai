import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    plugins: [
        heroui({
            prefix: "heroui",
            addCommonColors: true,
            themes: {
                light: {
                    colors: {
                        default: {
                            50: "#edeef0",
                            100: "#d5d5da",
                            200: "#bcbdc5",
                            300: "#a3a4af",
                            400: "#8b8c9a",
                            500: "#727384",
                            600: "#5e5f6d",
                            700: "#4a4b56",
                            800: "#36373f",
                            900: "#222328",
                            foreground: "#fff",
                            DEFAULT: "#727384"
                        },
                        primary: {
                            50: "#f2e9fc",
                            100: "#e0c9f7",
                            200: "#ceaaf3",
                            300: "#bc8bee",
                            400: "#aa6bea",
                            500: "#984ce5",
                            600: "#7d3fbd",
                            700: "#633195",
                            800: "#48246d",
                            900: "#2e1745",
                            foreground: "#fff",
                            DEFAULT: "#984ce5"
                        },
                        secondary: {
                            50: "#dfedfd",
                            100: "#b3d4fa",
                            200: "#86bbf7",
                            300: "#59a1f4",
                            400: "#2d88f1",
                            500: "#006fee",
                            600: "#005cc4",
                            700: "#00489b",
                            800: "#003571",
                            900: "#002147",
                            foreground: "#fff",
                            DEFAULT: "#006fee"
                        },
                        success: {
                            50: "#e2f8ec",
                            100: "#b9efd1",
                            200: "#91e5b5",
                            300: "#68dc9a",
                            400: "#40d27f",
                            500: "#17c964",
                            600: "#13a653",
                            700: "#0f8341",
                            800: "#0b5f30",
                            900: "#073c1e",
                            foreground: "#000",
                            DEFAULT: "#17c964"
                        },
                        warning: {
                            50: "#fef4e4",
                            100: "#fce4bd",
                            200: "#fad497",
                            300: "#f9c571",
                            400: "#f7b54a",
                            500: "#f5a524",
                            600: "#ca881e",
                            700: "#9f6b17",
                            800: "#744e11",
                            900: "#4a320b",
                            foreground: "#000",
                            DEFAULT: "#f5a524"
                        },
                        danger: {
                            50: "#fee1eb",
                            100: "#fbb8cf",
                            200: "#f98eb3",
                            300: "#f76598",
                            400: "#f53b7c",
                            500: "#f31260",
                            600: "#c80f4f",
                            700: "#9e0c3e",
                            800: "#73092e",
                            900: "#49051d",
                            foreground: "#000",
                            DEFAULT: "#f31260"
                        },
                        background: "#ffffff",
                        foreground: "#000000",
                        content1: {
                            DEFAULT: "#ffffff",
                            foreground: "#000"
                        },
                        content2: {
                            DEFAULT: "#f4f4f5",
                            foreground: "#000"
                        },
                        content3: {
                            DEFAULT: "#e4e4e7",
                            foreground: "#000"
                        },
                        content4: {
                            DEFAULT: "#d4d4d8",
                            foreground: "#000"
                        },
                        focus: "#984CE5",
                        overlay: "#000000"
                    }
                },
                dark: {
                    colors: {
                        default: {
                            50: "#17171a",
                            100: "#2e2e35",
                            200: "#44454f",
                            300: "#5b5c6a",
                            400: "#727384",
                            500: "#8e8f9d",
                            600: "#aaabb5",
                            700: "#c7c7ce",
                            800: "#e3e3e6",
                            900: "#ffffff",
                            foreground: "#fff",
                            DEFAULT: "#727384"
                        },
                        primary: {
                            50: "#2e1745",
                            100: "#48246d",
                            200: "#633195",
                            300: "#7d3fbd",
                            400: "#984ce5",
                            500: "#aa6bea",
                            600: "#bc8bee",
                            700: "#ceaaf3",
                            800: "#e0c9f7",
                            900: "#f2e9fc",
                            foreground: "#fff",
                            DEFAULT: "#984ce5"
                        },
                        secondary: {
                            50: "#002147",
                            100: "#003571",
                            200: "#00489b",
                            300: "#005cc4",
                            400: "#006fee",
                            500: "#2d88f1",
                            600: "#59a1f4",
                            700: "#86bbf7",
                            800: "#b3d4fa",
                            900: "#dfedfd",
                            foreground: "#fff",
                            DEFAULT: "#006fee"
                        },
                        success: {
                            50: "#073c1e",
                            100: "#0b5f30",
                            200: "#0f8341",
                            300: "#13a653",
                            400: "#17c964",
                            500: "#40d27f",
                            600: "#68dc9a",
                            700: "#91e5b5",
                            800: "#b9efd1",
                            900: "#e2f8ec",
                            foreground: "#000",
                            DEFAULT: "#17c964"
                        },
                        warning: {
                            50: "#4a320b",
                            100: "#744e11",
                            200: "#9f6b17",
                            300: "#ca881e",
                            400: "#f5a524",
                            500: "#f7b54a",
                            600: "#f9c571",
                            700: "#fad497",
                            800: "#fce4bd",
                            900: "#fef4e4",
                            foreground: "#000",
                            DEFAULT: "#f5a524"
                        },
                        danger: {
                            50: "#49051d",
                            100: "#73092e",
                            200: "#9e0c3e",
                            300: "#c80f4f",
                            400: "#f31260",
                            500: "#f53b7c",
                            600: "#f76598",
                            700: "#f98eb3",
                            800: "#fbb8cf",
                            900: "#fee1eb",
                            foreground: "#000",
                            DEFAULT: "#f31260"
                        },
                        background: "#000000",
                        foreground: "#ffffff",
                        content1: {
                            DEFAULT: "#838383",
                            foreground: "#000"
                        },
                        content2: {
                            DEFAULT: "#6F7874",
                            foreground: "#000"
                        },
                        content3: {
                            DEFAULT: "#727384",
                            foreground: "#fff"
                        },
                        content4: {
                            DEFAULT: "#52525b",
                            foreground: "#fff"
                        },
                        focus: "#984CE5",
                        overlay: "#ffffff"
                    }
                }
            },
            layout: {
                disabledOpacity: "0.5"
            },
            defaultTheme: "dark",
        }),
    ],
}