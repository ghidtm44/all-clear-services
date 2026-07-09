/**
 * Service catalog — sourced from the company's current site and grouped into
 * clean categories. `icon` maps to a key in components/Icon.astro (line-art
 * SVGs, no emoji / clip-art). `slug` drives the per-service detail page at
 * /services/<slug>/.
 */

export interface Service {
  slug: string;
  title: string;
  icon: string;
  /** Short one-liner for cards and the nav dropdown. */
  summary: string;
  /** Longer lead paragraph for the dedicated service page. */
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    slug: 'plumbing',
    title: 'Plumbing',
    icon: 'pipe',
    summary:
      'Repairs, replacements, and installations for every fixture and line in your home or business.',
    description:
      'From a dripping faucet to a failed main water line, our licensed plumbers handle it all — cleanly, correctly, and at a flat price you approve before we start. We service every fixture and line in the house, for both residential and commercial properties.',
    items: [
      'Faucets, sinks, toilets, showers & tubs',
      'Pipe repair & replacement',
      'Leak detection & repair',
      'Frozen pipe thawing & prevention',
      'Main water line service',
      'Appliance & ice-maker line hookups',
    ],
  },
  {
    slug: 'drain-sewer',
    title: 'Drain & Sewer',
    icon: 'drain',
    summary:
      'Clearing the toughest clogs and keeping your waste lines flowing with camera-guided precision.',
    description:
      'A slow drain or backed-up sewer line never picks a convenient time. We clear the toughest clogs, jet greasy main lines clean, and use video inspection to find the real cause — so the problem is fixed, not just pushed down the line.',
    items: [
      'Drain clog clearing',
      'Sewer line cleaning',
      'High-pressure water jetting',
      'Sump, ejector & laundry pumps',
      'Sewer ejector pump service',
    ],
  },
  {
    slug: 'heating-cooling',
    title: 'Heating & Cooling',
    icon: 'thermostat',
    summary:
      'Keep your space comfortable year-round with expert HVAC installation, repair, and conversions.',
    description:
      'Whether the furnace quit on the coldest night of the year or the A/C gave out in a July heat wave, we get your comfort back fast. We install, repair, and maintain boilers, furnaces, and central air — and handle oil-to-gas conversions start to finish.',
    items: [
      'Boilers & furnaces',
      'Central air conditioning',
      'A/C condenser service',
      'Oil-to-gas conversions',
      'Seasonal maintenance',
    ],
  },
  {
    slug: 'water-heaters',
    title: 'Hot Water Systems',
    icon: 'water-heater',
    summary:
      'Reliable hot water with energy-efficient tank and tankless systems, installed and serviced right.',
    description:
      'No hot water is an emergency in any season. We repair and replace tank water heaters and install energy-efficient tankless systems sized right for your home — so you get reliable hot water and a lower bill.',
    items: [
      'Water heater installation',
      'Repair & replacement',
      'Energy-efficient & tankless options',
      'Well pump service',
    ],
  },
  {
    slug: 'camera-excavation',
    title: 'Video Camera & Excavation',
    icon: 'camera',
    summary:
      'See exactly what is happening underground before a shovel ever breaks the surface.',
    description:
      'Guesswork underground is expensive. We send a camera down the line to locate the exact break or blockage, then dig only where we need to — saving your yard and your budget on every excavation and main-line repair.',
    items: [
      'Sewer & drain video inspection',
      'Underground line locating',
      'Targeted excavation & repair',
      'Water meter & main line work',
    ],
  },
  {
    slug: 'emergency',
    title: 'Emergency Service',
    icon: 'clock',
    summary:
      'Burst pipe? Flooded basement? We answer the phone and respond in a timely manner.',
    description:
      'When water is where it shouldn’t be, every minute counts. We answer the phone and respond in a timely manner. Residential or commercial — call us and we’ll be on the way.',
    items: [
      'Timely emergency response',
      'Residential & commercial',
      'Basement flooding & pumping',
    ],
  },
];

/** Headline trust signals shown beneath the hero. */
export const trustPoints = [
  { stat: '150+', label: 'Five-star reviews on Housecall Pro' },
  { stat: 'Timely', label: 'Emergency response' },
  { stat: 'Licensed', label: 'Master Plumber & General Contractor' },
  { stat: 'Free', label: 'No-obligation estimates' },
];
