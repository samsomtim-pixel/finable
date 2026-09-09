// Route-based taal: Nederlands op de root, Engels onder /en/ met eigen Engelse slugs.
// Geen automatische redirect op browsertaal of locatie; de bezoeker kiest via NL · EN.
export type Lang = 'nl' | 'en';

export const PAGE_MAP: { nl: string; en: string }[] = [
  { nl: '/', en: '/en/' },
  { nl: '/aanpak', en: '/en/finance-team' },
  { nl: '/hoe-het-werkt', en: '/en/how-it-works' },
  { nl: '/over', en: '/en/about' },
  { nl: '/indicatie', en: '/en/estimate' },
  { nl: '/gesprek', en: '/en/book-a-call' },
  { nl: '/finance-hire', en: '/en/finance-hire' },
];

/** Zonder trailing slash, behalve de root. */
export function normalise(path: string): string {
  const p = path.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

export function langOf(path: string): Lang {
  const p = normalise(path);
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'nl';
}

/** De NL- en EN-variant van de huidige pagina (valt terug op de homepages). */
export function alternates(path: string): { nl: string; en: string } {
  const p = normalise(path);
  const entry = PAGE_MAP.find((e) => normalise(e.nl) === p || normalise(e.en) === p);
  return entry ? { nl: entry.nl, en: entry.en } : { nl: '/', en: '/en/' };
}

/** Absolute URL met trailing slash, zoals de gebouwde pagina's (directory-output) worden geserveerd. */
export function absolute(path: string, site: URL): string {
  const p = normalise(path);
  return new URL(p === '/' ? '/' : p + '/', site).href;
}
