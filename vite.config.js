import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Modern browsers only: smaller, faster JavaScript (no legacy transforms).
    target: 'es2020',
    // Every supported browser has native modulepreload.
    modulePreload: { polyfill: false },
    // Skip gzip-size reporting: it only slows the build down.
    reportCompressedSize: false,
  },
})
