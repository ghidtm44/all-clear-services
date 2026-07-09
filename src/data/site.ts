/**
 * Site-wide configuration & company facts.
 * Single source of truth for contact info, nav, and integration keys.
 *
 * PLACEHOLDERS to fill before launch are marked `TODO:`.
 */

export const site = {
  name: 'All Clear Services',
  legalName: 'All Clear Services',
  // Short tagline used in the header lockup and <title> suffixes.
  tagline: 'Plumbing, Heating & Cooling',

  // ---- Ownership & licensing --------------------------------------------
  // Owner-operator and the credentials customers ask for. Rendered on the
  // About page and referenced in the footer fine print.
  owner: 'Lucas Medina',
  licenses: [
    { label: 'Master Plumber License', number: '13552' },
    { label: 'General Contractors License', number: '13VH12709700' },
  ],
  // One-line positioning statement.
  blurb:
    'Licensed plumbing, heating, and cooling for homes and businesses across central New Jersey — done right, the first time.',

  // ---- Contact -----------------------------------------------------------
  // What customers SEE is the vanity spelling (609-64-CLEAR). A tap still
  // dials the real number via phoneHref. phoneNumeric is the plain digits for
  // structured data (JSON-LD) where a vanity string isn't appropriate.
  phoneDisplay: '609-64-CLEAR',
  phoneNumeric: '609-642-5327',
  phoneHref: 'tel:+16096425327',
  // Working inbox that receives service requests (Web3Forms is keyed to it).
  email: 'njallclearservices@gmail.com',
  emailHref: 'mailto:njallclearservices@gmail.com',

  // The current site lists no street address; service is dispatched across a
  // wide area. Update if a storefront/office address should be published.
  address: {
    region: 'Mercer County & Central New Jersey',
    locality: 'Trenton',
    state: 'NJ',
  },

  hours: 'Monday – Friday · emergency service available',
  emergencyLine: 'Emergency service available — timely response',

  // ---- Social / external profiles (optional; hidden when empty) ----------
  social: {
    // Instagram handle @allclearservices — rendered as a button in the footer.
    instagram: 'https://www.instagram.com/allclearservices',
    instagramHandle: '@allclearservices',
    // Housecall Pro is the review/booking platform; the reviews widget lives
    // on the Reviews page and homepage (see HousecallReviews.astro).
    housecallpro: '',
    google: '',
    facebook: '',
  },

  // ---- Integrations ------------------------------------------------------
  integrations: {
    // Web3Forms access key — keyed to njallclearservices@gmail.com, which is
    // where service requests are delivered. (Web3Forms sends to whatever inbox
    // verified this key, not to a value in this file.)
    web3formsAccessKey: 'dc47156b-4f89-4a8b-b492-a420ac245aee',

    // GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Analytics only loads when this
    // is a real ID (not this placeholder), so dev/preview stays clean.
    gaMeasurementId: 'G-HGRE056LPY',

    // Optional HousecallPro hosted "Book Online" link. When set, a secondary
    // "Book Online" CTA appears. Pattern:
    // https://book.housecallpro.com/book/<Business>/<id>?v2=true
    housecallBookingUrl: '',

    // Optional third-party Google-reviews widget embed (Trustindex/Elfsight).
    // Left blank — the live Housecall Pro reviews widget is the primary source
    // (see HousecallReviews.astro). This slot is a future add-on only.
    //
    // SECURITY: this is RAW HTML, injected unsanitized via `set:html` on the
    // reviews page. It is operator-trusted only — paste a widget snippet you
    // got directly from Trustindex/Elfsight, and NEVER wire this to user input
    // or an untrusted CMS field, or you create a stored-XSS hole.
    googleReviewsEmbedHtml: '',
  },
} as const;

/**
 * Primary navigation — order matters.
 * `hasMenu` flags the Services item, which renders as a dropdown of individual
 * services (hover on desktop, tap-to-expand on mobile) instead of a plain link.
 */
export const nav = [
  { label: 'Services', href: '/services/', hasMenu: true },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;
