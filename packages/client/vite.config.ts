import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    /// This 'proxy' setting acts as a middleman during development.
    proxy: {
      // It creates a rule: "Look for any request starting with '/api'"
      // When a match is found, forward that request to this target (your backend).
        // Note: Use 'http' if your backend is not using SSL (https). 
        // Most local Node servers run on 'http'.
      '/api': 'http://localhost:5000'
    }
  }
})
