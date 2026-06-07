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
  // TODO: confirm the real inbox the service-request form should reach.
  email: 'office@allclearservices.com',
  emailHref: 'mailto:office@allclearservices.com',

  // The current site lists no street address; service is dispatched across a
  // wide area. Update if a storefront/office address should be published.
  address: {
    region: 'Mercer County & Central New Jersey',
    locality: 'Trenton',
    state: 'NJ',
  },

  hours: 'Open 7 days a week — emergency service available',
  emergencyLine: 'Emergency service available with one-hour response',

  // ---- Social / external profiles (optional; hidden when empty) ----------
  social: {
    // TODO: drop in the real Angi profile URL to make the credential clickable.
    angi: '',
    google: '',
    facebook: '',
  },

  // ---- Integrations ------------------------------------------------------
  integrations: {
    // Web3Forms access key. Create a free key at https://web3forms.com and
    // associate it with the company inbox above. The form ships disabled-safe
    // until this is set to a real key.
    web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',

    // GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Analytics only loads when this
    // is a real ID (not this placeholder), so dev/preview stays clean.
    gaMeasurementId: 'G-XXXXXXXXXX',

    // Optional HousecallPro hosted "Book Online" link. When set, a secondary
    // "Book Online" CTA appears. Pattern:
    // https://book.housecallpro.com/book/<Business>/<id>?v2=true
    housecallBookingUrl: '',

    // Optional third-party Google-reviews widget embed (Trustindex/Elfsight).
    // Left blank for launch — we seed real testimonials in reviews.ts instead.
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
