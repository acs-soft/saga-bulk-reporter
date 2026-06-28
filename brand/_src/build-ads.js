/* ============================================================
   Saga Bulk Reporter — Facebook AD creatives (1080×1080)
   Three benefit-led ads, one job each, matrix-grid brand.
   Patterns borrowed from competitor Quick Importer:
   question hook → solution → free-trial CTA, and "→" flow.
   Run:  node brand/_src/build-ads.js  &&  bash brand/_src/render-ads.sh
   ============================================================ */
const fs = require('fs');
const path = require('path');
const OUT = __dirname;

const C = {
  blue: '#0066CC', black: '#0A0A0A', white: '#FFFFFF',
  g50: '#FAFAFA', g200: '#E8E8E8', g300: '#D4D4D4', g400: '#A3A3A3',
  g500: '#737373', g600: '#525252',
};
const FONT = `"Segoe UI",-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif`;

function mark(variant) {
  const pos = [0, 26, 52, 78];
  let r = '';
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++)
    r += `<rect class="c${a === b ? ' d' : ''}" x="${pos[b]}" y="${pos[a]}" width="22" height="22" rx="3.5"/>`;
  return `<svg class="mark mark--${variant}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${r}</svg>`;
}

const BASE = `
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html,body{width:100%;height:100%;overflow:hidden}
  body{font-family:${FONT};-webkit-font-smoothing:antialiased}
  .mark .c{fill:var(--cell-empty)} .mark .c.d{fill:var(--cell-fill)}
  .mark--light{--cell-empty:${C.g200};--cell-fill:${C.blue}}
  .mark--onblue{--cell-empty:rgba(255,255,255,.22);--cell-fill:#fff}
  .lockup{display:flex;align-items:center;gap:16px}
  .lockup .mark{width:48px;height:48px}
  .lockup b{font-weight:700;font-size:23px;letter-spacing:-.01em}
  .eyebrow{font-weight:700;text-transform:uppercase;letter-spacing:.15em;font-size:21px}
  h1{font-weight:700;line-height:1.06;letter-spacing:-.03em;font-size:70px}
  .rule{border:0;height:4px;width:72px;margin:40px 0 0}
  .flow{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:50px}
  .flow .chip{font-weight:700;font-size:24px;padding:16px 22px;line-height:1}
  .flow .arr{font-size:28px;font-weight:700}
  .foot{position:absolute;left:96px;bottom:92px;font-size:23px;display:flex;
    align-items:center;gap:14px}
  .foot i{font-style:normal}
  .sig{position:absolute;right:96px;top:96px}
  .stage{position:relative;width:1080px;height:1080px;overflow:hidden}
  .main{position:absolute;left:96px;right:96px;top:50%;transform:translateY(-50%)}
`;

function ad({ id, bg, theme, eyebrow, h1, flow }) {
  // theme: 'light' (white bg) or 'dark' (blue bg)
  const dark = theme === 'dark';
  const css = `
    #${id}{background:${bg}}
    #${id} .eyebrow{color:${dark ? '#fff' : C.blue}}
    #${id} h1{color:${dark ? '#fff' : C.black}}
    #${id} .rule{background:${dark ? '#fff' : C.blue}}
    #${id} .lockup b{color:${dark ? '#fff' : C.black}}
    #${id} .flow .chip{color:${dark ? '#fff' : C.black};
      background:${dark ? 'rgba(255,255,255,.14)' : C.g50};
      border:1px solid ${dark ? 'rgba(255,255,255,.22)' : C.g200}}
    #${id} .flow .arr{color:${dark ? 'rgba(255,255,255,.85)' : C.blue}}
    #${id} .foot{color:${dark ? 'rgba(255,255,255,.85)' : C.g400}}
    #${id} .foot i{color:${dark ? 'rgba(255,255,255,.45)' : C.g300}}
    #${id} .foot b{color:${dark ? '#fff' : C.black};font-weight:700}
    #${id} .sig .mark{width:84px;height:84px;${dark ? 'opacity:.9' : ''}}
    #${id} .bg{position:absolute;right:-200px;bottom:-200px;width:680px;height:680px;
      opacity:${dark ? '.10' : '.05'}} #${id} .bg .mark{width:100%;height:100%}
  `;
  const chips = flow.map((c, i) =>
    `${i ? '<span class="arr">&rarr;</span>' : ''}<span class="chip">${c}</span>`).join('');
  const markVar = dark ? 'onblue' : 'light';
  const body = `<div class="stage" id="${id}">
    <div class="bg">${mark(markVar)}</div>
    <div class="sig">${mark(markVar)}</div>
    <div class="main">
      <div class="lockup">${mark(markVar)}<b>Saga Bulk Reporter</b></div>
      <div class="eyebrow" style="margin-top:54px">${eyebrow}</div>
      <h1 style="margin-top:22px">${h1}</h1>
      <hr class="rule">
      <div class="flow">${chips}</div>
    </div>
    <div class="foot"><b>Descarcă gratuit</b><i>·</i>14 zile<i>·</i>bulkreporter.ro</div>
  </div>`;
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8"><style>${BASE}${css}</style></head><body>${body}</body></html>`;
}

const ads = {
  'ad-inchidere.html': ad({
    id: 'a1', bg: C.white, theme: 'light',
    eyebrow: 'Închidere de lună',
    h1: 'Toate rapoartele.<br>Toate firmele.<br>Un singur click.',
    flow: ['Zeci de firme', 'Un singur click', 'Rapoartele lunii'],
  }),
  'ad-sinteza.html': ad({
    id: 'a2', bg: C.blue, theme: 'dark',
    eyebrow: 'Sinteză financiară',
    h1: 'Un raport de o pagină,<br>cu sigla cabinetului.',
    flow: ['Date din Saga', 'Sinteză financiară', 'Raport pentru client'],
  }),
  'ad-salarizare.html': ad({
    id: 'a3', bg: C.white, theme: 'light',
    eyebrow: 'Salarizare',
    h1: 'State și fluturași<br>pentru toate firmele,<br>dintr-o singură rulare.',
    flow: ['Toate firmele', 'Un singur click', 'State și fluturași'],
  }),
};

for (const [name, html] of Object.entries(ads)) {
  fs.writeFileSync(path.join(OUT, name), html, 'utf8');
  console.log('wrote', name);
}
