/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        "machh-primary": "#009548",
      },
      fontFamily: {
        "roboto": ["Roboto", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
};
