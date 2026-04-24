/**
 * Shared demo brand links — use the same values in DSA mock tables and CSV column `category`.
 * For GitHub Pages, keep assets in `public/`; override the logo with `VITE_ITC_LOGO_URL` to point
 * at `https://raw.githubusercontent.com/<user>/<repo>/<branch>/public/itc-mark.svg` if you host there.
 */
export const ITC_DEMO_GITHUB = 'https://github.com/KavithLR/Supply-Review-Dashboards';

const base = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL != null ? import.meta.env.BASE_URL : '/';
export const ITC_LOGO_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ITC_LOGO_URL) || `${base}itc-mark.svg`;
