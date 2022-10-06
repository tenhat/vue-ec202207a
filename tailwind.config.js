/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        curry: "#531C06",
        curryHover: "#754938",
        background: "#F5F1E9"
      }
    }
  },
  plugins: [],
}
