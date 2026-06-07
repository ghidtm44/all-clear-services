// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` drives canonical URLs, sitemap, and OG tags. Production domain is
// allclearservices.com (GoDaddy) — DNS/hosting configured as the final step.
export default defineConfig({
  site: 'https://allclearservices.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  // Static output deploys cleanly to GitHub Pages today. When scheduling /
  // invoicing arrive, add an adapter (e.g. @astrojs/node or a serverless
  // adapter) and convert `output` to 'hybrid' so src/pages/api/* can run.
});
