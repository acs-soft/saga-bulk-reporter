# Saga Bulk Reporter — Marketing Research & Facebook Ad Plan

> **Internal document.** Contains competitor analysis and budget estimates.
> This `marketing/` folder is excluded from the public deploy (see `.github/workflows/deploy.yml`) — do not move it into a deployed path.
>
> Compiled: 2026-06-29 · Market: Romania · Audience: accountants (contabili) / accounting firms (cabinete de contabilitate)

---

## 1. TL;DR

- **Competitor studied:** Quick Importer (quickimporter.ro) — a Saga/WinMentor/Ciel *importer*. We are the mirror image: we *export* month-close reports **out of** Saga. Same buyer, opposite end of the workflow → complementary, not head-to-head.
- **Their Facebook ads are a micro-budget, always-on operation:** 3 active ads, static screenshots, broad RO targeting, no interest narrowing. Estimated spend ~€1–4/day on their hero ad; whole effort plausibly well under a few hundred € total.
- **Their delivery data reveals the responsive audience:** Romanian accountants skew **45–64 and female-leaning**; the 25–34 band is negligible (~6%).
- **Our plan:** lead with the *Închidere de lună* creative, one concentrated ad set, optimize for a cheap event (landing-page views) on a lean budget, time spend to **month-end** (when the close pain peaks). You can credibly out-footprint Quick Importer for a small budget — **if the Meta Pixel is installed first** so you optimize for downloads instead of guessing.

---

## 2. Competitor: Quick Importer

### 2.1 Who they are
- **Site:** https://www.quickimporter.ro/ · **FB page:** Quick Importer (profile id `100063658116898`, ad-account page id `104502548166038`, 587 followers, category *Software*).
- **Product:** Windows desktop app that **imports** invoices, e-Factura, SmartBill/Oblio exports, and bank statements (PDF/CSV → MT940) **into** Saga, WinMentor and Ciel Focus.
- **Positioning / proven messages:** *"8 ore → 5 min"*, *"0 erori"*, data stays on-device, same-day support, **14-day free trial (no card)**, 30-day money-back guarantee. *"Software pentru contabili din România."*
- **Visual style:** clean blue/white, bare product screenshots, testimonials, review badges. (This is the "style I don't want to replicate" — our matrix-grid creatives are more designed.)

### 2.2 Their 3 active Facebook ads (EU/RO Ad Library, captured 2026-06-29)
Pattern across all three: **question-hook → solution → free-trial CTA**, with a `→` flow line in the link card, and a plain app screenshot as the creative.

| # | Job / message | Library ID | Started | Link card |
|---|---|---|---|---|
| 1 | Bank statements → MT940 | `4033029627001042` | 8 Jun 2026 | QUICKIMPORTER.RO/EXTRASE-BANCARE — *"Conversie extrase bancare în MT940 · PDF/CSV → MT940 → Saga, WinMentor, Ciel"* |
| 2 | General invoice import | `1493462629124519` | 19 May 2026 | QUICKIMPORTER.RO — *"Import rapid de documente contabile"* |
| 3 | SmartBill/Oblio processing *(3 versions — A/B test)* | `1293940369394442` | 8 Jun 2026 | QUICKIMPORTER.RO/SMARTBILL — *"Prelucrare inteligentă a facturilor · SmartBill/Oblio → Quick Importer → Saga, WinMentor sau Ciel Focus"* |

### 2.3 Budget & reach (what the Ad Library actually exposes)
Meta publishes spend only for political/social-issue ads, never for commercial ones. But the **EU transparency panel** ("Detalii reclamă") gives **Impact = reach** (unique EU Meta accounts that saw the ad ≥ once; an estimate, *not* impressions). All targeting is RO-only, so EU reach ≈ RO reach.

| Ad | Started | ~Days live | **Reach (Impact)** | Reach/day |
|---|---|---|---|---|
| 1 — Bank statements | 8 Jun | ~21 | **6,900** | ~330 |
| 2 — General import | 19 May | ~41 | **1,462** | ~36 |
| 3 — SmartBill | 8 Jun | ~21 | **69** *(v1 of 3 only)* | ~3 |

**Inferences:**
- **Budget is concentrated** — Ad 1 pulls ~5× Ad 2 and ~100× Ad 3. The bank-statements message is their current hero.
- **Spend is tiny.** Reach → impressions → €: `6,900 × ~2 frequency ≈ 14k impressions × RO CPM €2–5 ≈ €30–70` over 3 weeks → **~€1–4/day** on Ad 1; Ads 2–3 are pennies. With wide-open targeting you only get ~7k reach in 3 weeks if the daily budget is very small.
- **Targeting is broad, not surgical:** RO · age 25–65+ · all genders · **no interest/job targeting**. They let Meta's optimizer find accountants.

### 2.4 Who Meta actually reaches — Ad 1 demographic breakdown (reach)
| Age | Male | Female | Unknown | Total | Share |
|---|---|---|---|---|---|
| 65+ | 389 | 387 | 2 | 778 | 11% |
| 55–64 | 903 | 1,384 | 10 | 2,297 | 33% |
| 45–54 | 936 | 1,358 | 13 | 2,307 | 33% |
| 35–44 | 453 | 621 | 8 | 1,082 | 16% |
| 25–34 | 202 | 195 | 6 | 403 | 6% |

