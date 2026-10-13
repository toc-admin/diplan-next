/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "red": '#D00000',
        "black": '#2D2D2D',
        "white": '#FFFFFF',
        "gray": '#474747',
        "medium-jungle": '#0F2C25',
        "grey-green": '#5A706C',
        "quick-silver": '#A6AB9F',
        "bright-grey": '#E9E9E9',
        "jasper": '#D23939',
        "dark-text": "#0F1216",
        "light-text": "#25272B",
        "card-bg": "#F8F8F8",
        "cta-color": "#EE770F",
        "brand-color": "#0A3264",
        "bg": "#FFFFFF"
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4'
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#E9E9E9'
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
    },
  },
  plugins: [],
}