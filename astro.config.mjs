import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.finable.nl',
  output: 'static',
  compressHTML: false,
  integrations: [
    sitemap({
      // /vacature is een campagnepagina: noindex en buiten de sitemap.
      filter: (page) => !page.includes('/vacature'),
    }),
  ],
});
