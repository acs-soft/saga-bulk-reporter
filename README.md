# Saga Bulk Reporter — site & releases

Public landing page and release host for the **Saga Bulk Reporter** Windows app.

- **Landing page**: a static site self-hosted on the `dev-projects.work` server (nginx behind Traefik) at <https://bulkreporter.ro/>. Pushes to `main` auto-deploy via `.github/workflows/deploy.yml` (see "Updating the landing page" below).
- **Releases**: each `v*` tag in the [private app repo](https://github.com/acs-soft/saga-bulk-reporter-app) builds an installer and uploads it here as a release asset. The landing page's Download buttons link to `releases/latest/download/SagaBulkReporter-Setup-X.Y.Z.exe`, where `X.Y.Z` matches the current version — the app repo's release workflow bumps that filename in `index.html` on every non-prerelease tag, alongside the "Versiune X.Y.Z" strings. GitHub's `releases/latest/download/` path redirects to the asset of that exact name on the newest release.
- **App source**: lives in <https://github.com/acs-soft/saga-bulk-reporter-app> (private).

## Updating the landing page

Edit `index.html` in place and push to `main`. The `Deploy to server` workflow (`.github/workflows/deploy.yml`) rsyncs the site to the server automatically; nginx serves it live with no rebuild.

The "Versiune X.Y.Z" strings and the versioned `SagaBulkReporter-Setup-X.Y.Z.exe` download hrefs in the hero and footer are auto-updated by the app repo's release workflow on every non-prerelease tag — don't hand-edit them during a release cycle, or the next `sed` may miss them.

## Screenshots

Place product screenshots at `images/screenshot-1.webp`, `images/screenshot-2.webp`, `images/screenshot-3.webp`. If they're missing the layout shows a graceful placeholder.
