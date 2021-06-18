module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        rotate90: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(90deg)' }
        },
        rotate180: {
          'from': {transform: 'rotate(0deg)'},
          'to': {transform: 'rotate(180deg)'}
        },
      },
      animation: {
        'rotate-90': 'rotate90 0.3s forwards ease',
        'rotate-180': 'rotate180 0.3s forwards ease',
      },
      height: {
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
        '124': '31rem',
      },
      maxHeight: {
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
        '124': '31rem',
      },
      fontFamily: {
        // 'source-pro': ['Source Sans Pro', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        // 'gyre': ['Gyre', 'sans-serif'],
        // 'duran': ['Duran', 'sans-serif'],
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      overflow: ['hover', 'focus'],
      height: ['hover', 'focus'],
    },
  },
  plugins: [],
}
