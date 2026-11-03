/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        surface: '#FFFFFF',
        blush: '#F5D6DC',
        'blush-light': '#FDF4F6',
        rose: '#D87591',
        berry: '#8E2949',
        'berry-dark': '#6F1C36',
        'berry-light': '#B33C61',
        cocoa: '#34231F',
        muted: '#715E57',
        honey: '#E7AA51',
        'honey-light': '#F9DE9C',
        border: '#DCCBC3',
        success: '#2F654B',
        error: '#A12B36',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -5px rgba(142, 41, 73, 0.08), 0 4px 12px -2px rgba(52, 35, 31, 0.05)',
        'warm-lg': '0 20px 40px -10px rgba(142, 41, 73, 0.12), 0 8px 16px -4px rgba(52, 35, 31, 0.06)',
        'glow': '0 0 25px rgba(231, 170, 81, 0.45)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
