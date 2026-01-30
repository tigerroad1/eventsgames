import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@components': path.resolve(process.cwd(), './src/components'),
      '@services': path.resolve(process.cwd(), './src/services'),
      '@types': path.resolve(process.cwd(), './src/types'),
      '@hooks': path.resolve(process.cwd(), './src/hooks'),
      '@store': path.resolve(process.cwd(), './src/store'),
    },
  },
})
