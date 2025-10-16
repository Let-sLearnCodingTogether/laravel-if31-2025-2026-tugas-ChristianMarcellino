import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve : {
    alias : {
      '@css' : "/src/assets/css",
      '@components' : "/src/components/ui",
      '@pages' : "/src/pages",
      '@api' : "/src/api"
    }
  }
})
