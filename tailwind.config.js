// tailwind.config.js

module.exports = {
  //... your existing content
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#1c1c1e',
        'ios-blue': '#007aff',
        'subtle-gray': '#666',
        'light-gray-border': '#e0e0e0',
      },
      fontFamily: {
        // Add Poppins and fallback to system sans-serif fonts
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.5rem', // 40px, for the screen container
      },
    },
  },
  plugins: [
    require("daisyui") // Make sure daisyui is here
  ],
  //... your existing daisyui config
}