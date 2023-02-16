/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      fontFamily: {
        mono: ['var(--font-inconsolata)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
