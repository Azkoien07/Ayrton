module.exports = {
  darkMode: 'class',
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
          background: '#F9FAFB',        // Blanco humo muy claro con un toque cálido
          card: '#FFFFFF',              // Blanco puro para tarjetas
          text: '#374151',              // Gris oscuro neutro para texto
          textSecondary: '#6B7280',     // Gris medio para secundarios
          border: '#D1D5DB',            // Gris claro para bordes
          primary: '#3A5A8F',           // Azul apagado, menos brillante, más serio
          secondary: '#5879B5',         // Azul medio para acentos
          accent: '#8CA1C7',            // Azul pastel grisáceo
          accentSoft: '#E5E9F3',        // Azul muy pálido para fondos
          success: '#22C55E',           // Verde claro y fresco
          warning: '#FBBF24',           // Amarillo dorado suave
          error: '#EF4444',             // Rojo estándar pero sin saturar
        },
        dark: {
          background: '#12141A',        // Gris oscuro con un toque azulado
          card: '#1F2233',              // Gris oscuro azulado para tarjetas
          text: '#E5E7EB',              // Gris claro para texto
          textSecondary: '#9CA3AF',     // Gris medio para secundarios
          border: '#374151',            // Gris oscuro para bordes
          primary: '#5879B5',           // Azul medio para modo oscuro
          secondary: '#8CA1C7',         // Azul pastel para acentos
          accent: '#3A5A8F',            // Azul apagado para detalles
          accentSoft: '#2E3A5C',        // Azul oscuro suave
          success: '#22C55E',
          warning: '#FBBF24',
          error: '#EF4444',
        }
      }
    }
  },
  plugins: [],
}
