import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Styles': path.resolve(__dirname, 'src/styles'),
      '@Components': path.resolve(__dirname, 'src/components'),
      // Puedes agregar más alias aquí si necesitas
    },
  },
})
