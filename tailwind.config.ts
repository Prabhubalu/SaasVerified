import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
      keyframes: {
        'confetti-fall': {
          '0%': { 
            transform: 'translateY(0) rotate(0deg)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateY(600px) rotate(720deg)', 
            opacity: '0' 
          },
        },
      },
      animation: {
        'confetti-fall': 'confetti-fall 3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;

