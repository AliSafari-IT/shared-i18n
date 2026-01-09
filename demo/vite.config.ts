import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/shared-i18n/',
  server: {
    port: 5173,
    open: true
  }
})
