module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6200EA',
        'primary-purple-button': '#5A00D6',
        'secondary-teal': '#00BFA5',
        'accent-amber': '#FFD54F',
        'neutral-bg': '#F8F9FA',
        'neutral-text': '#495057',
        'dark-text': '#212529'
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}; 