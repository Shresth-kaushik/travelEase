/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#8B5CF6",
          secondary: "#4C1D95",
        },
      },
    },
    plugins: [],
  }
  
  