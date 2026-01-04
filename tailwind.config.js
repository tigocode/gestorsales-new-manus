/** @type {import('tailwindcss').Config} */
module.exports = {
  // Aponta para onde estarão nossos arquivos
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Suas cores personalizadas do protótipo original
        primary: '#2563EB', // blue-600
        secondary: '#FFFFFF',
        background: '#2c5b89ff', // slate-50
      },
    },
  },
  plugins: [],
}