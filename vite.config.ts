import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
const BASE_PATH = process.env.VITE_BASE_PATH || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_PATH,
  build: {
    sourcemap: true,
    assetsDir: 'code',
    target: ['esnext', 'edge100', 'firefox100', 'chrome100', 'safari18'],
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: 'public/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: ['**/*.{html,js,css,json, png}'],
      },
      base: BASE_PATH,
      injectRegister: false,
      manifest: false,
      devOptions: {
        enabled: true,
      },
    }),
  ],
});

