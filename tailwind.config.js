/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        bgColor : `#BAE9FF`
      },
      fontFamily : {
        degular: ['"Degular Display"', 'sans-serif'],
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
}