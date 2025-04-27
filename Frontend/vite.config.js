import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'mock-aws-s3', 
        'aws-sdk', 
        'nock', 
        '@mapbox/node-pre-gyp', 
        'node-pre-gyp' // Ensure 'node-pre-gyp' is listed here
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      'mock-aws-s3', 
      'aws-sdk', 
      'nock', 
      '@mapbox/node-pre-gyp', 
      'node-pre-gyp' // Ensure 'node-pre-gyp' is listed here
    ]
  }
})