// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
  const isProd = mode === 'production';
  const plugins = [react()];

  // Compresión opcional (no rompe si falta el paquete)
  if (isProd) {
    try {
      const mod = await import('vite-plugin-compression'); // ESM dynamic import
      const viteCompression = mod.default || mod;          // compat default/named

      plugins.push(
        viteCompression({
          algorithm: 'brotliCompress',
          ext: '.br',
        }),
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
        })
      );
    } catch (e) {
      console.warn('[vite] vite-plugin-compression no instalado, se omite en prod.');
    }
  }

  return {
    plugins,
    server: {
      // Solo afecta en dev; en Render (prod) no se usa este proxy
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    build: {
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        treeshake: true,
      }
    }
  };
});
