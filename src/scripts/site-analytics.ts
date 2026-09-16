// Site-brede meetlaag. Wordt één keer ingeladen vanuit Layout.astro en geldt dus voor elke pagina.
// Pagina-specifieke events (indicatieformulier, Calendly) staan bij de pagina zelf.
//
// Regel tegen dubbeltellingen: één klik levert één event op.
//   - link naar /gesprek of /en/book-a-call  -> book_call_click   (en geen cta_click)
//   - link naar een casepagina               -> case_cta_click    (en geen cta_click)
//   - overige commerciële CTA's              -> cta_click
//   - hoofdnavigatie                         -> nav_click
//   - taalwissel                             -> language_switch
// De volgorde hieronder is de prioriteit: de eerste match wint en stopt.

import { trackEvent, trackOnce, captureAttribution, pagePath, language } from './analytics';

captureAttribution();

const path = pagePath();
const lang = language();

/* ---------------- case_view ---------------- */
// Vuurt op een casepagina, één keer per pageview. Waarde: leest iemand de case echt, of blijft het bij de klik?
const caseMatch = /^\/(?:en\/)?cases\/([a-z0-9-]+)$/.exec(path);
if (caseMatch) {
  trackOnce('case_view', 'case_view', { case_name: caseMatch[1].replace(/-/g, '_'), language: lang });
}

/* ---------------- form_view ---------------- */
// Alleen op de indicatiepagina's, en pas als het formulier daadwerkelijk in beeld komt. Dit is de noemer
// onder indication_start: hoeveel mensen zien het formulier en beginnen er niet aan?
const form = document.querySelector<HTMLElement>('[data-indicatie-form]');
if (form) {
  const fire = () => trackOnce('form_view', 'form_view', { form_name: 'finable_indication', language: lang, page_path: path });
  if ('IntersectionObserver' in window) {
    // threshold 0: elk zichtbaar deel telt. Een drempel van bijv. 0.2 is relatief aan de hoogte van het
    // formulier zelf, en dat is op mobiel hoger dan het scherm; die drempel wordt dan nooit gehaald.
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { fire(); io.disconnect(); }
    }, { threshold: 0 });
    io.observe(form);
  } else {
    fire();
  }
}

/* ---------------- scroll_50 ---------------- */
// GA4 Enhanced Measurement meet zelf 90%. 50% voegt het middenstuk toe: kwam iemand voorbij de hero?
// Eén keer per pageview, passieve listener, daarna losgekoppeld.
let scrollDone = false;
const onScroll = () => {
  if (scrollDone) return;
  const de = document.documentElement;
  const scrollable = de.scrollHeight - window.innerHeight;
  if (scrollable < 400) { scrollDone = true; window.removeEventListener('scroll', onScroll); return; }
  if ((window.scrollY + window.innerHeight) / de.scrollHeight >= 0.5) {
    scrollDone = true;
    window.removeEventListener('scroll', onScroll);
    trackOnce('scroll_50', 'scroll_50', { page_path: path, language: lang });
  }
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------------- klik-events ---------------- */

const BOOKING_PATHS = ['/gesprek', '/en/book-a-call'];

/** Waar op de pagina zit deze link? Voor CTA-vergelijking (hero versus footer versus slot). */
const locationOf = (el: HTMLElement): string => {
  const explicit = el.closest<HTMLElement>('[data-cta-location]')?.dataset.ctaLocation;
  if (explicit) return explicit;
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  if (el.closest('.nav-panel')) return 'mobile_menu';
  const sections = [...document.querySelectorAll('section')];
  const section = el.closest('section');
  if (section) {
    const i = sections.indexOf(section);
    if (i === 0) return 'hero';
    if (i === sections.length - 1) return 'closing';
    return 'section_' + (i + 1);
  }
  return 'body';
};

const normalisePath = (href: string): string => {
  try {
    const u = new URL(href, window.location.origin);
    if (u.origin !== window.location.origin) return u.origin;
    return u.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return href;
  }
};

document.addEventListener('click', (e) => {
  const target = e.target as Element | null;
  const link = target?.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
  const destination = normalisePath(href);

  // 1. Taalwissel. Waarde: is de Engelse site het bouwen waard, en waar wordt er gewisseld?
  const langSwitch = link.closest('.lang-switch');
  if (langSwitch) {
    const to = link.getAttribute('hreflang') === 'en' ? 'en' : 'nl';
    if (to !== lang) trackEvent('language_switch', { from_language: lang, to_language: to, page_path: path });
    return;
  }

  // 2. Boekings-CTA. Blijft het specifieke funnel-event; krijgt géén cta_click erbovenop.
  if (BOOKING_PATHS.includes(destination)) {
    trackEvent('book_call_click', { cta_location: locationOf(link), page_path: path, language: lang });
    return;
  }

  // 3. Case-CTA.
  const caseName = link.dataset.caseLink;
  if (caseName || /^\/(?:en\/)?cases\//.test(destination)) {
    trackEvent('case_cta_click', {
      case_name: caseName || destination.split('/').pop()?.replace(/-/g, '_') || 'unknown',
      cta_location: locationOf(link),
      page_path: path,
    });
    return;
  }

  // 4. Hoofdnavigatie. Alleen de menu-items, niet elke footerlink: footer-spam levert geen beslissing op.
  const navItem = link.closest('.nav-mid, .nav-panel');
  if (navItem) {
    trackEvent('nav_click', { nav_item: (link.textContent || '').trim().slice(0, 40), destination, page_path: path });
    return;
  }

  // 5. Overige commerciële CTA's: alleen expliciet gemarkeerde knoppen en de indicatie-links.
  //    Zo meten we intentie, niet elke willekeurige link op de pagina.
  const explicit = link.dataset.cta;
  const isIndication = destination === '/indicatie' || destination === '/en/estimate';
  if (explicit || isIndication) {
    trackEvent('cta_click', {
      cta_name: explicit || 'indication',
      cta_location: locationOf(link),
      page_path: path,
      destination,
    });
  }
}, { capture: true });
