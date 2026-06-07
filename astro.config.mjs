// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOTE: `site` should be set to the final production domain once DNS/hosting
// is configured on GoDaddy. It drives canonical URLs, sitemap, and OG tags.
// The company currently owns allclearplumbingandheating.com — update if the
// new domain differs.
export default defineConfig({
  site: 'https://allclearplumbingandheating.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  // Static output deploys cleanly to GitHub Pages today. When scheduling /
  // invoicing arrive, add an adapter (e.g. @astrojs/node or a serverless
  // adapter) and convert `output` to 'hybrid' so src/pages/api/* can run.
});
