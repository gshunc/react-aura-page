/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carolina: "#56A0D3",
      },
      borderWidth: {
        16: "16px",
      },
      width: {
        wide_graph: "36rem",
        regular_graph: "18rem",
      },
      height: {
        graph_height: "20rem",
      },
    },
  },
  plugins: [],
};
