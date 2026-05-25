import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// XAMPP: set XAMPP=1 when building for http://localhost/portfolio/portfolio/
const isXampp = process.env.XAMPP === '1'

export default defineConfig({
  plugins: [react()],
  base: isXampp ? '/portfolio/portfolio/' : '/',
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
})
