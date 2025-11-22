import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/shared-i18n/',
  server: {
    port: 5185,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
