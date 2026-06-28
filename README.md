# Saga Bulk Reporter — site & releases

Public landing page and release host for the **Saga Bulk Reporter** Windows app.

- **Landing page**: served via GitHub Pages from this repo's `main` branch on the custom domain <https://bulkreporter.ro/> (see `CNAME`; `acs-soft.github.io/saga-bulk-reporter/` redirects there)
- **Releases**: each `v*` tag in the [private app repo](https://github.com/acs-soft/saga-bulk-reporter-app) builds an installer and uploads it here as a release asset. The landing page's Download button always links to `releases/latest/download/SagaBulkReporter-Setup.exe`, which GitHub redirects to the current latest installer.
- **App source**: lives in <https://github.com/acs-soft/saga-bulk-reporter-app> (private).

## Updating the landing page

Edit `index.html` in place and push to `main`. GitHub Pages picks up the change automatically.

The "Versiune X.Y.Z" string in the hero and footer is auto-updated by the app repo's release workflow on every non-prerelease tag — don't hand-edit it during a release cycle, or the next `sed` may miss it.

## Screenshots

Place product screenshots at `images/screenshot-1.webp`, `images/screenshot-2.webp`, `images/screenshot-3.webp`. If they're missing the layout shows a graceful placeholder.
