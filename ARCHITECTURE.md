# Architecture & Build Guide

**Audience:** any developer or AI model picking this project up cold. Read this
top to bottom once and you can safely make changes, build, and deploy.

For the human-facing history of *what* changed, see [`CHANGELOG.md`](./CHANGELOG.md).
For the launch-checklist / integration reference, see [`README.md`](./README.md).

---

## 0. TL;DR for a new model

```bash
npm install          # once
npm run dev          # http://localhost:4321  (live-reload)
npm run build        # → ./dist  (what gets deployed)
npm run preview      # serve ./dist locally to sanity-check
```

- **It's a static Astro site.** No backend, no database, no server. `npm run
  build` emits plain HTML/CSS/JS to `dist/`.
- **Content lives in data files, not markup.** To change copy, phone, services,
  owner info, review widget, etc., edit `src/data/site.ts` and
  `src/data/services.ts`. You rarely touch `.astro` files for content.
- **Deploy = push to `main`.** GitHub Actions builds and publishes to GitHub
  Pages → serves at **allclearservices.com**. No manual deploy step.
- **⚠️ iCloud gotcha:** the working directory is inside an iCloud-synced folder.
  Local `astro build` can hang because iCloud touches `node_modules` mid-build.
  See [§8 Troubleshooting](#8-troubleshooting). CI is unaffected (clean Linux runner).

---

## 1. Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Astro `^5.7`** | `output: 'static'` — zero client JS by default |
| Language | TypeScript | data files (`src/data/*.ts`), plus `.astro` components |
| Styling | **Vanilla CSS** w/ design tokens | `src/styles/global.css`; components use scoped `<style>` |
| Images | `astro:assets` + **sharp** | logo/OG images optimized at build |
| Fonts | Fraunces (display) + Inter (UI) | Google Fonts, loaded in `Layout.astro` |
| Sitemap | `@astrojs/sitemap` | emits `sitemap-index.xml` |
| Analytics | Google Analytics 4 | `G-HGRE056LPY`, loads only when a real ID is set |
| Forms | **Web3Forms** | request form → email; no backend needed |
| Reviews | **Housecall Pro** widget | embedded iframe, live/verified |
| Host | **GitHub Pages** | custom apex domain, auto-deploy via Actions |

**Dependencies are deliberately minimal** (`package.json`): `astro`,
`@astrojs/sitemap`, `sharp`. No CSS framework, no component library, no state
library. Keep it that way unless there's a strong reason.

---

## 2. Directory map

```
.
├── astro.config.mjs        # build config; env-driven deploy target (see §5)
├── package.json            # scripts + the 3 deps
├── tsconfig.json
├── .github/workflows/
│   └── deploy.yml          # CI: build + publish to GitHub Pages on push to main
├── public/                 # copied verbatim to dist/ (NOT processed)
│   ├── CNAME               # "allclearservices.com" — tells Pages the custom domain
│   ├── favicon.png
│   ├── og-default.png      # social-share preview image
│   └── robots.txt
└── src/
    ├── assets/             # logo files — processed by astro:assets (optimized)
    ├── components/         # reusable .astro building blocks (see §4)
    ├── data/               # ⭐ CONTENT LIVES HERE — edit these, not markup
    │   ├── site.ts         #   company facts, contact, social, integration keys
    │   └── services.ts     #   the service catalog + homepage trust stats
    ├── layouts/
    │   └── Layout.astro    # <head>, SEO/OG, JSON-LD, fonts, GA, header+footer shell
    ├── lib/
    │   └── url.ts          # withBase() — base-path-aware internal links (see §5)
    ├── pages/              # ⭐ ROUTES — file path = URL (see §3)
    │   ├── index.astro         # /
    │   ├── about.astro         # /about/
    │   ├── contact.astro       # /contact/
    │   ├── reviews.astro       # /reviews/
    │   ├── services.astro      # /services/  (catalog landing)
    │   ├── services/[slug].astro  # /services/<slug>/  (one per service, generated)
    │   └── 404.astro
    └── styles/
        └── global.css      # design tokens (CSS custom props) + base primitives
```

**Two rules capture 90% of edits:**
1. **Content** → `src/data/*.ts`.
2. **New URL** → add a file under `src/pages/`.

---

## 3. Routing (file-based)

Astro maps files in `src/pages/` to URLs:

| File | URL |
|------|-----|
| `index.astro` | `/` |
| `about.astro` | `/about/` |
| `services.astro` | `/services/` |
| `services/[slug].astro` | `/services/plumbing/`, `/services/emergency/`, … |
| `404.astro` | served on unknown paths |

**The `[slug]` page is generated from data.** `services/[slug].astro` exports
`getStaticPaths()`, which maps every entry in `services` (from
`src/data/services.ts`) to its own pre-rendered page. **To add a service page,
add an object to the `services` array — do not create a new file.** The detail
page, the nav dropdown, the services grid, and the "other services" rail all
read from that one array.

---

## 4. Components (`src/components/`)

| Component | Role |
|-----------|------|
| `Header.astro` | Top nav + mobile drawer; services dropdown built from `services` |
| `Footer.astro` | Contact, licenses, Instagram button, fine print (reads `site`) |
| `Hero.astro` | Homepage hero: lead copy, CTAs, reviews credibility card |
| `TrustBar.astro` | The 4 stat blocks under the hero (reads `trustPoints`) |
| `ServicesGrid.astro` / `ServiceCard.astro` | Services catalog cards |
| `HousecallReviews.astro` | **Reviews** — wraps the Housecall Pro iframe responsively |
| `RequestForm.astro` | Contact form: month calendar + time windows → Web3Forms email |
| `CTABand.astro` | Reusable "call us / request service" band |
| `PageHeader.astro` | Standard eyebrow+title+text header for interior pages |
| `Logo.astro` | Brand lockup (imports optimized asset) |
| `Icon.astro` | **Line-art SVG icon set**, keyed by name (see below) |
| `Analytics.astro` | GA4 tag; renders nothing unless a real Measurement ID is set |

**Icons:** `Icon.astro` holds a map of `name → SVG path`. Icons stroke with
`currentColor`. To add one, add a `name: '<svg path markup>'` entry and
reference it via `<Icon name="..." />`. Service `icon:` values in `services.ts`
must match a key here.

**Styling:** each component has a scoped `<style>` block (Astro hashes the
selectors so they don't leak). Shared values — colors, spacing, radii, shadows —
are CSS custom properties defined in `src/styles/global.css` (e.g.
`--copper-600`, `--navy-900`, `--sp-6`, `--radius-lg`). **Use the tokens; don't
hardcode hex/px** so the design stays consistent.

---

## 5. The env-driven deploy target (important)

The same codebase serves **two** targets, switched by the `DEPLOY_TARGET` env
var, configured in `astro.config.mjs`:

| `DEPLOY_TARGET` | `site` | `base` | Use |
|-----------------|--------|--------|-----|
| *(unset / default)* | `https://allclearservices.com` | `/` | **Production** (apex domain) |
| `ghpages` | `https://ghidtm44.github.io` | `/all-clear-services` | github.io preview subpath |

Because production serves from root but the github.io preview serves from a
subpath, **every hand-written internal link must go through `withBase()`**
(`src/lib/url.ts`) so it works in both:

```astro
---
import { withBase } from '../lib/url';
---
<a href={withBase('/contact/')}>Contact</a>   <!-- ✓ -->
<a href="/contact/">Contact</a>               <!-- ✗ breaks on the subpath preview -->
```

`withBase()` is for **root-relative internal paths only**. Do **not** pass
`tel:`, `mailto:`, or external `https://` URLs through it.

Production builds use the default (apex). The CI workflow does **not** set
`DEPLOY_TARGET`, so `main` always builds for allclearservices.com.

---

## 6. Content model — where to edit what

### `src/data/site.ts` — company facts & integrations
Single source of truth for:
- **Identity:** `name`, `tagline`, `blurb`, `owner`, `licenses[]`
- **Contact:** `phoneDisplay` (vanity `609-64-CLEAR`), `phoneNumeric` (real
  digits for JSON-LD), `phoneHref` (`tel:`), `email`/`emailHref`, `address`,
  `hours`, `emergencyLine`
- **Social:** `social.instagram` + `instagramHandle` (footer button);
  `housecallpro`, `google`, `facebook` (blank = hidden)
- **`integrations`:**
  - `web3formsAccessKey` — keyed to the receiving inbox
  - `gaMeasurementId` — GA4; analytics off until a real `G-…` value is set
  - `housecallBookingUrl` — optional; set it to show a "Book Online" CTA
  - `googleReviewsEmbedHtml` — optional secondary reviews slot, **injected via
    `set:html`**. ⚠️ **operator-trusted raw HTML only** — never wire it to user
    input or a CMS field (stored-XSS risk). The Housecall Pro widget is the
    primary review source; this slot is a future add-on.

`nav[]` (also in this file) defines the primary navigation order.

### `src/data/services.ts` — services & trust stats
- `services[]` — each object (`slug`, `title`, `icon`, `summary`,
  `description`, `items[]`) generates a `/services/<slug>/` page **and** feeds
  the nav dropdown, catalog grid, and cross-links. Add/remove services here.
- `trustPoints[]` — the four `{ stat, label }` blocks in the `TrustBar` under
  the hero.

### Reviews
`HousecallReviews.astro` embeds the Housecall Pro widget
(`client.housecallpro.com/reviews/widget/<id>`). The widget ID is in that
component. It renders on `/` and `/reviews/`. There is **no** local review data
file — Housecall Pro is the single source.

---

## 7. Deployment

### Normal flow (what you do 99% of the time)
1. Make changes, then verify locally: `npm run build` (or build in a clean copy
   — see §8 if it hangs).
2. Commit and **push to `main`**.
3. GitHub Actions (`.github/workflows/deploy.yml`) runs automatically:
   `build` job (Node 20, `npm ci` → `npm run build`, upload `dist/`) →
   `deploy` job (`actions/deploy-pages`).
4. Live at **https://allclearservices.com** in ~1–2 minutes.

The workflow triggers on `push` to `main` **and** supports manual
`workflow_dispatch`. Pages is configured with **`build_type: workflow`** (it
publishes the artifact this workflow uploads — it does **not** build from a
branch).

### `public/CNAME`
Contains `allclearservices.com`. This is what binds the custom domain. **Never
delete it** — Astro copies `public/` verbatim into `dist/`, so the built site
always carries the CNAME. Removing it unbinds the domain.

### If a deploy is stuck or Actions is down (recovery playbook)
This happened on 2026-07-09 (GitHub Actions `major_outage`). Ordered steps:

1. **Check GitHub status first** — don't debug your own code during an outage:
   ```bash
   curl -s https://www.githubstatus.com/api/v2/components.json \
     | grep -o '"name":"[^"]*","status":"[^"]*"' | grep -Ei 'actions|pages'
   ```
2. **If Actions is down:** wait. The push is safe on `main`; it deploys when
   runners return. Nothing to fix in the code.
3. **Once Actions is back (even `partial_outage`):** a stale `queued` run may be
   in limbo. Kick a fresh run of the existing workflow — sanctioned, no config
   change:
   ```bash
   gh workflow run "Deploy to GitHub Pages" --ref main
   gh run watch <run-id> --exit-status
   ```
4. **Verify it's actually live** (cache-bust to skip CDN cache):
   ```bash
   curl -fsSL "https://allclearservices.com/?cb=$(date +%s)" | grep -c "some new string"
   ```
5. **HTTPS cert error right after deploy** (`curl: (60) …certificate…`): expected
   when publishing during a Pages degradation — the site content is correct
   (verify over `http://`), only the TLS cert binding lags. It self-heals in
   minutes to ~an hour. If it's still broken after an hour, in **repo Settings →
   Pages**, remove the custom domain, save, re-add `allclearservices.com`, save
   — that forces a cert re-issue.

> **Do NOT** switch Pages to a branch source or introduce an alternate host to
> "route around" an Actions outage — GitHub funnels branch-based Pages builds
> through the same Actions runners, so it doesn't help, and it changes the
> deploy model. Keep the pipeline as-is; wait the outage out.

---

## 8. Troubleshooting

**`astro build` hangs locally at 0% (no output, wedged process).**
Cause: this project lives in an **iCloud-synced folder**, and iCloud touching
`node_modules` mid-build stalls Astro. It is **not** a code problem — CI builds
fine on a clean runner. To verify a build locally, build in a copy outside
iCloud:
```bash
SRC="$(pwd)"; DST="/tmp/acs-build-verify"
rsync -a --delete --exclude node_modules --exclude .git --exclude dist --exclude .astro "$SRC/" "$DST/"
cd "$DST" && npm ci && npm run build
```
Kill wedged builds with `pkill -9 -f "astro build"` and optionally clear caches
(`rm -rf .astro node_modules/.vite`).

**`timeout` not found** — it's not on macOS by default; just run the command
without it (or `brew install coreutils` → `gtimeout`).

**GA/analytics not firing in dev** — by design. `Analytics.astro` only emits the
tag when `gaMeasurementId` is a real `G-…` value, so dev/preview never pollute
analytics.

**`npm audit` shows 1 moderate (Astro `define:vars`)** — does not apply here
(the only `define:vars` passes an operator-controlled GA ID, and there are no
server islands). Fix ships in Astro 6 (breaking major); deferred intentionally.
See `README.md → Known maintenance notes`.

---

## 9. Conventions & guardrails

- **Edit data, not markup**, for content changes.
- **Internal links → `withBase()`**; never hardcode a leading `/path`.
- **Colors/spacing → CSS tokens** in `global.css`; don't hardcode values.
- **Don't invent credentials or claims.** When the Angi→Housecall switch removed
  the "Super Service Award," we dropped it rather than fabricate a Housecall
  equivalent. Same principle for any rating/review claim — only publish what's
  substantiated. (This is also why `Layout.astro`'s JSON-LD intentionally omits
  `aggregateRating`.)
- **`set:html` is operator-trusted only** (the `googleReviewsEmbedHtml` slot) —
  never bind it to user input.
- **Keep the dependency list tiny.**
- **Update `CHANGELOG.md`** when you ship something the owner would care about.
- **No secrets in this repo.** It's public and iCloud-synced. The Web3Forms key
  and GA ID here are public-by-design client identifiers, not secrets; anything
  actually sensitive does not belong in the tree.
