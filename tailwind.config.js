/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        "machh-primary": "#009548",
        "machh-primary-light": "#00B050",
        "machh-greenaccent": "#0ad203"
      },
      fontFamily: {
        "roboto": ["Roboto", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
};
