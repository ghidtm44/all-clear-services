/**
 * Service catalog — sourced from the company's current site and grouped into
 * clean categories. `icon` maps to a key in components/Icon.astro (line-art
 * SVGs, no emoji / clip-art). `slug` reserves a future per-service detail page.
 */

export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  items: string[];
}

export const services: Service[] = [
  {
    slug: 'plumbing',
    title: 'Plumbing',
    icon: 'pipe',
    summary:
      'Repairs, replacements, and installations for every fixture and line in your home or business.',
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
    items: [
      'Sewer & drain video inspection',
      'Underground line locating',
      'Targeted excavation & repair',
      'Water meter & main line work',
    ],
  },
  {
    slug: 'emergency',
    title: '24/7 Emergency Service',
    icon: 'clock',
    summary:
      'Burst pipe at 2 a.m.? We answer the phone and respond within the hour — nights, weekends, and holidays.',
    items: [
      'One-hour emergency response',
      'Nights, weekends & holidays',
      'Residential & commercial',
      'Basement flooding & pumping',
    ],
  },
];

/** Headline trust signals shown beneath the hero. */
export const trustPoints = [
  { stat: '150+', label: 'Five-star reviews on Angi' },
  { stat: '1-Hour', label: 'Emergency response, 24/7' },
  { stat: 'Multi-Year', label: 'Angi Super Service Award winner' },
  { stat: 'Free', label: 'No-obligation estimates' },
];
