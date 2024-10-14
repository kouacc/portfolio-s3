/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "selector",
  theme: {
    colors: {
      background: colors.zinc["200"],
      primary: colors.zinc["100"],
      secondary: colors.zinc["300"],
      tertiary: colors.slate["100"],
      fill: colors.black,
      background_dark: colors.zinc["950"],
      primary_dark: colors.zinc["800"],
      secondary_dark: colors.zinc["700"],
      tertiary_dark: colors.slate["900"],
      fill_dark: colors.white,
      sky: colors.sky,
      blue: colors.blue,
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
      black: colors.black,
      white: colors.white,
    },
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
        geistmono: ["Geist Mono", "monospace"],
        megazoid: ["Megazoid", "sans-serif"],
      },
    },
  },
  plugins: [],
};

