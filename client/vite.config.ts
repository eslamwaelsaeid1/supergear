import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // تأكد من أنه موجود لمنع مشاكل المسارات
  build: {
    rollupOptions: {
    }
  }
})
 
