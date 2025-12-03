/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   
    "./public/index.html",          
  ],
  theme: {
    extend: {
      keyframes: {
        slideLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-200px) rotate(-10deg)", opacity: "0" },
        },
        slideRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(200px) rotate(10deg)", opacity: "0" },
        },
      },
      animation: {
        "slide-left": "slideLeft 0.5s forwards",
        "slide-right": "slideRight 0.5s forwards",
      },
      fontFamily: {
        albert: ["'Albert Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
