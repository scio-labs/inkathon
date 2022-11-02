/* eslint-disable */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        social: {
          twitter: '#1DA1F2',
          discord: '#EB459E',
        },
      },
      fontFamily: {
        mono: ['Inconsolata', 'Menlo', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'spin-custom': '800ms ease-in-out infinite spin',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp'),
  ],
}
