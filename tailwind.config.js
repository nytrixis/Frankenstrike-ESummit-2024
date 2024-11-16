export const purge = false;
export const content = ['./src/**/*.{js,jsx,ts,tsx}', './index.html'];
export const theme = {
  extend: {
    colors: {
      primary: '#000000', // Black shade for navbar
      accent: '#04448A', // Custom accent color for hover/effects
      text: '#01BDFD',
      background: '#F3F4F6', // Background color
      transparent: 'transparent', // For transparency
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      'l': '1rem',
      'xl': '1.25rem',
      '5xl': '3rem',
    },
  },
};
export const plugins = [];
  