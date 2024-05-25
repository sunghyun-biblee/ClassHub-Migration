/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          0: { opacity: 0 },
          "100%": { opacity: 1 },
        },
        dropDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-1": "fade-in 0.3s forwards 300ms",
        "fade-in-2": "fade-in 0.5s forwards 500ms",
        "fade-in-3": "fade-in 0.7s forwards 700ms",
        "fade-in-4": "fade-in 1s forwards 1000ms",
        "drop-down": "dropDown 0.5s ease-in-out forwards",
      },
      screens: {
        mysm: "375px",
      },
      transitionDelay: {
        "1000ms": "1000ms",
        "2000ms": "2000ms",
        "3000ms": "3000ms",
      },
    },
  },
  plugins: [],
};
