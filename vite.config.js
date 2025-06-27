import { defineConfig } from 'vite';

export default defineConfig({
  base: '/sp-memorial-school/',
  server: {
    open: true
  },
  build: {
    outDir: 'dist'
  }
});