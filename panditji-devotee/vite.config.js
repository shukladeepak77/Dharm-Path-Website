import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/guided-pooja/',
  build: {
    outDir: '../guided-pooja',
    emptyOutDir: true,
  },
})
