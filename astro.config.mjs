import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.finable.nl',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
