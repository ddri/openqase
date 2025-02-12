// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          light: '#E6A993', // lighter shade
          DEFAULT: '#B87E6C', // main copper color
          dark: '#8B5E4D',   // darker shade
        }
      }
    },
  },
  plugins: [],
}