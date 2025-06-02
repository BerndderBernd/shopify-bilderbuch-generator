import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['crypto'] // verhindere das Einpacken von Browser-crypto
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: {
      // fallback, falls irgendeine Browser-Version sich reinschleicht
      'crypto': 'node:crypto'
    }
  }
})