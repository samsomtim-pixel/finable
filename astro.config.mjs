import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** Routes met <meta name="robots" content="noindex"> in Layout.astro. */
const NOINDEX = ['/voor-boekhouders'];

export default defineConfig({
  site: 'https://www.finable.nl',
  trailingSlash: 'never',
  output: 'static',
  compressHTML: false,
  // /vacature was de oude route van de finance-hire-pagina; permanente redirect (ook in vercel.json).
  redirects: { '/vacature': { status: 301, destination: '/finance-hire' } },
  // Pagina's op noindex horen niet in de sitemap: dat zou Google tegenstrijdige signalen geven.
  integrations: [sitemap({ filter: (page) => !NOINDEX.some((p) => new URL(page).pathname.replace(/\/$/, '') === p) })],
});
