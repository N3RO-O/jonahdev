import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// XAMPP only: npm run build:xampp (sets XAMPP=1). Vercel/production always use base "/".
const isXampp = process.env.XAMPP === '1' && !process.env.VERCEL

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
