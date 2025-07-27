/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdaff',
          300: '#8ec2ff',
          400: '#589ffc',
          500: '#3a7cf7',
          600: '#2661ed',
          700: '#1e4dd8',
          800: '#1e41af',
          900: '#1e3b8a',
          950: '#172554',
        },
        secondary: {
          50: '#effef7',
          100: '#dafeee',
          200: '#b8f9db',
          300: '#82f1be',
          400: '#47e197',
          500: '#1fc876',
          600: '#14a35f',
          700: '#13814f',
          800: '#156642',
          900: '#125438',
          950: '#073024',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd5',
          200: '#ffdcab',
          300: '#ffc274',
          400: '#ff9e3d',
          500: '#ff7e17',
          600: '#ff6208',
          700: '#cc4a08',
          800: '#a23b0d',
          900: '#84330f',
          950: '#471706',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
};