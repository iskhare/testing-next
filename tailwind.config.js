/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2D3E61',    // Primary color
          secondary: '#2A2F34',  // Secondary color
          accent: '#00C896',     // Accent color
        },
        // Generating shades for each brand color
        primary: {
          50: '#E9ECF2',
          100: '#D3D9E6',
          200: '#A7B3CC',
          300: '#7B8DB3',
          400: '#4F6799',
          500: '#2D3E61', // Your primary brand color
          600: '#243250',
          700: '#1B253C',
          800: '#121928',
          900: '#090C14',
        },
        secondary: {
          50: '#E6E7E8',
          100: '#CCCFD1',
          200: '#999FA3',
          300: '#666F75',
          400: '#333F47',
          500: '#2A2F34', // Your secondary brand color
          600: '#22262A',
          700: '#191C1F',
          800: '#111315',
          900: '#08090A',
        },
        accent: {
          50: '#E6FAF4',
          100: '#CCF5E9',
          200: '#99EBD3',
          300: '#66E0BD',
          400: '#33D6A7',
          500: '#00C896', // Your accent brand color
          600: '#00A078',
          700: '#00785A',
          800: '#00503C',
          900: '#00281E',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
