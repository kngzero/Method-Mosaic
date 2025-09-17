import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// Ensure the built assets are served from the correct subpath when deploying.
// Default to the root for platforms like Vercel, but fall back to the GitHub
// Pages subpath when building in GitHub Actions or when explicitly requested.
const requestedBase = process.env.VITE_BASE_PATH
const base =
  requestedBase ??
  (process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true'
    ? '/Method-Mosaic/'
    : '/')

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
