import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textColor: {
        primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        brand: "rgb(var(--text-brand-rgb) / <alpha-value>)",
        "on-brand": "rgb(var(--text-on-brand-rgb) / <alpha-value>)",
      },
      backgroundColor: {
        base: "rgb(var(--bg-base-rgb) / <alpha-value>)",
      },
      colors: {
        // Camada 2: Tokens Semânticos da EPM DEVTECH
        surface: "rgb(var(--bg-surface-rgb) / <alpha-value>)",
        elevated: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
        overlay: "var(--bg-overlay)",

        "border-subtle": "rgb(var(--border-subtle-rgb) / <alpha-value>)",
        "border-default": "rgb(var(--border-default-rgb) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong-rgb) / <alpha-value>)",

        "on-brand": "rgb(var(--text-on-brand-rgb) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary-rgb) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted-rgb) / <alpha-value>)",
        "text-brand": "rgb(var(--text-brand-rgb) / <alpha-value>)",
        "text-on-brand": "rgb(var(--text-on-brand-rgb) / <alpha-value>)",
        text: {
          primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
          muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
          brand: "rgb(var(--text-brand-rgb) / <alpha-value>)",
          "on-brand": "rgb(var(--text-on-brand-rgb) / <alpha-value>)",
        },

        brand: {
          DEFAULT: "rgb(var(--brand-rgb) / <alpha-value>)",
          hover: "rgb(var(--brand-hover-rgb) / <alpha-value>)",
          active: "rgb(var(--brand-active-rgb) / <alpha-value>)",
          subtle: "var(--brand-subtle)",
        },

        accent: {
          DEFAULT: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          blue: {
            DEFAULT: "rgb(var(--accent-blue-rgb) / <alpha-value>)",
            subtle: "var(--accent-blue-subtle)",
          },
          violet: {
            DEFAULT: "rgb(var(--accent-violet-rgb) / <alpha-value>)",
            subtle: "var(--accent-violet-subtle)",
          },
          amber: {
            DEFAULT: "rgb(var(--accent-amber-rgb) / <alpha-value>)",
            subtle: "var(--accent-amber-subtle)",
          },
        },

        success: {
          DEFAULT: "rgb(var(--success-rgb) / <alpha-value>)",
          subtle: "var(--success-subtle)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning-rgb) / <alpha-value>)",
          subtle: "var(--warning-subtle)",
        },
        danger: {
          DEFAULT: "rgb(var(--danger-rgb) / <alpha-value>)",
          subtle: "var(--danger-subtle)",
        },

        "focus-ring": "rgb(var(--focus-ring-rgb) / <alpha-value>)",
        "glow-brand": "var(--glow-brand)",

        // Compatibilidade semântica com componentes shadcn/ui
        border: "rgb(var(--border-default-rgb) / <alpha-value>)",
        input: "rgb(var(--border-default-rgb) / <alpha-value>)",
        ring: "rgb(var(--focus-ring-rgb) / <alpha-value>)",
        background: "rgb(var(--bg-base-rgb) / <alpha-value>)",
        foreground: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--brand-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-on-brand-rgb) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--danger-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--bg-surface-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--bg-surface-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--bg-surface-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "rgb(var(--bg-surface-rgb) / <alpha-value>)",
          foreground: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          primary: "rgb(var(--brand-rgb) / <alpha-value>)",
          "primary-foreground": "rgb(var(--text-on-brand-rgb) / <alpha-value>)",
          accent: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
          "accent-foreground": "rgb(var(--text-primary-rgb) / <alpha-value>)",
          border: "rgb(var(--border-subtle-rgb) / <alpha-value>)",
          ring: "rgb(var(--focus-ring-rgb) / <alpha-value>)",
        },
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
        'gradient-hero': 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.1), transparent 60%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
