import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    // 🔥 Comprime assets (gzip + brotli)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // tu backend local
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    minify: 'esbuild',   // 🔥 minificación súper rápida
    sourcemap: false,    // no generes mapas si no los usas
    rollupOptions: {
      treeshake: true,   // elimina código muerto
    }
  }
});
