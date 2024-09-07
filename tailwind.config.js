import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ee3d3a",
        grayText: "#636c76",
        grayBg: "#101011",
        green: "#079455"
      },
      backgroundImage: {
        "login-bg": "url('/imgs/login_bg.jpeg')",
        "home-bg": "url('/imgs/home_bg.jpeg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
