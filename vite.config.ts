import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
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
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/*.svg',
          dest: 'shoelace/assets/icons',
        },
      ],
    }),
  ],
});

