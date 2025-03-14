/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#1a1a1a',    // sidebar bg
          secondary: '#f1f5f9',  // main content bg
          hover: '#333',         // hover states
        },
        text: {
          primary: '#ffffff',    // white text
          secondary: '#64748b',  // muted text
          accent: '#3b82f6',     // links/actions
        }
      }
    },
  },
  plugins: [],
}