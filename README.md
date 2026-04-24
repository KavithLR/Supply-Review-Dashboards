# ITC Supply Review Dashboard

React + Vite app: production, raw materials inventory, **Demand Supply Alignment**, suppliers, OTIF, expectations, and data upload / CSV templates.

## Live site (GitHub Pages)

After [GitHub Actions](.github/workflows/deploy-github-pages.yml) has run at least once and **Settings → Pages → Source** is set to **GitHub Actions**:

**https://kavithlr.github.io/Supply-Review-Dashboards/**

(Asset `base` is `/Supply-Review-Dashboards/`, set automatically in CI to match the repository name.)

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (port **5300** by default).

## Build (optional)

```bash
npm run build
npm run preview
```

To test the same `base` path as GitHub Pages locally:

```bash
set VITE_BASE_PATH=/Supply-Review-Dashboards/
npm run build && npm run preview
```

(PowerShell: `$env:VITE_BASE_PATH="/Supply-Review-Dashboards/"; npm run build; npm run preview`)

## Repository

**https://github.com/KavithLR/Supply-Review-Dashboards**
