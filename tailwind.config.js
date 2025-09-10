module.exports = {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  
  theme: {
    screens: {
      'vsm': '320px',

      'sm': '640px',

      'md': '770px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem', //
       'base': '1rem', //14.5 px
       'lg': '1.125rem', //16.3 px
       'xl': '1.25rem', //18 px
       '2xl': '1.5rem', //21.75 px
      '3xl': '1.875rem',
      '4xl': '2.25rem',
       '5xl': '3rem',
       '6xl': '4rem',
      '7xl': '5rem',
    },
    colors: {
      'purple': {
        '100': '#8A2BE2',
      },
      'cyan': {
        '700': '#8A2BE2',
        '800': '#8A2BE2',
        '300': '#FFFFFF',
        '600': '#8A2BE2',
      },
      'black': {
        '100': '#383839',

      },
    },
    extend: {
      fontFamily: {
        'sans': ['Montserrat'],
      },
      spacing: {
        '100': '35rem',
      }

    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
      forms: true,
      tooltips: true,
    }),
  ],
};

