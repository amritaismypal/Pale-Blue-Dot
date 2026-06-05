module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#06111F',
        'deep-blue': '#1D3D66',
        'accent-blue': '#5C9EDB',
        'pale-blue': '#D8E8F7',
        'off-white': '#F7F5F1',
        'muted-text': '#4B5563'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Cormorant Garamond', 'serif'],
        body: ['EB Garamond', 'serif']
      }
    },
  },
  plugins: [],
}
