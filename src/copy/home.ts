// Contentmodel van de homepage. De structuur staat in components/Home.astro en is voor alle talen
// gelijk; alleen de waarden hieronder verschillen per taal. Nederlands is leidend: komt er een
// sectie bij, dan wordt die in Home.astro gebouwd en krijgt elke taal hier een waarde.
export interface Link { href: string; label: string }

export interface HomeCopy {
  meta: { title: string; description: string };
  hero: {
    eyebrowA: string; eyebrowB: string;
    h1a: string; h1b: string;
    sub: string;
    /** Eén regel direct onder de introductie: je hoeft niet alles tegelijk over te dragen. */
    start: string;
    cta: Link;
    /** Wijst naar het werkzaamhedenblok op deze pagina, niet naar een andere pagina. */
    secondary: Link;
    /** De vier werkgebieden, rustig typografisch naast de kop. Geen cijfers, geen interface. */
    veldenLabel: string;
    velden: string[];
  };
  /** Expertise die achter Finable beschikbaar is. De note zegt expliciet dat dit niet de bezetting
   *  van iedere klant beschrijft, zodat de regel geen beloftekarakter krijgt. */
  bewijs: { items: { k: string; p: string }[]; note: string };
  herken: { label: string; h2: string; items: { h3: string; p: string }[] };
  /** Werkzaamheden én wat je ervan terugkrijgt. verderLezen is per taal verschillend: het
   *  kennisartikel en /finance-uitbesteden bestaan alleen in het Nederlands. */
  werk: {
    label: string; h2: string; sub: string;
    items: { h3: string; p: string }[];
    verderLezenLabel: string;
    verderLezen: Link[];
  };
  case: {
    logoAlt: string; label: string; h2: string; persoon: string;
    quoteA: string; quoteB: string;
    body: string; link: Link; fotoAlt: string;
  };
  /** De mensen achter het werk, inclusief de transparante toelichting over de teaminrichting. */
  mensen: {
    label: string; h2: string; body: string; toelichting: string;
    personen: { naam: string; rol: string; sub: string; foto: string; alt: string }[];
    link: Link;
  };
  /** Bescheiden verwijzing naar de aanvullende markt van boekhoud- en accountantskantoren, laag op
   *  de pagina. Geen tweede propositie: de homepage blijft van de hoofdclaim. null wanneer
   *  /voor-boekhouders in deze taal niet bestaat; de banner wordt dan niet gerenderd. */
  kantoren: { label: string; h2: string; p: string; cta: Link } | null;
  faq: { label: string; items: { q: string; a: string }[]; alle: Link };
  /** Afsluitende sectie: drie stappen, de CTA en Tim als aanspreekpunt. */
  starten: {
    label: string; h2: string; p: string;
    stappen: { h3: string; p: string }[];
    cta: Link; gerust: string;
    timAlt: string; timNaam: string; timRol: string;
  };
}
