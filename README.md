# Bulk Reporter: site & releases

Public landing page and release host for the **Bulk Reporter** Windows app (formerly Saga Bulk Reporter).

- **Landing page**: a static site self-hosted on the `dev-projects.work` server (nginx behind Traefik) at <https://bulkreporter.ro/>. Pushes to `main` auto-deploy via `.github/workflows/deploy.yml` (see "Updating the landing page" below).
- **Releases**: each `v*` tag in the [private app repo](https://github.com/acs-soft/saga-bulk-reporter-app) builds an installer and uploads it here as a release asset, `BulkReporter-Setup-X.Y.Z.exe`. Publishing that release triggers `.github/workflows/publish-installer.yml`, which copies the installer to `/dl/` on the server and repoints the unversioned `/dl/BulkReporter-Setup.exe` (never for a prerelease). The page's Download buttons point at that unversioned `/dl/` URL, carry a versioned `download="BulkReporter-Setup-X.Y.Z.exe"` attribute, and keep the GitHub asset (`releases/latest/download/BulkReporter-Setup-X.Y.Z.exe`) as the fallback link. Design and traps: `docs/download-attribution.md` in the app repo.
- **Download counter**: `.github/workflows/track-downloads.yml` runs every 4 hours and adds the server's `/dl/` downloads to the frozen GitHub total. Any real GET of an installer counts, so check `/dl/` with `curl -I` only.
- **App source**: lives in <https://github.com/acs-soft/saga-bulk-reporter-app> (private).

## Updating the landing page

Edit `index.html` in place and push to `main`. The `Deploy to server` workflow (`.github/workflows/deploy.yml`) rsyncs the site to the server automatically; nginx serves it live with no rebuild. **Merging to `main` is publishing.**

The "Versiune X.Y.Z" strings and every versioned `BulkReporter-Setup-X.Y.Z.exe` reference (the `download` attributes and the GitHub fallback links) are auto-updated by the app repo's release workflow on every non-prerelease tag, in a commit it pushes to `main` at the end of the run. Don't hand-edit them during a release cycle, and don't merge to `main` while that run is going, or its push is rejected.

The report count is exact ("38 de rapoarte" in the hero and both meta descriptions) and so is the report catalogue: adding a report to the app means a new card here and a new count, in the same change as the app repo's `release.yml`.

## BulkBackup (`/tools/backup`)

A second product's page lives in this repo: `tools/backup/index.html`, at <https://bulkreporter.ro/tools/backup> (BulkBackup, from the private `acs-soft/saga-backup-app`). It has its own screenshots, favicon and footer disclaimer, and no analytics or cookies.

- **Releases** are not in this repo. They live in the public [`acs-soft/bulk-backup`](https://github.com/acs-soft/bulk-backup), because this repo's `releases/latest` is the reporter's update feed.
- **Publishing a version:** `gh workflow run publish-backup-installer.yml -f tag=vX.Y.Z` (`.github/workflows/publish-backup-installer.yml`, dispatch only). It:
  1. verifies `BulkBackup-Setup-X.Y.Z.exe` against the release digest;
  2. copies it into `/dl/` (never `--delete`) and re-checks the bytes the site serves;
  3. for a non-prerelease, rewrites every `BulkBackup-Setup-X.Y.Z.exe` and every `data-bb="version"` element in `tools/backup/index.html`, commits to `main` and deploys.
- **Links:** the page links the **versioned** `/dl/BulkBackup-Setup-X.Y.Z.exe`. There is no unversioned BulkBackup symlink, and nginx needs no BulkBackup rule.
- **Root `index.html`:** never put a BulkBackup version string in it (only the footer link): the reporter's release `sed` and update-check fallback read every „Versiune X.Y.Z” there.
- **Download counter:** BulkBackup downloads are not counted (`track-downloads.yml` matches `BulkReporter-Setup*.exe` only).
- **Screenshots** (`tools/backup/images/`): Stare, Setări and Istoric cropped to the runs table. They show no firm names or CIFs. Keep it that way.

## Screenshots

`images/screenshot-1.png` to `screenshot-3.png` (hero and the three steps) and `images/screenshot-4-sinteza.png` (the Sinteza section). They show only fictional firms: the app repo's seeder writes a presentable set with `dotnet run --project tools/SeedTestData -- <folder> --force --demo 10`. Never shoot them against a real Saga install. If an image is missing the layout shows a graceful placeholder.

`screenshot-4-sinteza.png` is both sheets of the report, stacked. If its size changes, update the `aspect-ratio` on `.sinteza__doc` in `index.html`. The link-preview card (`images/og-image.png`) is rendered from `brand/_src` (see `brand/README.md`); bump `?v=` on both image tags when it changes.
