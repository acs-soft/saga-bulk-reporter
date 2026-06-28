# Saga Bulk Reporter — brand & social kit

Visual assets for the Facebook page (and other social/link use), built on the
same Swiss/International design system as the landing page (`index.html`):
brand blue `#0066CC`, near-black `#0A0A0A`, systematic grid, bold Segoe UI.

The **logo mark** is a 4×4 grid with a blue diagonal — it stands for the
product's core idea (*every firmă × every lună in a single run*) and echoes the
rounded blue checkboxes in the app UI.

## What to upload to Facebook

| File | Size | Where it goes |
|------|------|---------------|
| `facebook/profile.png` | 1024×1024 | **Profile picture.** FB crops it to a circle — the mark is inset to stay fully inside the circle. |
| `facebook/cover.png` | 1640×624 | **Cover photo.** Content is weighted center/upper so the avatar + page name (bottom-left on desktop) never overlap it. |
| `facebook/og-image.png` | 1200×630 | Optional upload; mainly used as the **link-preview image** (already wired into `index.html`, see below). |
| `facebook/post-announcement.png` | 1080×1080 | Reusable **feed post** — blue "announcement" layout. |
| `facebook/post-feature.png` | 1080×1080 | Reusable **feed post** — white "feature" layout. |

> Facebook recompresses uploads. These are PNGs sized at 2× for sharpness; no
> further optimization is needed. If FB ever rejects the cover on mobile, the
> safe-zone is already centered, so re-cropping inside FB is non-destructive.

## Logo masters (for any other use)

| File | Notes |
|------|-------|
| `logo/mark.svg` | Vector master — blue diagonal on gray, for light backgrounds. **Scale this for print/anything.** |
| `logo/mark-white.svg` | Vector master — white, for dark/photo backgrounds. |
| `logo/logo-mark.png` | 1024×1024, transparent — same as `mark.svg`. |
| `logo/logo-mark-white.png` | 1024×1024, transparent — same as `mark-white.svg`. |

## Link previews (Open Graph)

`index.html` now references `images/og-image.png` via `og:image` +
`twitter:image`, so sharing the site link on Facebook/X shows the branded card.
`images/og-image.png` is a copy of `facebook/og-image.png` — regenerated below.

## Regenerating / editing

Everything is generated from source — no binary editing.

```sh
node brand/_src/build-assets.js   # writes the HTML "canvas" per asset
bash brand/_src/render.sh         # headless-Chrome → pixel-exact PNGs
```

- Edit copy, colors, or layout in `brand/_src/build-assets.js` (one block per
  asset; brand tokens are at the top).
- `render.sh` shells out to Chrome at `--window-size` = each asset's exact
  dimensions, so output PNGs are always pixel-perfect.
- `brand/_src/dims.js <png...>` prints `width×height` for a quick check.

Requirements: Node + Google Chrome (paths are set at the top of `render.sh`).
