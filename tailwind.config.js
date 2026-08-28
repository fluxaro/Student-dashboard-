/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          bg: 'var(--color-canvas-bg)',
        },
        surface: {
          card: 'var(--color-surface-card)',
          muted: 'var(--color-surface-muted)',
        },
        ink: {
          primary: 'var(--color-ink-primary)',
          muted: 'var(--color-ink-muted)',
        },
        border: {
          line: 'var(--color-border-line)',
        },
        brand: {
          terracotta: 'var(--color-brand-terracotta)',
        },
        progress: {
          spruce: 'var(--color-progress-spruce)',
        },
        amber: {
          gauge: 'var(--color-amber-gauge)',
        },
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'ledger-sm': 'var(--shadow-ledger-sm)',
        'ledger-md': 'var(--shadow-ledger-md)',
        'ledger-float': 'var(--shadow-ledger-float)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
