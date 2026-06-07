# All Clear Services — Website

Modern marketing website for **All Clear Services**, a plumbing, heating &
cooling company serving Mercer County and central New Jersey. Built to be fast,
clean, accessible, and to grow into scheduling/invoicing features over time.

Content and navigation are an updated rebuild of the company's existing site
(`allclearplumbingandheating.com`).

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
                ReviewWall, RequestForm, CTABand, PageHeader, Logo, Icon,
                Analytics
  data/         site.ts, services.ts, reviews.ts, service-areas.ts
                — all content lives here; edit data, not markup
  layouts/      Layout.astro (head, SEO, JSON-LD, fonts, GA, header/footer)
  pages/        index, services, service-areas, reviews, about, contact, 404
  styles/       global.css (design tokens + primitives)
public/         favicon.svg, robots.txt
```

**To edit content** (services, towns, reviews, phone, copy) you almost never
touch markup — edit the files in `src/data/`.

---

## Launch checklist — fill these placeholders before going live

All integration keys live in **`src/data/site.ts`** under `integrations`.

| What | Where | Notes |
|------|-------|-------|
| **Logo** | `src/components/Logo.astro` | Swap the inline SVG wordmark for Todd's logo file (drop into `src/assets/`, import via `astro:assets`). Swap point is documented in the file. |
| **Web3Forms key** | `site.ts → web3formsAccessKey` | Free key at [web3forms.com](https://web3forms.com), tied to the company inbox. Form is disabled-safe until set. |
| **Company email** | `site.ts → email` | The inbox service requests should reach. |
| **GA4 Measurement ID** | `site.ts → gaMeasurementId` | `G-XXXXXXXXXX`. Analytics only loads once a real ID is present. |
| **Real review text** | `src/data/reviews.ts` | Reviews are faithful reconstructions of the current site's testimonials — paste verbatim text + real attribution, or wire a live Google widget (below). |
| **Angi profile URL** | `site.ts → social.angi` + `reviews.ts → reviewSummary.profileUrl` | Makes the "150+ reviews" credential clickable. |
| **Production domain** | `astro.config.mjs → site` + `public/robots.txt` | Update if the new domain differs from `allclearplumbingandheating.com`. |
| **HousecallPro booking link** (optional) | `site.ts → housecallBookingUrl` | If/when they want a self-serve "Book Online" CTA. See below. |

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
Launch uses curated, real testimonials + the "150+ on Angi" credential — so the
site looks credible on day one. (HousecallPro's own reviews widget starts empty
and would not include the existing Angi reviews.) To add a **live Google review
wall** later, set `site.ts → googleReviewsEmbedUrl` to a Trustindex/Elfsight
embed; it renders on the Reviews page automatically.

### HousecallPro
The company uses HousecallPro for invoicing/billing. **The site is intentionally
decoupled from the HCP API** — HCP's API requires their top-tier MAX plan, a
hired developer, and is built for *automation*, which is the opposite of the
"email us, we'll schedule manually" requirement. If self-serve booking is ever
wanted, set `housecallBookingUrl` to the hosted booking link
(`https://book.housecallpro.com/book/<Business>/<id>?v2=true`) — no API or code
change needed; a "Book Online" CTA appears on the contact page.

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

- **Phase 1 (this build):** marketing site, service-request form → email,
  curated reviews, GA4, SEO/JSON-LD, mobile + desktop.
- **Phase 2:** Google Calendar availability display (above).
- **Phase 3:** live Google reviews widget; optional HCP "Book Online" CTA.
- **Phase 4:** authenticated customer area — scheduling, invoicing, payment
  status — via Astro API routes + HousecallPro API (MAX plan) or a dedicated
  backend.
