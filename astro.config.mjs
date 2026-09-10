import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.finable.nl',
  trailingSlash: 'never',
  output: 'static',
  // Vercel-adapter alleen voor de on-demand API-route (/api/indicatie); alle pagina's blijven statisch.
  adapter: vercel(),
  compressHTML: false,
  // /vacature was de oude route van de finance-hire-pagina; permanente redirect (ook in vercel.json).
  redirects: { '/vacature': { status: 301, destination: '/finance-hire' } },
  integrations: [sitemap()],
});
