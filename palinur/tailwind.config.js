/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // ← ARCHIVOS DE REACT
    "./public/index.html",          // ← HTML PRINCIPAL
  ],
  theme: {
    extend: {
      fontFamily: {
        albert: ["'Albert Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
