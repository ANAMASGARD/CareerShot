import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'float-slow': 'float 6s ease-in-out infinite',
  			'float-reverse': 'float-reverse 8s ease-in-out infinite',
  			'float-delayed': 'float 5s ease-in-out infinite 1s',
  			'float-fast': 'float 4s ease-in-out infinite',
  			'float-reverse-fast': 'float-reverse 3s ease-in-out infinite',
  			'twinkle': 'twinkle 2s ease-in-out infinite',
  			'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
  			'text-shimmer': 'text-shimmer 2.5s ease-in-out infinite',
  			'spin-slow': 'spin 8s linear infinite',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
  				'33%': { transform: 'translateY(-10px) rotate(1deg) scale(1.02)' },
  				'66%': { transform: 'translateY(5px) rotate(-1deg) scale(0.98)' },
  			},
  			'float-reverse': {
  				'0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
  				'33%': { transform: 'translateY(8px) rotate(-1deg) scale(0.98)' },
  				'66%': { transform: 'translateY(-12px) rotate(1deg) scale(1.02)' },
  			},
  			twinkle: {
  				'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
  				'50%': { opacity: '1', transform: 'scale(1.2)' },
  			},
  			'gradient-shift': {
  				'0%, 100%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  			},
  			'text-shimmer': {
  				'0%': { backgroundPosition: '-200% center' },
  				'100%': { backgroundPosition: '200% center' },
  			},
  		},
  		backgroundImage: {
  			'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  		},
  		backdropBlur: {
  			xs: '2px',
  		},
  		gridTemplateColumns: {
  			'16': 'repeat(16, minmax(0, 1fr))',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
