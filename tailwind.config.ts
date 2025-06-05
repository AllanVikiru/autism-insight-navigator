
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New color scheme
				mint: {
					DEFAULT: '#68b684',
					100: '#13271a',
					200: '#254d34',
					300: '#38744e',
					400: '#4a9a68',
					500: '#68b684',
					600: '#86c59d',
					700: '#a4d3b5',
					800: '#c2e2ce',
					900: '#e1f0e6'
				},
				madder: {
					DEFAULT: '#a4031f',
					100: '#210106',
					200: '#42010c',
					300: '#630212',
					400: '#840318',
					500: '#a4031f',
					600: '#e8052b',
					700: '#fb3657',
					800: '#fc798f',
					900: '#febcc7'
				},
				saffron: {
					DEFAULT: '#f9c22e',
					100: '#392b02',
					200: '#735504',
					300: '#ac8005',
					400: '#e6aa07',
					500: '#f9c22e',
					600: '#facf59',
					700: '#fbdb82',
					800: '#fce7ac',
					900: '#fef3d5'
				},
				night: {
					DEFAULT: '#080f0f',
					100: '#020303',
					200: '#040707',
					300: '#050a0a',
					400: '#070d0d',
					500: '#080f0f',
					600: '#2b5050',
					700: '#4d8f8f',
					800: '#81bbbb',
					900: '#c0dddd'
				},
				white: {
					DEFAULT: '#ffffff',
					100: '#333333',
					200: '#666666',
					300: '#999999',
					400: '#cccccc',
					500: '#ffffff',
					600: '#ffffff',
					700: '#ffffff',
					800: '#ffffff',
					900: '#ffffff'
				},
				// Legacy aliases using new colors
				navy: '#080f0f',
				teal: '#68b684',
				red: '#a4031f',
				orange: '#f9c22e',
				// Updated brand colors to match the new scheme
				brand: {
					50: '#e1f0e6',
					100: '#c2e2ce',
					200: '#a4d3b5',
					300: '#86c59d',
					400: '#68b684',
					500: '#68b684',
					600: '#4a9a68',
					700: '#38744e',
					800: '#254d34',
					900: '#13271a',
					950: '#080f0f',
				},
				support: {
					50: '#fef3d5',
					100: '#fce7ac',
					200: '#fbdb82',
					300: '#facf59',
					400: '#f9c22e',
					500: '#f9c22e',
					600: '#e6aa07',
					700: '#ac8005',
					800: '#735504',
					900: '#392b02',
					950: '#080f0f',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
