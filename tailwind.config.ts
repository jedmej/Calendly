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
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'system-ui',
					'Helvetica Neue',
					'sans-serif'
				],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
			},
			spacing: {
				'4.5': '1.125rem',
				'5.5': '1.375rem',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#007AFF',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#8E8E93',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#FF3B30',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F2F2F7',
					foreground: '#8E8E93'
				},
				accent: {
					DEFAULT: '#34C759',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#000000'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#000000'
				},
				sidebar: {
					DEFAULT: '#F2F2F7',
					foreground: '#000000',
					primary: '#007AFF',
					'primary-foreground': '#FFFFFF',
					accent: '#E5E5EA',
					'accent-foreground': '#000000',
					border: '#C7C7CC',
					ring: '#007AFF'
				}
			},
			borderRadius: {
				lg: '10px',
				md: '8px',
				sm: '6px',
				'2xl': '16px',
				'3xl': '20px',
				'4xl': '24px',
				'5xl': '32px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
