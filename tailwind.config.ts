import type { Config } from "tailwindcss";
import daisyui from "daisyui";

//  Extend config type to allow 'daisyui'
const config: Config & { daisyui?: unknown } = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1D4ED8",     // Blue
          secondary: "#9333EA",   // Purple
          accent: "#F59E0B",      // Amber
          neutral: "#111827",     // Dark Gray
          "base-100": "#ffffff",  // Background (white for light mode)
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};

export default config;
