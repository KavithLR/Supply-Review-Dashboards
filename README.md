# ITC Supply Review Dashboard

React + Vite app: production, raw materials inventory, **Demand Supply Alignment**, suppliers, OTIF, expectations, and data upload / CSV templates.

## Live site (GitHub Pages)

After [GitHub Actions](.github/workflows/deploy-github-pages.yml) has run at least once and **Settings → Pages → Source** is set to **GitHub Actions**:

**https://kavithlr.github.io/Supply-Review-Dashboards/**

The site is published under a **subpath** (`/Supply-Review-Dashboards/`). Vite `base` comes from [`.env.production`](.env.production) and the GitHub Action env `VITE_BASE_PATH`. If the live site is **blank / white** but local dev works, the usual cause is a **mismatched** base: built assets 404. Use **Source: GitHub Actions** for Pages (not “Deploy from a branch” to `/` without a build), push again, and wait for the green workflow run.

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

## Push this project to GitHub (first time)

1. Create or use the repo: **https://github.com/KavithLR/Supply-Review-Dashboards** (empty is fine).
2. Add it as a remote and push `main` (keeps your other remotes, e.g. `origin`, unchanged):
   ```bash
   git remote add kavith-supply https://github.com/KavithLR/Supply-Review-Dashboards.git
   git push -u kavith-supply main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (not “Deploy from a branch” until you use the workflow).
4. Open the **Actions** tab and confirm **Deploy GitHub Pages** finished green.

If `git push` shows `index-pack` / `did not receive expected object`, try again, use [GitHub Desktop](https://desktop.github.com), or `gh auth login` and push from your machine; this is often network or a transient GitHub quirk.

## Repository

**https://github.com/KavithLR/Supply-Review-Dashboards**
