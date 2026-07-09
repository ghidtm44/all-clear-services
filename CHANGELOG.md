# Changelog

All notable changes to the All Clear Services website.

Format follows [Keep a Changelog](https://keepachangelog.com/); newest first.
Dates are `YYYY-MM-DD`. Each entry lists the short commit SHA for traceability.

> **How to add an entry:** when you ship a change, add a bullet under a dated
> heading at the top. Group related commits under one date. Keep it in plain
> English — this is the human/owner-facing record, not the git log.

---

## 2026-07-09 — Copy overhaul + platform switch to Housecall Pro

Owner (Lucas Medina) requested a batch of copy changes and a switch off Angi.
Shipped as two commits, deployed together.

### Changed
- **Hero lead rewritten** — "From a dripping faucet to a full water or sewer
  line replacement…"; removed the old "flooded basement at 2 a.m." framing and
  the "Nights, weekends & holidays" assurance line. (`a9d2c5f`)
- **Emergency-service copy softened** — every "within the hour / any day of the
  week / one-hour response" claim replaced with "a timely manner" /
  "Timely emergency response" across the emergency service card, its detail
  page, the "What we handle" list, and the homepage trust stats. (`a9d2c5f`)
- **"Why All Clear" paragraph** — "No song and dance, no hourly meter…" replaced
  with "We provide clear answers, fair flat pricing, and workmanship we stand
  behind." (`a9d2c5f`)
- **Availability copy aligned with the "timely" messaging** — Contact/request
  form no longer says "including weekends & holidays" (the booking calendar
  disables Sat/Sun, so the claim contradicted the form directly below it);
  `site.hours` no longer says "anytime". Both now read "emergency service
  available". (`4a18cae`)

### Added
- **Owner & licensing block** on the About page and in the footer fine print:
  **Lucas Medina, Owner** · Master Plumber License #13552 · General Contractors
  License #13VH12709700. Stored in `src/data/site.ts` (`owner`, `licenses`). (`a9d2c5f`)
- **Instagram button** (`@allclearservices`) in the footer, site-wide. New
  `instagram` glyph added to `Icon.astro`. (`a9d2c5f`)
- **Housecall Pro reviews widget** — live, verified reviews embedded on the
  homepage and the Reviews page via new `src/components/HousecallReviews.astro`
  (iframe → `client.housecallpro.com/reviews/widget/8610f70d-…`). (`a9d2c5f`)

### Removed
- **All Angi references** — replaced with Housecall Pro throughout (hero card,
  trust bar, Reviews page, meta descriptions). "150+ five-star reviews" kept as
  the count, now attributed to Housecall Pro; the "Angi Super Service Award"
  credential was dropped (no Housecall Pro equivalent — avoided inventing one).
  (`a9d2c5f`)
- **Curated review system deleted** — `src/components/ReviewWall.astro` and
  `src/data/reviews.ts` removed; the Housecall Pro widget is now the single
  source of reviews. (`a9d2c5f`)
- **About page "Here when you need us" card** removed; the values grid dropped
  from four cards to three. (`a9d2c5f`)

### Ops note
- GitHub Actions was in a `major_outage` during this deploy; the push-triggered
  run stalled in `queued`. Recovery path used: a manual `workflow_dispatch` run
  of the existing **Deploy to GitHub Pages** workflow (no config change) once
  Actions returned to `partial_outage`. Site published successfully. HTTPS cert
  for the custom domain briefly lagged behind (expected during a Pages
  degradation) and self-healed. See `ARCHITECTURE.md → Deployment` for the full
  playbook.

---

## 2026-06-07 — Initial build & launch

The entire site was designed, built, and launched on this date.

### Added — core site
- **Initial Astro build** of the All Clear Services marketing site — a rebuild
  of the company's prior site (`allclearplumbingandheating.com`). Static output,
  component-based, design-token CSS, Fraunces + Inter fonts. (`4ff2aa8`)
- **Real logo integrated**, phone number and domain set, GitHub Pages deploy
  workflow added. (`9a7fbc8`)
- **Env-driven base path** so one codebase serves both the GitHub Pages preview
  subpath and the apex domain from root (`withBase()` helper). (`66a7480`)
- **OG image** added; initial code-review findings addressed. (`c533fda`)

### Added — features & integrations
- **Service-request form** upgraded to a month calendar with multi-select time
  windows; posts to Web3Forms (email only, no auto-booking). (`c443829`)
  - Saturdays closed in the calendar; the "Evening" time window removed. (`bc3b3da`)
- **Live Web3Forms key** wired; contact routed to the working company inbox
  (`njallclearservices@gmail.com`). (`ad628b9`)
- **Google Analytics 4** enabled (`G-HGRE056LPY`), IP-anonymized, loads only
  when a real Measurement ID is present. (`2f8f5ff`)

### Changed — design & content
- **Redesign** to a unified light nav/hero, services dropdown; dropped the
  "24/7" claim and the service-areas section. (`015782d`)
- Homepage hero headline updated. (`feb849a`)
- **Brand colors** applied to CTAs (navy button, copper/yellow accents). (`0ee5cdf`)
- **About page** headline → "Family owned and operated"; removed the
  stats/badges aside. (`c6aaa58`, `246a6b0`)

### Changed — hosting
- **Custom domain cutover** to `allclearservices.com` (from the github.io
  preview subpath). `public/CNAME` added; `astro.config.mjs` defaults to the
  apex domain. (`c5a9860`)
