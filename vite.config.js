import { copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages: static files live in a *subpath* of io.github (e.g. …/Supply-Review-Dashboards/).
 * A relative `base: './' ` (set in .env.production) avoids broken absolute `/…/assets/…` URLs on redirect.
 * Also copies index.html → 404.html (GitHub Pages Serves 404 for some paths; SPA still loads).
 */
function normalizeBase(raw) {
  if (raw == null || raw === '' || raw === '/') return '/';
  if (raw === './' || raw === '.') return './';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

const ghpages404Plugin = {
  name: 'ghpages-copy-index-404',
  /** After dist/index.html is written (avoids copy-before-write vs closeBundle ordering). */
  writeBundle: () => {
    const dist = join(process.cwd(), 'dist');
    try {
      copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
    } catch {
      /* no-op: build output missing in odd environments */
    }
  },
};

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), 'VITE');
  let raw = fileEnv.VITE_BASE_PATH || process.env.VITE_BASE_PATH;
  // If .env.production is not in the repo, loads are empty: Vite would default to base "/",
  // which makes script src="/assets/..." and breaks GitHub *project* Pages (assets 404 at site root).
  // A relative base keeps ./assets/... and works in /user/repo/ without env files in CI.
  if (mode === 'production' && (raw == null || String(raw).trim() === '')) {
    raw = './';
  }
  const base = normalizeBase(raw);
  return {
  plugins: [react(), ghpages404Plugin],
  base,
  /** Dedicated port for this app so it does not clash with other Vite projects on 5173 */
  server: {
    port: 5300,
    strictPort: false,
  },
  preview: {
    port: 5300,
    strictPort: false,
  },
  };
});
