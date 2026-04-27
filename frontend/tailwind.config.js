/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      colors: {
        brutal: {
          bg: '#fdfbf7', // slightly warm off-white
          yellow: '#fde047',
          pink: '#f9a8d4',
          blue: '#93c5fd',
          green: '#86efac'
        }
      }
    },
  },
  plugins: [],
}
