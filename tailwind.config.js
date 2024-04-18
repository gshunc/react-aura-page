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
        graph_blue: "rgba(54, 162, 235, 1)",
        graph_pink: "rgba(255, 99, 132, 1)",
      },
      borderWidth: {
        16: "16px",
      },
      width: {
        wide_graph: "40rem",
        home_box_width: "40rem",
      },
      height: {
        graph_height: "20rem",
        graph_box_height: "20rem",
        home_box_height: "10rem",
      },
    },
  },
  plugins: [],
};