- **~83% of reach is 45+;** 45–64 alone ≈ **67%**. 25–34 ≈ 6%.
- Ad 1 skews **female (~58%)**, matching the demographic reality of Romanian accounting (older, female-majority). (Ad 2 skewed male ~63% — likely creative-driven variance.)

**Why this matters for us:** the responsive audience is **45–64, female-leaning Romanian accountants**. Target broad RO 35–65+ and let Meta optimize, or tighten to 40–60. Don't pay for the low-yield 25–34 band.

---

## 3. Our ads — Saga Bulk Reporter

Three creatives, one job each, matrix-grid brand. Files in `brand/ads/` (1080×1080), generated from `brand/_src/build-ads.js` via `render-ads.sh`. Same proven structure as Quick Importer (hook → solution → free-trial CTA, `→` flow), **without** leaning on file formats.

### Ad 1 — Închidere de lună  ·  `ad-inchidere.png`  ·  **HERO**
- **Primary text:** *Închideți luna exportând firmă cu firmă din Saga? Saga Bulk Reporter generează balanțele, jurnalele și registrele pentru zeci de firme și luni — dintr-o singură rulare. Fără export manual, firmă cu firmă: economisiți ore întregi la fiecare închidere. Descărcați și testați gratuit 14 zile.*
- **Headline:** Rapoartele de închidere, pentru toate firmele odată
- **Description:** Zeci de firme → un singur click → toate rapoartele lunii
- **CTA:** Descarcă · **Link:** https://bulkreporter.ro/

### Ad 2 — Sinteză financiară  ·  `ad-sinteza.png`  ·  differentiator / retargeting hero
- **Primary text:** *Clienții vă cer să le explicați cifrele? Cu Saga Bulk Reporter generați Sinteza financiară — un raport vizual de o pagină, direct din datele Saga, cu sigla cabinetului dumneavoastră. Un material clar, pe care clientul îl înțelege dintr-o privire. Testați gratuit 14 zile.*
- **Headline:** Sinteza financiară, pentru fiecare client
- **Description:** Date din Saga → Sinteză financiară → raport de o pagină, cu sigla cabinetului
- **CTA:** Descarcă · **Link:** https://bulkreporter.ro/

### Ad 3 — Salarizare  ·  `ad-salarizare.png`  ·  low-priority always-on test
- **Primary text:** *Pregătiți statele de salarii și fluturașii firmă cu firmă? Saga Bulk Reporter le generează pentru fiecare angajat, pe toate firmele și lunile, dintr-o singură rulare. Mai puțină muncă repetitivă la fiecare închidere de lună. Descărcați și testați gratuit 14 zile.*
- **Headline:** State și fluturași, pentru toate firmele odată
- **Description:** Toate firmele → un singur click → state și fluturași de salariu
- **CTA:** Descarcă · **Link:** https://bulkreporter.ro/

### Copy decisions (rationale)
- **`O rulare` / `O singură rulare` → `Un singur click`** in chips/short spots (the bare noun read clipped and risked confusion with *rulaj*); kept the full phrase *dintr-o singură rulare* only in flowing body text. `Un singur click` is already the site's own wording (step 3).
- **`în bloc` → `pentru toate firmele odată`** in link headlines (clearer; avoids the *apartment-block* misread). *Note: these run ~46–51 chars and may truncate on some placements.*
- **Anglicisms removed:** `brandat` → *cu sigla cabinetului*; `livrabil` → *material clar*.
- **Register:** primary texts formal (*Închideți, dumneavoastră, Descărcați*); creative buttons informal (*Descarcă gratuit*) — mirrors the live site. No `tu/dumneavoastră` mixing inside a single ad.
- Every claim maps to a real feature on the landing page (balanțe/jurnale/registre, *Sinteză financiară*, *Stat salarii* + *Fluturași*).

---

## 4. Launch plan (lean)

### 4.0 Prerequisites — do before spending
- **Install the Meta Pixel** on every page of bulkreporter.ro.
- **Define a conversion event** on the *Descarcă* click (`Lead`/`Download`); if the app can ping a URL on first run, also fire `StartTrial` (the real money metric).
- **UTM-tag links:** `https://bulkreporter.ro/?utm_source=facebook&utm_medium=paid&utm_campaign=launch&utm_content=inchidere` (swap `utm_content` per ad). Ties into existing download tracking.

