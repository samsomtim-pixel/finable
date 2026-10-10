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
    cta: Link; secondary: Link;
    imgAlt: string;
  };
  herken: { h2: string; aside: string; items: { h3: string; p: string }[] };
  /** Doelgroepkaarten onder de probleemherkenning. null wanneer de doelgroeppagina's in deze taal
   *  niet bestaan; de sectie wordt dan niet gerenderd. */
  doelgroepen: {
    h2: string;
    intro: string;
    items: { h3: string; p: string; cta: Link; accent?: boolean }[];
  } | null;
  ervaring: { label: string };
  functie: { label: string; h2: string; flow: string[]; trio: string[] };
  verandert: {
    label: string; h2: string; body: string; concl: string;
    proof: string[];
    bronnenLabel: string;
    bronnen: { label: string; url: string }[];
    /** Verwijzing naar het kennisartikel. null wanneer dat artikel in deze taal niet bestaat. */
    read: Link | null;
  };
  situatie: { h2: string; compare: Link; items: { label: string; p: string; link?: Link }[] };
  case: {
    logoAlt: string; label: string; persoon: string;
    quoteA: string; quoteB: string;
    body: string; link: Link; fotoAlt: string;
  };
  zekerheden: { h2: string; aside: string; items: { label: string; p: string }[] };
  faq: { label: string; items: { q: string; a: string }[]; alle: Link };
  eind: {
    label: string; timAlt: string; h2: string; p: string;
    cta: Link; timNaam: string; timRol: string;
  };
}
