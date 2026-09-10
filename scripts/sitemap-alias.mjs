// Na `astro build`: @astrojs/sitemap schrijft sitemap-index.xml + sitemap-0.xml, maar Search Console
// en robots.txt verwijzen naar /sitemap.xml. Dit script publiceert de urlset ook als dist/sitemap.xml.
import { copyFileSync, existsSync, readFileSync } from 'node:fs';

const src = new URL('../dist/sitemap-0.xml', import.meta.url);
const dest = new URL('../dist/sitemap.xml', import.meta.url);

if (!existsSync(src)) {
  console.error('sitemap-alias: dist/sitemap-0.xml ontbreekt; is de sitemap-integratie actief?');
  process.exit(1);
}
const xml = readFileSync(src, 'utf8');
if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') || !xml.includes('<urlset')) {
  console.error('sitemap-alias: dist/sitemap-0.xml is geen geldige urlset');
  process.exit(1);
}
copyFileSync(src, dest);
const count = (xml.match(/<loc>/g) ?? []).length;
console.log(`sitemap-alias: dist/sitemap.xml geschreven (${count} URL's)`);
