const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'nativewind-hsl(var(--border))',
        input: 'nativewind-hsl(var(--input))',
        ring: 'nativewind-hsl(var(--ring))',
        background: 'nativewind-hsl(var(--background))',
        foreground: 'nativewind-hsl(var(--foreground))',
        primary: {
          DEFAULT: 'nativewind-hsl(var(--primary))',
          foreground: 'nativewind-hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'nativewind-hsl(var(--secondary))',
          foreground: 'nativewind-hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'nativewind-hsl(var(--destructive))',
          foreground: 'nativewind-hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'nativewind-hsl(var(--muted))',
          foreground: 'nativewind-hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'nativewind-hsl(var(--accent))',
          foreground: 'nativewind-hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'nativewind-hsl(var(--popover))',
          foreground: 'nativewind-hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'nativewind-hsl(var(--card))',
          foreground: 'nativewind-hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
