/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "22.5rem",   // 360px
      md: "48rem",     // 768px
      lg: "64rem",    // 1024px
      xl: "120rem",   // 1920px
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1920px",
      },
    },
  extend: {
      filter: {
        'blanco-svg': 'invert(1) brightness(2)',
        'fucsia-svg': 'brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(3013%) hue-rotate(290deg) brightness(111%) contrast(124%)',
        'gris-medio-svg': 'brightness(0) saturate(100%) invert(35%) sepia(0%) saturate(502%) hue-rotate(224deg) brightness(102%) contrast(74%)',
        'aguamarina-svg': 'brightness(0) saturate(100%) invert(67%) sepia(50%) saturate(523%) hue-rotate(132deg) brightness(89%) contrast(100%)',
        'gris-light-medium': 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(4062%) hue-rotate(60deg) brightness(91%) contrast(84%)',
      },
      // For tailwindcss v3+, add custom utilities via safelist or plugin if needed
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        aqua: "hsl(var(--aqua))",
        violeta: "#663399",
        celeste: "#33FFFF",
        azul: "#008bf5",
        fucsia: "#bc00b8",
        grisxlight: "#fbfbfb",
        grislight: "#f4f4f4",
        grislightmedium: "#d8d8d8",
        grismedium: "#969696",
        grismediumdark: "#646464",
        grisdark: "#323232",
        blanco: "#FFFFFF",
        focusLine: "#F7C6EF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        "h-14": "3.5rem",
        "h-16": "4rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities({
        '.filter-blanco-svg': {
          filter: 'invert(1) brightness(2)',
        },
        '.filter-fucsia-svg': {
          filter: 'brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(3013%) hue-rotate(290deg) brightness(111%) contrast(124%)',
        },
        '.filter-gris-medio-svg': {
          filter: 'brightness(0) saturate(100%) invert(35%) sepia(0%) saturate(502%) hue-rotate(224deg) brightness(102%) contrast(74%)',
        },
        '.filter-aguamarina-svg': {
          filter: 'brightness(0) saturate(100%) invert(67%) sepia(50%) saturate(523%) hue-rotate(132deg) brightness(89%) contrast(100%)',
        },
        '.filter-gris-light-medium-svg': {
          filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(4062%) hue-rotate(60deg) brightness(91%) contrast(84%)',
        },
      }, ['responsive', 'hover', 'focus'])
    }
  ],
}
