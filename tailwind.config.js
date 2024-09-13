/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-dm-serif-display)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        primary: '#4FBBF3',
        secondary: '#0FAE18',
        'dark-primary': '#05090D',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
