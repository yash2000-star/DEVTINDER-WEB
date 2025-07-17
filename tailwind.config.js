/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("daisyui")
  ],

  daisyui: {
    themes: [
      {
        'devtinder-light': { 
          "primary": "#3B82F6", 

          "secondary": "#1E40AF",
          
          "accent": "#3B82F6",
          
          "neutral": "#F3F4F6",
          
          "base-100": "#FFFFFF", 
          
          "base-content": "#1F2937", 

          "info": "#3ABFF8",
          "success": "#4ADE80",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
        devtinder: {
          "primary": "#8B5CF6",
          "secondary": "#3730A3",
          "accent": "#A78BFA",
          "neutral": "#1F2937",
          "base-100": "#111827",
          "base-content": "#E5E7EB",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
}