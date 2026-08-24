/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        surface: '#141414',
        raised: '#1C1C1C',
        paper: '#FAFAFA',
        muted: '#8A8A8A',
        line: '#2A2A2A',
        acid: '#D0FF14',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        crush: '-0.04em',
      },
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
      boxShadow: {
        hard: '4px 4px 0 0 #D0FF14',
        'hard-lg': '8px 8px 0 0 #D0FF14',
        'hard-paper': '4px 4px 0 0 #FAFAFA',
        'hard-ink': '4px 4px 0 0 #0A0A0A',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        blink: 'blink 1.2s steps(2, start) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
