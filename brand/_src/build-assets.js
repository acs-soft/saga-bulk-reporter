/* ============================================================
   Saga Bulk Reporter — Facebook brand asset generator
   ------------------------------------------------------------
   Writes one self-contained HTML "canvas" per asset into this
   folder. A headless-Chrome screenshot of each (at the matching
   --window-size) produces the final, ready-to-upload PNG.

   Design system mirrors index.html exactly:
   Swiss/International — rigid grid, systematic type, surgical color.
   Run:  node brand/_src/build-assets.js
   ============================================================ */

const fs = require('fs');
const path = require('path');
const OUT = __dirname;

/* ---- Brand tokens (from index.html :root) ---- */
const C = {
  blue: '#0066CC', blueDk: '#0052A3', blueDkr: '#003D7A',
  black: '#0A0A0A', white: '#FFFFFF',
  g50: '#FAFAFA', g100: '#F5F5F5', g200: '#E8E8E8', g300: '#D4D4D4',
  g400: '#A3A3A3', g500: '#737373', g600: '#525252', g800: '#262626',
};
const FONT = `"Segoe UI",-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif`;

/* ---- The matrix mark: 4×4 grid, blue diagonal (firme × luni) ---- */
function mark(variant /* 'light' | 'onblue' */) {
  const pos = [0, 26, 52, 78];
  let rects = '';
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      const d = r === c ? ' d' : '';
      rects += `<rect class="c${d}" x="${pos[c]}" y="${pos[r]}" width="22" height="22" rx="3.5"/>`;
    }
  return `<svg class="mark mark--${variant}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Saga Bulk Reporter">${rects}</svg>`;
}

/* ---- Shared CSS ---- */
const BASE = `
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html,body{width:100%;height:100%;overflow:hidden}
  body{font-family:${FONT};-webkit-font-smoothing:antialiased;background:${C.white}}
  .stage{position:relative;overflow:hidden}
  .mark .c{fill:var(--cell-empty)}
  .mark .c.d{fill:var(--cell-fill)}
  .mark--light{--cell-empty:${C.g200};--cell-fill:${C.blue}}
  .mark--onblue{--cell-empty:rgba(255,255,255,.22);--cell-fill:#fff}
  .eyebrow{font-weight:700;text-transform:uppercase;color:${C.blue};letter-spacing:.14em}
  .rule{background:${C.blue};border:0}
  .lockup{display:flex;align-items:center;gap:18px}
  .lockup .wm{display:flex;flex-direction:column;line-height:1}
  .lockup .wm b{font-weight:700;color:${C.black};letter-spacing:-.01em}
  .lockup .wm small{font-weight:600;text-transform:uppercase;letter-spacing:.16em;color:${C.g400}}
  .lockup--onblue .wm b{color:#fff}
  .lockup--onblue .wm small{color:rgba(255,255,255,.7)}
`;

function page(w, h, css, body) {
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8">
<style>${BASE}
.stage{width:${w}px;height:${h}px}
${css}</style></head><body><div class="stage">${body}</div></body></html>`;
}

/* ============================================================
   1) PROFILE PICTURE — 1024×1024 (reads as a circle on FB)
   ============================================================ */
const profile = page(1024, 1024, `
  #s-profile{background:${C.blue};display:flex;align-items:center;justify-content:center}
  #s-profile .mark{width:600px;height:600px}
`, `<div class="stage" id="s-profile" style="width:1024px;height:1024px">${mark('onblue')}</div>`);

/* ============================================================
   2) COVER — 1640×624 (2× of 820×312). Avatar+page-name sit
   bottom-left on desktop, so content is weighted center-right
   and kept clear of the bottom-left and far edges.
   ============================================================ */
const cover = page(1640, 624, `
  #s-cover{background:${C.white}}
  /* faint brand texture bleeding off the right */
  #s-cover .bg{position:absolute;right:-150px;top:50%;transform:translateY(-50%);
    width:760px;height:760px;opacity:.06}
  #s-cover .bg .mark{width:100%;height:100%}
  #s-cover .sig{position:absolute;left:96px;top:84px}
  #s-cover .sig .mark{width:54px;height:54px}
  #s-cover .sig .wm b{font-size:24px}
  #s-cover .sig .wm small{font-size:12px;margin-top:5px}
  #s-cover .body{position:absolute;left:470px;top:50%;transform:translateY(-50%);
    width:1000px}
  #s-cover .eyebrow{font-size:19px;margin-bottom:22px}
  #s-cover h1{font-weight:700;color:${C.black};font-size:60px;line-height:1.04;
    letter-spacing:-.025em}
  #s-cover h1 .b{color:${C.blue}}
  #s-cover .rule{width:64px;height:3px;margin:30px 0 26px}
  #s-cover p{font-size:25px;color:${C.g600};line-height:1.5;max-width:880px}
  #s-cover .meta{margin-top:30px;font-size:18px;color:${C.g400};letter-spacing:.02em;
    display:flex;gap:14px;align-items:center}
  #s-cover .meta i{font-style:normal;color:${C.g300}}
