// Na `astro build`: @astrojs/sitemap schrijft sitemap-index.xml + sitemap-0.xml, maar Search Console
// en robots.txt verwijzen naar /sitemap.xml. Dit script publiceert de urlset ook als sitemap.xml, in elke
// output-map die de build heeft opgeleverd (dist/client via de Vercel-adapter, .vercel/output/static, of dist).
import { copyFileSync, existsSync, readFileSync } from 'node:fs';

const candidates = ['../dist/client', '../.vercel/output/static', '../dist'].map((p) => new URL(p + '/', import.meta.url));
const targets = candidates.filter((dir) => existsSync(new URL('sitemap-0.xml', dir)));

if (!targets.length) {
  console.error('sitemap-alias: geen sitemap-0.xml gevonden; is de sitemap-integratie actief?');
  process.exit(1);
}
for (const dir of targets) {
  const src = new URL('sitemap-0.xml', dir);
  const xml = readFileSync(src, 'utf8');
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') || !xml.includes('<urlset')) {
    console.error(`sitemap-alias: ${src.pathname} is geen geldige urlset`);
    process.exit(1);
  }
  copyFileSync(src, new URL('sitemap.xml', dir));
  const count = (xml.match(/<loc>/g) ?? []).length;
  console.log(`sitemap-alias: ${new URL('sitemap.xml', dir).pathname} geschreven (${count} URL's)`);
}
