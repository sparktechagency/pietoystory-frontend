/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#BAE9FF",
        textColor: "#000000",
      },
      fontFamily: {
        degular: ['"Degular Display"', 'sans-serif'],
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
}
