import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// Resolve the base path for assets. Prefer an explicit VITE_BASE_PATH env
// variable, then fall back to Vite's BASE_URL when available, and finally
// default to '/'. Guard against `import.meta.env` being undefined when the
// config is evaluated in a non-Vite context (e.g. during tests or builds).
const base = process.env.VITE_BASE_PATH || import.meta.env?.BASE_URL || '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    rollupOptions: {
      external: ['@tauri-apps/api/dialog', '@tauri-apps/api/fs']
    }
  },
  test: {
    environment: 'jsdom'
  }
})
