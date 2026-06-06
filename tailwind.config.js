/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boda: {
          bg: '#fcfaf7',       // El crema premium de fondo
          primary: '#1e3d59',  // El azul elegante del sobre y títulos
          secondary: '#17b890', // Color sutil de interactivos
          accent: '#deaf63',    // El dorado para las flores y detalles
          text: '#2b3a42',      // Gris oscuro/azul para lectura cómoda de los tíos
        }
      },
      fontFamily: {
        cursive: ['"Great Vibes"', 'cursive'], 
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}