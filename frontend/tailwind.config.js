module.exports = {
  darkMode: 'class', // Asegura que la clase 'dark' se usa para activar el modo oscuro
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
          background: '#F4F4F4',    // Gris suave para fondo
          card: '#FFFFFF',          // Blanco para tarjetas
          text: '#2B2D42',          // Gris oscuro para texto
          textSecondary: '#4E5D6D',
          border: '#E0E0E0',        // Gris claro para bordes
          primary: '#1A5A4D',       // Verde oscuro
          secondary: '#A0A0A0',
          accent: '#4C8A8B',        // Verde menta
          accentSoft: '#E5F7F6',    // Verde suave
          success: '#4CAF50',       // Verde brillante
          warning: '#FFEB3B',
          error: '#F44336',
        },
        dark: {
          background: '#1C1C1C',    // Fondo oscuro
          card: '#2C2C2C',          // Gris oscuro para tarjetas
          text: '#EAEAEA',          // Texto claro
          textSecondary: '#B0B0B0', // Gris claro para texto secundario
          border: '#3A3A3A',        // Gris oscuro para bordes
          primary: '#4C8A8B',       // Verde menta en modo oscuro
          secondary: '#A0A0A0',
          accent: '#1A5A4D',        // Verde oscuro
          accentSoft: '#E5F7F6',
          success: '#4CAF50',
          warning: '#FFEB3B',
          error: '#F44336',
        }
      }
    }
  },
  plugins: [],
}
