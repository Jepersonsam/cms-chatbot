import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',     // penting: buka ke jaringan lokal
    port: 5173           // opsional: default Vite
  }
})
