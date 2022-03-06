const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: [
        'Josefin Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    colors: {
      white: colors.white,
      gray: {
        l: {
          100: 'hsl(0, 0%, 98%)',
          200: 'hsl(236, 33%, 92%)',
          300: 'hsl(233, 11%, 84%)',
          400: 'hsl(236, 9%, 61%)',
          500: 'hsl(235, 19%, 35%)',
        },
        d: {
          100: 'hsl(234, 39%, 85%)',
          200: 'hsl(236, 33%, 92%)',
          300: 'hsl(234, 11%, 52%)',
          400: 'hsl(233, 14%, 35%)',
          500: 'hsl(237, 14%, 26%)',
        },
      },
      blue: {
        'bright': 'hsl(220, 98%, 61%)',
        'dark': 'hsl(235, 21%, 11%)',
        'dark-desaturated': 'hsl(235, 24%, 19%)',
      },
      check: {
        '1': 'hsl(192, 100%, 67%)',
        '2': 'hsl(280, 87%, 65%)',
        'linear-gradient': 'hsl(192, 100%, 67%) to hsl(280, 87%, 65%)',
      },
    },
    extend: {
      screens: {
        mobile: '375px',
        desktop: '1440px',
      },
      letterSpacing: {
        title: '0.25em',
      },
    },
  },
  plugins: [],
}
