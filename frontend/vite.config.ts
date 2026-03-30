import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
 plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    strictPort: true, // Se a 3000 estiver ocupada, ele não tenta outra
    host: true,
  },
})
