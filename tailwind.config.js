/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'choc-dark': '#1A0A08',
        'choc': '#2D1411',
        'cocoa': '#4B332B',
        'cocoa-light': '#6B4A3F',
        'cream': '#FFF6E5',
        'cream-dim': '#E8D9C0',
        'haze-blue': {
          DEFAULT: '#9BA3BB',
          light: '#BCC3D6',
          dark: '#6B7491',
          glow: 'rgba(155, 163, 187, 0.6)',
        },
        'gold': {
          DEFAULT: '#F5C842',
          light: '#FFE08A',
          dark: '#C9A227',
          glow: 'rgba(245, 200, 66, 0.5)',
        },
        'amber': {
          DEFAULT: '#E8832A',
          light: '#F5A55A',
          dark: '#B85E15',
        },
        'royal': {
          DEFAULT: '#6B3FA0',
          light: '#9B6FD0',
          dark: '#4A2070',
          glow: 'rgba(107, 63, 160, 0.5)',
        },
        'emerald-faith': '#2D8A5E',
        'rose-grace': '#C4526A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'Fredoka', 'sans-serif'],
        fun: ['Fredoka', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'radial-gradient(ellipse at top, #4B332B 0%, #2D1411 50%, #1A0A08 100%)',
        'gold-shimmer': 'linear-gradient(105deg, transparent 40%, rgba(245,200,66,0.3) 50%, transparent 60%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(26,10,8,0) 0%, rgba(26,10,8,0.6) 50%, #1A0A08 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(75,51,43,0.8) 0%, rgba(26,10,8,0.9) 100%)',
        'royal-gradient': 'linear-gradient(135deg, #4A2070 0%, #6B3FA0 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #F5C842 50%, #FFE08A 100%)',
        'faith-gradient': 'linear-gradient(135deg, #1A0A08 0%, #2D1411 40%, #4A2070 100%)',
      },
      animation: {
        'pulse-slow': 'pulse-glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideUp': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glowPulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(245,200,66,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245,200,66,0.7), 0 0 80px rgba(245,200,66,0.3)' },
        },
        'bounceGentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(245,200,66,0.4)',
        'gold-lg': '0 0 40px rgba(245,200,66,0.5), 0 0 80px rgba(245,200,66,0.2)',
        'royal': '0 0 20px rgba(107,63,160,0.4)',
        'royal-lg': '0 0 40px rgba(107,63,160,0.5)',
        'blue': '0 0 20px rgba(155,163,187,0.4)',
        'inner-glow': 'inset 0 0 30px rgba(245,200,66,0.1)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
