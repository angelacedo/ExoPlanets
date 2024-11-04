/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'x0': { 'min': '0px' }, // Esto es un media query que se aplica cuando el ancho es menor o igual a 900px
      },
    }
  },

  plugins: [],
};
