import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Separa vendors pesados en chunks propios (mejor cacheo, bundle inicial más liviano)
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
