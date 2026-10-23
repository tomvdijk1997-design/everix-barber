import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative asset paths, so the build works on GitHub Pages (/everix-barber/) and on a custom domain
  base: './',
  plugins: [react()],
})
