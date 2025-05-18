import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env': {
      API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:5000'),
    },
  },
});
