/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0071e3",
        secondary: "#86868b",
        dark: "#1d1d1f",
        light: "#f5f5f7",
      },
      fontFamily: {
        sans: ['"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}