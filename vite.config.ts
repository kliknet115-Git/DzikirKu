import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

function injectServiceWorkerAssets(): Plugin {
  return {
    name: 'inject-sw-assets',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      const swPath = path.resolve(distDir, 'sw.js');
      const assetsDir = path.resolve(distDir, 'assets');

      if (!fs.existsSync(swPath) || !fs.existsSync(assetsDir)) {
        return;
      }

      const assetFiles = fs.readdirSync(assetsDir);
      const assetUrls = assetFiles.map((file) => `  './assets/${file}',`);

      let swContent = fs.readFileSync(swPath, 'utf-8');
      const replacement = assetUrls.join('\n');
      swContent = swContent.replace('/* __DYNAMIC_ASSETS__ */', replacement);

      fs.writeFileSync(swPath, swContent, 'utf-8');
      console.log(`[inject-sw-assets] Injected ${assetFiles.length} build assets into dist/sw.js`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
    injectServiceWorkerAssets(),
  ],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