### 4.1 Structure & objective
- **One campaign, one prospecting ad set, all chosen ads inside it** — let Meta concentrate delivery (don't fragment a small budget). Add a retargeting ad set only in week 3+.
- **Objective:** Sales (Conversions), but **optimize for Landing-Page Views** for the first ~2 weeks (download volume is too low to learn cold). Switch the optimization event to **Download** once the Pixel has ~30–50 events.
- **On a micro budget, run only ONE ad** (the hero), not three — three thirds of a tiny budget all stay data-starved.

### 4.2 Audience
- **Location** România · **Language** Romanian.
- **Age 35–65+** (skip the ~6% young band), **all genders** (don't exclude men; it skews female naturally).
- **Light interest layer** to help a tiny budget find accountants fast: *Contabilitate / Accounting / Bookkeeping / Tax / Small business owners*, business-Page admins. Keep **Advantage detailed-targeting expansion ON** (RO interest pools are thin).
- **Week 3+:** retargeting ad set = site visitors who didn't download (Pixel audience) → show the *Sinteză financiară* ad.

### 4.3 Budget (the lean question)
The €12/day figure was sized to exit learning **on downloads**. Optimizing for a **cheap event (LPV/clicks)** drops the floor: €5/day in RO buys ~150–200 clicks/week — past the learning threshold.

| Option | Spend | Notes |
|---|---|---|
| **Month-end pulse** *(recommended)* | ~€60–70/mo | €6–7/day for ~8–10 days around month-end (last ~3 + first ~5), dark otherwise. Timed to peak *închidere* pain. |
| Lean always-on | ~€75–100/mo | €5/day, one ad, LPV-optimized, narrow audience. |
| Standard | ~€360/mo | €12/day — exits learning on conversions; for when you're ready to scale. |

**Floor:** don't optimize for *conversions* below ~€5/day (you'll be "learning limited" with erratic delivery). Use the clicks/LPV objective when lean.

### 4.4 Scheduling — do NOT daypart by hour
- Facebook is a **leisure-scroll** app (unlike LinkedIn). Accountants scroll on personal time — early morning, lunch, **evening (~20:00–23:00 peak)**, weekends — *not* heads-down during 8–18. Advertising "business hours" would aim at the wrong window.
- **On a small budget, don't manually daypart at all** — run continuous and let Meta optimize delivery timing (it serves when your audience is active and cheapest; don't fight the optimizer at €5/day).
- **Decide hours later from data:** after ~2 weeks, Ads Manager → Breakdown → *Time of Day / Day of Week* shows when clicks/downloads actually happened. Trim dead zones then, with evidence.
- **Calendar timing is the real lever:** the **month-end pulse** (which *days*) beats any hour-of-day guess. Set it as a **lifetime budget over the flight dates**.

### 4.5 Creative format & placements
- Current creatives are 1:1. **Render 4:5 (1080×1350)** for ~20% more feed height and better performance (TODO — same source). Add **9:16** only if running Stories/Reels.
- **Placements:** start **Facebook Feed + Instagram Feed** (square/4:5 fits; accountants live in FB feed). Add Reels/Stories only with 9:16 creative.
- **CTA button:** *Descarcă* → UTM-tagged bulkreporter.ro.

### 4.6 Which ad leads
- **Hero = Ad 1 (Închidere de lună):** universal, recurring, highest-pain job; broadest appeal; matches the flagship bulk value. Put the money here.
- **Ad 2 (Sinteză financiară):** the "wow" differentiator → **hero of the retargeting set** for warm visitors.
- **Ad 3 (Salarizare):** narrower → low-priority always-on test (like QI's SmartBill).

### 4.7 Optimize / kill / scale rules
- Let any change run **3–4 days untouched** (editing resets learning).
- After ~1,000 impressions/ad: **pause any ad with cost-per-LPV 2–3× the best.**
- **Scale the winner +20–30% every 3–4 days** — never double overnight.
- Real KPI = **cost per download** (Pixel), not clicks. Ultimate = trial→paid (tag it for true CAC).

### 4.8 Four-week rollout
1. **Wk 1:** Pixel + events live → launch one ad set, hero ad, lean budget, optimize LPV.
2. **Wk 2:** pause losers; let Meta concentrate; accrue Pixel data.
3. **Wk 3:** switch optimization to Download; add retargeting ad set (Ad 2) at ~€2–4/day.
4. **Wk 4:** scale the winner; build a Lookalike once enough downloaders exist; refresh tired creative.

### 4.9 What the cheap test answers
At ~€60–100 you're not chasing ROI — you're answering: **do Romanian accountants click and download from Facebook?**
- Downloads at an acceptable cost after ~€40–50 / ~150 clicks → scale.
- ~150 clicks, zero downloads → the issue is the landing page or channel fit; you learned it for €50, not €360.

---

## 5. Open items / next steps
- [ ] Install Meta Pixel + define `Download` / `StartTrial` events on bulkreporter.ro.
- [ ] Render 4:5 (and optional 9:16) versions of the *Închidere* creative.
- [ ] Decide budget option (recommended: month-end pulse).
- [ ] Build UTM link set per ad.
- [ ] (Optional) Pull Quick Importer's reach again in ~4 weeks to track their spend trend.

## 6. Sources
- Quick Importer site: https://www.quickimporter.ro/
- Quick Importer FB page: https://www.facebook.com/p/Quick-Importer-100063658116898/
- Meta EU Ad Library (page id `104502548166038`) — "Detalii reclamă" transparency panels, captured 2026-06-29.
- Quick Importer LinkedIn: https://www.linkedin.com/company/quickimporter/