`, `<div class="stage" id="s-cover" style="width:1640px;height:624px">
  <div class="bg">${mark('light')}</div>
  <div class="lockup sig">${mark('light')}<div class="wm"><b>Saga Bulk Reporter</b><small>ACS Soft</small></div></div>
  <div class="body">
    <div class="eyebrow">Generator de rapoarte pentru Saga 3.x</div>
    <h1>Toate rapoartele. Toate firmele.<br><span class="b">Dintr-o singură rulare.</span></h1>
    <hr class="rule">
    <p>Balanțe, jurnale, registre de casă/bancă și state — multi-firmă, multi-lună, exportate în CSV, XLSX, PDF sau JSON.</p>
    <div class="meta">bulkreporter.ro<i>·</i>Windows 10/11<i>·</i>14 zile gratuit</div>
  </div>
</div>`);

/* ============================================================
   3) LINK-SHARE / OG IMAGE — 1200×630
   ============================================================ */
const og = page(1200, 630, `
  #s-og{background:${C.white};padding:76px 84px;display:flex;align-items:center;gap:56px}
  #s-og .col{flex:1}
  #s-og .lockup{margin-bottom:30px}
  #s-og .lockup .mark{width:52px;height:52px}
  #s-og .lockup .wm b{font-size:22px}
  #s-og .lockup .wm small{font-size:11px;margin-top:5px}
  #s-og .eyebrow{font-size:18px;margin-bottom:18px}
  #s-og h1{font-weight:700;color:${C.black};font-size:74px;line-height:1;letter-spacing:-.03em}
  #s-og .rule{width:64px;height:3px;margin:28px 0 24px}
  #s-og p{font-size:25px;color:${C.g600};line-height:1.5}
  #s-og .foot{margin-top:30px;display:flex;align-items:center;gap:12px;
    font-size:19px;color:${C.g400};letter-spacing:.02em}
  #s-og .foot i{font-style:normal;color:${C.g300}}
  #s-og .hero{flex:0 0 300px;display:flex;align-items:center;justify-content:center}
  #s-og .hero .mark{width:300px;height:300px}
`, `<div class="stage" id="s-og" style="width:1200px;height:630px">
  <div class="col">
    <div class="lockup">${mark('light')}<div class="wm"><b>Saga Bulk Reporter</b><small>ACS Soft</small></div></div>
    <div class="eyebrow">Generator de rapoarte · Saga 3.x</div>
    <h1>Rapoarte bulk<br>din Saga</h1>
    <hr class="rule">
    <p>18 rapoarte — multi-firmă, multi-lună, dintr-o singură rulare.</p>
    <div class="foot">bulkreporter.ro<i>·</i>Windows 10/11</div>
  </div>
  <div class="hero">${mark('light')}</div>
