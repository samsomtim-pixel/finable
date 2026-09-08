import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://finable.nl',
  output: 'static',
  compressHTML: false,
  // /vacature was de oude route van de finance-hire-pagina; permanente redirect (ook in vercel.json).
  redirects: { '/vacature': { status: 301, destination: '/finance-hire' } },
  integrations: [sitemap()],
});
