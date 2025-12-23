import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hal: ["HALTimezone-MonoRegular", "sans-serif"],
        gara: ["EBGaramond-Medium", "serif"],
        garaitalic: ["EBGaramond-MediumItalic", "serif"],
        garabold: ["EBGaramond-Bold", "serif"],
      },
      colors: {
        light: "#f2f2f2",
        midlight: "#aaaaaa",
        middark: "#8c8c8c",
        dark: "#282828",
        black: "#050505",
        yellow: "#ffe64f",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "18px",
        lg: "23px",
        h5: "28px",
        h4: "35px",
        h3: "44px",
        h2: "55px",
        h1: "70px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "uw": "2000px"
      },
    },
  },
  plugins: [],
};

export default config;
