module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210 45% 25%)',      // Darker for better contrast
        accent: 'hsl(195 80% 40%)',        // Deeper accent color for better contrast
        bg: 'hsl(210 40% 97%)',            // Slightly lighter background
        surface: 'hsl(210 40% 99%)',       // Lighter surface for better contrast with text
        'text-primary': 'hsl(210 50% 10%)', // Darker text for better readability
        'text-secondary': 'hsl(210 40% 30%)', // Darker secondary text for better contrast
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(210, 40%, 15%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
      },
    },
  },
  plugins: [],
}
