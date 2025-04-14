import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
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
        sidebar: {
          DEFAULT: '#340C40',
          foreground: 'hsl(var(--sidebar-foreground, 0, 0%, 100%))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        beige: {
          DEFAULT: '#4B3421',
          'input-border': '#EBE3DA',
          900: '#FFF8F0',
          800: '#FFDBC5',
          700: '#F4B89E',
          600: '#E4CEB6',
          500: '#F5ECE6',
        },
        green: {
          900: '#487743',
          800: '#6A9665',
          700: '#8FC888',
        },
        brown: {
          900: '#3B1710',
          800: '#816F5F',
          700: '#4B3421',
          600: '#765B53',
        },
        red: {
          900: '#FF6B6B',
        },
        gray: {
          900: '#4D4B48',
        },
        'background-web': 'var(--color-background)', // Fundo
        'card-web': 'var(--color-card)', // Cor do card
        'text-web': 'var(--color-text)', // Texto principal
        'primary-web': 'var(--color-primary)', // Cor primária
        'secondary-web': 'var(--color-secondary)', // Cor secundária
        'border-web': 'var(--color-border)', // Bordas
        'accent-web': {
          900: 'var(--color-accent-900)', // Verde escuro
          800: 'var(--color-accent-800)', // Verde médio
          700: 'var(--color-accent-700)', // Verde claro
        },
        neutral: {
          900: 'var(--color-neutral-900)', // Marrom escuro
          800: 'var(--color-neutral-800)', // Marrom médio
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'beige-svg': "url('src/assets/backgroundimage1.svg)",
        'green-svg': "url('src/assets/backgroundimage3.svg)",
      },
    },
  },
//   plugins: [require('tailwindcss-animate')],
} satisfies Config
