/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "dark",
      "light",
      "forest",
      "sunset",
      "bumblebee",
      "night",
      "dracula",
    ],
  },
  plugins: [require("daisyui")],
};
