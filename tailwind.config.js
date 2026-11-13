/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#bf059a",
        secondary: "#3f0333",
        red: "#d21010ff",
        gray: {
          50: "#e6e6e6",
          100: "#c3c3c3",
          200: "#c5c5c5",
          300: "#aaaaaa",
          400: "#9e9e9e",
          500: "#838383",
          600: "#5a5a5a",
          700: "#4a4a4a",
          800: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
};