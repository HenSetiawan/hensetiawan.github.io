/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding:"16px",
    },
    extend: {
      screens: {
        '2xl':'1320px'
      }
    },
  },
  plugins: [],
};

