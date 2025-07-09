/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep_blue_black: "#000F2B",
        'font-color': "#3D4461",
        'white-color' : '#FBFBFB',
        'orange-color' : '#FF970B',

      },
      backgroundImage: {
        login_gradient : 'linear-gradient(#FF970B , #FBFBFB)',
      }
    },
  },
  plugins: [],
}