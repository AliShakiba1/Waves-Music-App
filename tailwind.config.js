/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,html,ts,jsx,tsx,css,module}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 17s linear infinite',
      },
    },
  },
  plugins: [],
}
