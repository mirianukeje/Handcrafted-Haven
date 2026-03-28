/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A0522D",
        secondary: "#F5DEB3",
        accent: "#8FBC8F",
        background: "#FFF8F0",
        text: "#333333",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};