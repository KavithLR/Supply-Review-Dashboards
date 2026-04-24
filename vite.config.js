import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** GitHub project Pages URL is https://USER.github.io/REPO/ — assets must load under /REPO/ */
function appBase() {
  const raw = process.env.VITE_BASE_PATH;
  if (!raw || raw === '/') return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

export default defineConfig({
  plugins: [react()],
  base: appBase(),
  /** Dedicated port for this app so it does not clash with other Vite projects on 5173 */
  server: {
    port: 5300,
    strictPort: false,
  },
  preview: {
    port: 5300,
    strictPort: false,
  },
});
