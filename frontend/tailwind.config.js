/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        palmer: ['"Palmer Script"', 'cursive'],
      },
      colors: {
        light: {
          background: '#F9FAFB',    // Blanco puro limpio
          card: '#FFFFFF',
          text: '#111827',          // Gris negruzco para elegancia
          textSecondary: '#6B7280', // Gris medio neutral
          border: '#E5E7EB',        // Gris claro para bordes sutiles
          primary: '#1F2937',       // Charcoal sobrio
          secondary: '#4B5563',     // Gris medio
          accent: '#6366F1',        // **Indigo Figma-style (elegante, moderno)**
          accentSoft: '#E0E7FF',    // Fondo indigo muy suave (hover/badge)
          success: '#10B981',       // Verde suave (para states OK)
          warning: '#F59E0B',       // Amarillo sobrio (warning)
          error: '#EF4444',         // Rojo moderno (error)
        },
        dark: {
          background: '#0B0F19',     // Azul-negruzco profundo (super moderno)
          card: '#1F2937',           // Charcoal suave
          text: '#F3F4F6',           // Gris muy claro
          textSecondary: '#9CA3AF',
          border: '#374151',         // Gris oscuro para bordes
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
          accent: '#818CF8',         // Indigo claro (resalta en oscuro)
          accentSoft: '#312E81',     // Fondo indigo suave (hover)
          success: '#22C55E',
          warning: '#FBBF24',
          error: '#F87171',
        }
      }
    }
  },
  plugins: [],
}