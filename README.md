# All Clear Services — Website

Modern marketing website for **All Clear Services**, a plumbing, heating &
cooling company serving Mercer County and central New Jersey. Built to be fast,
clean, accessible, and to grow into scheduling/invoicing features over time.

Content and navigation are an updated rebuild of the company's existing site
(`allclearplumbingandheating.com`). Live at **allclearservices.com**.

> **New here?** Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full build
> guide (how it's structured, how to edit content, how to deploy, how to recover
> a stuck deploy). See [`CHANGELOG.md`](./CHANGELOG.md) for what's changed.

---

## Stack

- **[Astro](https://astro.build)** (static output) — component-based, zero
  client JS by default, deploys as static files to GitHub Pages today and
  migrates cleanly to a backend (`src/pages/api/*` + an adapter) when
  scheduling/invoicing arrive.
- Vanilla CSS with a design-token system (`src/styles/global.css`).
- Fonts: **Fraunces** (display) + **Inter** (UI), via Google Fonts.
- `@astrojs/sitemap` for `sitemap-index.xml`.

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # preview the built site
```

## Project structure

```
src/
  components/   Header, Footer, Hero, TrustBar, ServiceCard, ServicesGrid,
                HousecallReviews, RequestForm, CTABand, PageHeader, Logo, Icon,
                Analytics
  data/         site.ts, services.ts
                — all content lives here; edit data, not markup
  layouts/      Layout.astro (head, SEO, JSON-LD, fonts, GA, header/footer)
  lib/          url.ts (withBase() — base-path-aware internal links)
  pages/        index, services, services/[slug], reviews, about, contact, 404
  styles/       global.css (design tokens + primitives)
public/         CNAME, favicon.png, og-default.png, robots.txt
```

**To edit content** (services, phone, copy, owner info) you almost never touch
markup — edit the files in `src/data/`. Reviews come from the live Housecall Pro
widget (`src/components/HousecallReviews.astro`), not a data file.

---

## Launched — current live configuration

The site is **live at allclearservices.com** with all core integrations wired.
Snapshot of what's configured, and the optional knobs that remain. All
integration keys live in **`src/data/site.ts`** under `integrations`.

| What | Where | Status |
|------|-------|--------|
| **Logo** | `src/components/Logo.astro` / `src/assets/` | ✅ Real logo integrated |
| **Web3Forms key** | `site.ts → web3formsAccessKey` | ✅ Live, keyed to the company inbox |
| **Company email** | `site.ts → email` | ✅ `njallclearservices@gmail.com` |
| **GA4 Measurement ID** | `site.ts → gaMeasurementId` | ✅ `G-HGRE056LPY` |
| **Reviews** | `src/components/HousecallReviews.astro` | ✅ Live Housecall Pro widget (homepage + `/reviews/`) |
| **Owner & licenses** | `site.ts → owner`, `licenses[]` | ✅ Lucas Medina, Master Plumber #13552, GC #13VH12709700 |
| **Instagram** | `site.ts → social.instagram` | ✅ `@allclearservices` (footer) |
| **Production domain** | `astro.config.mjs → site` + `public/CNAME` | ✅ `allclearservices.com` |
| **Housecall Pro booking link** (optional) | `site.ts → housecallBookingUrl` | ⬜ Blank — set it to show a "Book Online" CTA |
| **Secondary Google-reviews widget** (optional) | `site.ts → googleReviewsEmbedHtml` | ⬜ Blank — future add-on; operator-trusted HTML only |

---

## Known maintenance notes

- **`npm audit` — 1 moderate (Astro `define:vars` XSS + server-island replay).**
  Neither applies to this site's usage: the single `define:vars` call passes an
  operator-controlled GA ID (never user input), and there are no server islands
  (`output: 'static'`). The fix ships in Astro 6 (a breaking major), so it was
  intentionally deferred. To patch when convenient: `npm install astro@^6` and
  re-verify the build + a visual pass.

## How the integrations work

### Service-request form (no auto-scheduling — by design)
`src/components/RequestForm.astro` posts to **Web3Forms**, which emails the
request to the company. The customer picks a **preferred day + time window**;
that preference is included in the email. **Nothing is auto-booked** — a person
at All Clear reaches out to confirm. The form includes a honeypot spam guard and
inline success/error states.

### Google Analytics 4
`src/components/Analytics.astro` injects the GA4 tag **only** when a real
Measurement ID is configured, so dev/preview never pollute analytics. IP
anonymization is on.

### Reviews
Reviews come from the **live Housecall Pro reviews widget**, embedded via
`src/components/HousecallReviews.astro` (an iframe pointing at
`client.housecallpro.com/reviews/widget/<id>`). It renders on both the homepage
and `/reviews/`. This replaced the earlier curated-testimonials + "Angi Super
Service Award" approach — the site now shows real, verified reviews from the
platform the company actually uses. An **optional** secondary Google-reviews
wall (Trustindex/Elfsight) can be added later by setting
`site.ts → integrations.googleReviewsEmbedHtml`; it renders on the Reviews page
via `set:html` (operator-trusted HTML only — never user input).

### Housecall Pro
The company uses Housecall Pro for invoicing/billing and reviews. **The site is
intentionally decoupled from the HCP *API*** — the API requires their top-tier
MAX plan, a hired developer, and is built for *automation*, which is the
opposite of the "email us, we'll schedule manually" requirement. Reviews use the
public embed widget (no API). If self-serve booking is ever wanted, set
`housecallBookingUrl` to the hosted booking link
(`https://book.housecallpro.com/book/<Business>/<id>?v2=true`) — no API or code
change needed; a "Book Online" CTA appears.

---

## Phase 2 — Google Calendar availability (planned, needs a backend)

The contact form's day/time picker is the front end for this. A **static site
cannot read a private Google Calendar** — that requires a server with
credentials. When ready:

1. Add an Astro server adapter and switch `output` to `'hybrid'`.
2. Create `src/pages/api/availability.ts` that calls the **Google Calendar
   FreeBusy API** (service account or OAuth) and returns busy/free blocks.
3. In `RequestForm.astro`, fetch that endpoint on load and disable/grey out
   fully-booked days (the `markBusy()` hook is noted in the script).

This shows real availability while **still only emailing a request** — no
automated booking, per requirement.

---

## Roadmap (the "built to last" path)

- **Phase 1 (shipped):** marketing site, service-request form → email, live
  Housecall Pro reviews widget, GA4, SEO/JSON-LD, mobile + desktop.
- **Phase 2:** Google Calendar availability display (above).
- **Phase 3:** optional secondary Google reviews wall; optional HCP "Book
  Online" CTA.
- **Phase 4:** authenticated customer area — scheduling, invoicing, payment
  status — via Astro API routes + HousecallPro API (MAX plan) or a dedicated
  backend.
