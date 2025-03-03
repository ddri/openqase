// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
	  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		fontFamily: {
		  sans: ['var(--font-sans)'],
		  heading: ['var(--font-heading)'],
		},
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
			background: 'hsl(var(--card-background))',
			border: 'hsl(var(--card-border))',
			hoverBorder: 'hsl(var(--card-hover-border))',
			hoverBackground: 'hsl(var(--card-hover-background))',
		  },
		  text: {
			primary: 'hsl(var(--text-primary))',
			secondary: 'hsl(var(--text-secondary))',
			tertiary: 'hsl(var(--text-tertiary))',
		  },
		  surface: {
			primary: 'hsl(var(--surface-primary))',
			secondary: 'hsl(var(--surface-secondary))',
			tertiary: 'hsl(var(--surface-tertiary))',
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))',
		  },
		  zinc: {
			'300': '#d4d4d8',
			'400': '#a1a1aa',
			'500': '#71717a',
			'600': '#52525b',
			'700': '#3f3f46',
			'800': '#27272a',
			'900': '#18181b',
		  },
		  orange: {
			'300': '#fdba74',
			'400': '#fb923c',
			'500': '#f97316',
		  },
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
	  },
	},
	plugins: [require('tailwindcss-animate')],
  }