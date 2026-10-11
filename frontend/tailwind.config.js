/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ancient Temple custom theme colors
        temple: {
          dark: '#0f0e0c',        // Deep obsidian shadows
          stone: '#1e1c18',       // Weathered stone block
          stoneLight: '#2c2923',  // Highlighted stone edge
          wood: '#3b2414',        // Aged dark timber
          sand: '#d1b98a',        // Ancient sandstone
          parchment: '#f4ebd0',   // Ancient scroll parchment
          gold: '#d4af37',        // Ancient temple gold
          goldBright: '#f3c94b',  // Glowing gold treasure
          torch: '#ff8c38',       // Warm burning torch flame
          torchGlow: '#ffa726',   // Ambient flame glow
          moss: '#1c3829',        // Deep ancient moss
          mossLight: '#2e5a40',   // Overgrown temple vine
          crimson: '#8b1e1e',     // Mystic gem crimson
        }
      },
      fontFamily: {
        temple: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'torch': '0 0 25px rgba(255, 140, 56, 0.45)',
        'torch-lg': '0 0 50px rgba(255, 140, 56, 0.6)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.5)',
        'moss-glow': '0 0 20px rgba(46, 90, 64, 0.4)',
      }
    },
  },
  plugins: [],
}