</div>`);

/* ============================================================
   4) POST — ANNOUNCEMENT (blue) 1080×1080
   ============================================================ */
const postAnnounce = page(1080, 1080, `
  #s-pa{background:${C.blue};padding:96px;display:flex;flex-direction:column;color:#fff}
  #s-pa .bg{position:absolute;right:-220px;bottom:-220px;width:760px;height:760px;opacity:.10}
  #s-pa .bg .mark{width:100%;height:100%}
  #s-pa .sig .mark{width:50px;height:50px}
  #s-pa .sig .wm b{font-size:24px}
  #s-pa .sig .wm small{font-size:12px;margin-top:5px}
  #s-pa .pill{align-self:flex-start;margin-top:96px;font-size:18px;font-weight:700;
    text-transform:uppercase;letter-spacing:.16em;color:${C.blue};background:#fff;
    padding:10px 18px}
  #s-pa h1{font-weight:700;font-size:76px;line-height:1.06;letter-spacing:-.025em;
    margin-top:34px}
  #s-pa .rule{width:72px;height:4px;background:#fff;margin:46px 0 0}
  #s-pa .foot{margin-top:auto;font-size:22px;color:rgba(255,255,255,.85);
    display:flex;align-items:center;gap:14px}
  #s-pa .foot i{color:rgba(255,255,255,.45);font-style:normal}
`, `<div class="stage" id="s-pa" style="width:1080px;height:1080px">
  <div class="bg">${mark('onblue')}</div>
  <div class="lockup lockup--onblue sig">${mark('onblue')}<div class="wm"><b>Saga Bulk Reporter</b><small>ACS Soft</small></div></div>
  <div class="pill">Noutate</div>
  <h1>18 rapoarte contabile,<br>multi-firmă,<br>dintr-o singură rulare.</h1>
  <hr class="rule">
  <div class="foot">Descarcă gratuit<i>·</i>14 zile<i>·</i>bulkreporter.ro</div>
</div>`);

/* ============================================================
   5) POST — FEATURE (white) 1080×1080
   ============================================================ */
const postFeature = page(1080, 1080, `
  #s-pf{background:${C.white};padding:96px}
  #s-pf .sig{position:absolute;right:96px;top:96px}
  #s-pf .sig .mark{width:92px;height:92px}
  #s-pf .main{position:absolute;left:96px;right:96px;top:50%;transform:translateY(-50%)}
  #s-pf .eyebrow{font-size:20px}
  #s-pf h1{font-weight:700;color:${C.black};font-size:74px;line-height:1.05;
    letter-spacing:-.03em;margin-top:22px}
  #s-pf .rule{width:72px;height:4px;margin:44px 0 0}
  #s-pf .chips{display:flex;gap:18px;margin-top:52px;flex-wrap:wrap}
  #s-pf .chip{border:2px solid ${C.black};padding:18px 30px;font-size:30px;
    font-weight:700;color:${C.black};letter-spacing:.02em}
  #s-pf .foot{position:absolute;left:96px;bottom:96px;font-size:22px;color:${C.g400};
    display:flex;align-items:center;gap:14px}
  #s-pf .foot i{color:${C.g300};font-style:normal}
  #s-pf .foot b{color:${C.black};font-weight:700}
`, `<div class="stage" id="s-pf" style="width:1080px;height:1080px">
  <div class="sig">${mark('light')}</div>
  <div class="main">
    <div class="eyebrow">Funcționalitate</div>
    <h1>Patru formate,<br>un singur click.</h1>
    <hr class="rule">
    <div class="chips"><div class="chip">CSV</div><div class="chip">XLSX</div><div class="chip">PDF</div><div class="chip">JSON</div></div>
  </div>
  <div class="foot"><b>Saga Bulk Reporter</b><i>·</i>bulkreporter.ro</div>
</div>`);

/* ---- write the bare logo mark (transparent) for general use ---- */
const logoMark = page(1024, 1024, `
  html,body{background:transparent}
  #s-lm{background:transparent;display:flex;align-items:center;justify-content:center}
  #s-lm .mark{width:840px;height:840px}
`, `<div class="stage" id="s-lm" style="width:1024px;height:1024px">${mark('light')}</div>`);

const logoMarkWhite = page(1024, 1024, `
  html,body{background:transparent}
  #s-lmw{background:transparent;display:flex;align-items:center;justify-content:center}
  #s-lmw .mark{width:840px;height:840px}
`, `<div class="stage" id="s-lmw" style="width:1024px;height:1024px">${mark('onblue')}</div>`);

const files = {
  'profile.html': profile,
  'cover.html': cover,
  'og.html': og,
  'post-announcement.html': postAnnounce,
  'post-feature.html': postFeature,
  'logo-mark.html': logoMark,
  'logo-mark-white.html': logoMarkWhite,
};
for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), html, 'utf8');
  console.log('wrote', name);
}
console.log('done');
