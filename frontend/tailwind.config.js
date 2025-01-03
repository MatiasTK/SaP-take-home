/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
      },
      colors: {
        primary: '#303134',
        secondary: '#EE6c4D',
        tertiary: '#171717',
        text: '#ffffff',
        background: '#202124',
      },
    },
  },
  plugins: [],
};
