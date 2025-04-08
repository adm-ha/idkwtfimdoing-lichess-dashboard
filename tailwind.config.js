// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'; // Import default colors for extension

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
         sans: ['Inter', 'sans-serif'],
         // Using Orbitron more selectively now, primarily via explicit classes
         display: ['Orbitron', 'sans-serif'],
      },
      colors: {
        // Using Tailwind's richer palettes + custom names
        'brand-primary': colors.lime[400], // #A6FF00 equivalent is lime-400
        'brand-primary-hover': colors.lime[500],
        'dark-bg': '#0f172a', // Deeper blue-gray (slate-900)
        'dark-card': '#1e293b', // Slightly lighter (slate-800)
        'dark-border': '#334155', // Slate-700
        'light-bg': colors.slate[50], // Very light gray
        'light-card': colors.white,
        'light-border': colors.slate[200], // Light gray border
        // Add other semantic colors if needed
        'accent-blue': colors.sky[500],
        'accent-green': colors.emerald[500],
        'accent-red': colors.red[500],
        'accent-purple': colors.violet[500],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-dark-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
         fadeInUp: {
           '0%': { opacity: '0', transform: 'translateY(15px)' },
           '100%': { opacity: '1', transform: 'translateY(0)' },
         },
         pulseGlow: { // Example subtle glow animation
            '0%, 100%': { boxShadow: '0 0 5px rgba(166, 255, 0, 0.3)' },
            '50%': { boxShadow: '0 0 15px rgba(166, 255, 0, 0.6)' },
         }
      },
      animation: {
         fadeInUp: 'fadeInUp 0.5s ease-out forwards',
         pulseGlow: 'pulseGlow 2s ease-in-out infinite', // Example usage
      }
    },
  },
  plugins: [],
}
