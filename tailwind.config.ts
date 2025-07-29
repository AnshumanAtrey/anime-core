import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blood-red': '#b31217',
        'dark-bg': '#0a0608',
        'dark-card': '#1a0c10',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        jacquard: ['Jacquard 12', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;
