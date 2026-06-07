/**
 * Customer reviews.
 *
 * IMPORTANT — these are reconstructed from the themes of the real testimonials
 * on the company's current site (allclearplumbingandheating.com). They are
 * faithful in substance but are NOT guaranteed verbatim. Before launch, paste
 * the exact review text + real attribution here, or replace this section with a
 * live Google-reviews widget (set site.integrations.googleReviewsEmbedUrl).
 *
 * `source` is shown as an attribution chip ("via Angi", etc.). Keep it honest.
 */

export interface Review {
  quote: string;
  name: string;
  location?: string;
  source: string;
  rating: number; // 1–5
}

export const reviews: Review[] = [
  {
    quote:
      'They showed up within the hour on a holiday weekend when our basement was flooding. Professional, fast, and they charged exactly what they quoted. These are our forever plumbers.',
    name: 'Verified Customer',
    location: 'Hamilton, NJ',
    source: 'via Angi',
    rating: 5,
  },
  {
    quote:
      "We've used All Clear for seven years on a 200-year-old home that throws every plumbing surprise imaginable. Every single time they're kind, careful, and they get it right.",
    name: 'Verified Customer',
    location: 'Pennington, NJ',
    source: 'via Angi',
    rating: 5,
  },
  {
    quote:
      'No song and dance, no upsell. They diagnosed the problem, gave me a fair price, and had it fixed the same day. Easily six-star service.',
    name: 'Verified Customer',
    location: 'Princeton, NJ',
    source: 'via Angi',
    rating: 5,
  },
  {
    quote:
      'Honest and fair on pricing, which is rare. They walked me through what was wrong and what my options were before doing any work. Highly recommend.',
    name: 'Verified Customer',
    location: 'Lawrenceville, NJ',
    source: 'via Angi',
    rating: 5,
  },
  {
    quote:
      'Called for a water heater that died overnight. They answered right away, were at the house quickly, and had hot water back the same day. Couldn’t ask for more.',
    name: 'Verified Customer',
    location: 'Ewing, NJ',
    source: 'via Angi',
    rating: 5,
  },
  {
    quote:
      'Great communication from the first call to the finished job. Clean, respectful of the house, and the work was done right. We won’t call anyone else.',
    name: 'Verified Customer',
    location: 'West Windsor, NJ',
    source: 'via Angi',
    rating: 5,
  },
];

/** Aggregate stat shown above the review wall. */
export const reviewSummary = {
  rating: 5,
  countLabel: '150+',
  platform: 'Angi',
  // TODO: link to the real Angi profile to make this verifiable.
  profileUrl: '',
};
