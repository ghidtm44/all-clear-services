// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy target is env-driven so the SAME codebase serves both:
//   - DEPLOY_TARGET=ghpages  → ghidtm44.github.io/all-clear-services/ (preview)
//   - default / apex domain  → allclearservices.com  (production, GoDaddy)
// The GH Pages preview needs `site` + `base` set to the project subpath; the
// apex domain serves from root. Internal links use withBase() (src/lib/url.ts)
// so flipping this flag requires NO link edits.
const isGhPages = process.env.DEPLOY_TARGET === 'ghpages';

export default defineConfig({
  site: isGhPages
    ? 'https://ghidtm44.github.io'
    : 'https://allclearservices.com',
  base: isGhPages ? '/all-clear-services' : '/',
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  // Static output deploys cleanly to GitHub Pages today. When scheduling /
  // invoicing arrive, add an adapter (e.g. @astrojs/node or a serverless
  // adapter) and convert `output` to 'hybrid' so src/pages/api/* can run.
});
