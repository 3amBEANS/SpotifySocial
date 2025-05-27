import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:5050", // your backend
        changeOrigin: true,
        secure: false, // needed for self-signed HTTPS certs
      },
    },
  },
});
