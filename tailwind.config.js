/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          deep: '#0A1628',
          light: '#1B3A5B',
          700: '#142D47',
        },
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        floaty: 'floaty 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
