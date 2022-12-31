/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  './src/**/*.{js,jsx,ts,tsx}',], // /**/ -> global pattern
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide'),
  require('tailwindcss-textshadow'),
  require("daisyui"),
  // require('@tailwindcss/forms')
],
}
