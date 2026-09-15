// Centrale analytics-laag voor Finable. Eén plek die naar window.dataLayer schrijft, zodat GTM
// één contract heeft en events niet per pagina opnieuw worden uitgevonden.
//
// Uitgangspunten:
// - Nooit persoonsgegevens. Namen, e-mailadressen, telefoonnummers en vrije tekst worden geweigerd,
//   niet "zo goed mogelijk geanonimiseerd". Zie SAFE_VALUE en de sleutel-blocklist hieronder.
// - Nooit dubbel meten. trackOnce() dedupeert per pageview; de aanroeper hoeft geen vlaggen bij te houden.
// - Faalt stil. Geen dataLayer (bijv. GTM geblokkeerd) betekent geen fout voor de bezoeker.
// - Debug alleen op verzoek: ?analytics_debug=1 of localStorage 'finable_analytics_debug'.
//   In productie logt deze module niets.
//
// Attributie (UTM/gclid) gaat NIET naar de dataLayer: GA4 doet acquisitie zelf al. De opslag hier
// bestaat uitsluitend om de campagne mee te kunnen sturen met een indicatie-aanvraag (CRM-attributie).

export type Params = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Sleutels die nooit in een event mogen staan, ook niet als een toekomstige aanroeper ze meegeeft. */
const BLOCKED_KEYS = [
  'email', 'e_mail', 'mail', 'naam', 'name', 'first_name', 'last_name', 'fullname',
  'phone', 'tel', 'telefoon', 'mobile', 'address', 'adres', 'postcode', 'zip',
  'company_name', 'bedrijfsnaam', 'website', 'url_input', 'message', 'bericht',
  'comment', 'opmerking', 'notes', 'free_text', 'value_text', 'ip', 'user_id',
];

/** Maximale lengte van een stringwaarde. Langer duidt op vrije tekst en hoort hier niet. */
const MAX_VALUE_LENGTH = 100;

const isDebug = (): boolean => {
  try {
    if (new URLSearchParams(window.location.search).has('analytics_debug')) return true;
    return window.localStorage.getItem('finable_analytics_debug') === '1';
  } catch {
    return false;
  }
};

/**
 * Laat alleen waarden door die als dimensie of metric bruikbaar zijn: korte strings, getallen, booleans.
 * Objecten, arrays, functies en lange strings worden geweigerd; dat is precies waar PII in zou lekken.
 */
const safeValue = (v: unknown): string | number | boolean | null => {
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'boolean') return v;
  if (typeof v !== 'string') return null;
  const s = v.trim().replace(/[\x00-\x1F\x7F]/g, '');
  if (!s || s.length > MAX_VALUE_LENGTH) return null;
  // Een @ of een reeks van 7+ cijfers duidt op een e-mailadres of telefoonnummer.
  if (s.includes('@') || /\d[\d\s+()-]{6,}/.test(s)) return null;
  return s;
};

const normaliseKey = (k: string): string => k.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, 40);

/** Padnaam zonder querystring: een query kan een e-mailadres of token bevatten. */
export const pagePath = (): string => {
  try {
    return window.location.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return '/';
  }
};

export const language = (): 'nl' | 'en' => (document.documentElement.lang === 'en' ? 'en' : 'nl');

/**
 * Stuurt één event naar de dataLayer. Parameters worden genormaliseerd en gefilterd;
 * geweigerde parameters verdwijnen stil (en worden in debugmodus gemeld).
 */
export function trackEvent(eventName: string, parameters: Params = {}): void {
  const name = normaliseKey(eventName);
  if (!name) return;
  const payload: Record<string, unknown> = { event: name };
  const dropped: string[] = [];
  for (const [rawKey, rawValue] of Object.entries(parameters)) {
    const key = normaliseKey(rawKey);
    if (!key || key === 'event') continue;
    if (BLOCKED_KEYS.includes(key)) { dropped.push(key); continue; }
    const value = safeValue(rawValue);
    if (value === null) { dropped.push(key); continue; }
    payload[key] = value;
  }
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    return; // dataLayer niet beschikbaar: stil falen, de bezoeker merkt niets.
  }
  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.info('[finable analytics]', payload, dropped.length ? { geweigerd: dropped } : '');
  }
}

const fired = new Set<string>();

/** Vuurt maximaal één keer per pageview, gesleuteld op `key`. */
export function trackOnce(key: string, eventName: string, parameters: Params = {}): boolean {
  if (fired.has(key)) return false;
  fired.add(key);
  trackEvent(eventName, parameters);
  return true;
}

/* ------------------------------------------------------------------ *
 * Attributie: alleen voor lead-attributie in onze eigen backend.
 * ------------------------------------------------------------------ */

const ATTRIBUTION_KEY = 'finable_attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  first_seen?: string;
};

const readStore = (): Attribution => {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
};

/**
 * Legt de campagne van deze sessie vast. First touch: een latere pagina zonder UTM's overschrijft niets,
 * een nieuwe campagne binnen dezelfde sessie wel. sessionStorage, geen cookie: verdwijnt met het tabblad
 * en is niet bruikbaar om iemand over sessies heen te volgen.
 */
export function captureAttribution(): Attribution {
  let stored = readStore();
  try {
    const q = new URLSearchParams(window.location.search);
    const incoming: Attribution = {};
    for (const k of UTM_KEYS) {
      const v = q.get(k);
      const safe = v ? safeValue(v) : null;
      if (typeof safe === 'string') incoming[k] = safe;
    }
    if (Object.keys(incoming).length) {
      // Nieuwe campagne: volledig vervangen, zodat source en medium niet uit twee bezoeken door elkaar lopen.
      stored = { ...incoming, landing_page: pagePath(), first_seen: new Date().toISOString() };
      const ref = document.referrer;
      if (ref) { try { stored.referrer = new URL(ref).hostname; } catch { /* geen geldige referrer */ } }
      window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(stored));
    } else if (!stored.landing_page) {
      stored.landing_page = pagePath();
      stored.first_seen = stored.first_seen || new Date().toISOString();
      const ref = document.referrer;
      if (ref && !stored.referrer) { try { stored.referrer = new URL(ref).hostname; } catch { /* idem */ } }
      window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(stored));
    }
  } catch {
    /* sessionStorage geblokkeerd: attributie is dan simpelweg leeg. */
  }
  return stored;
}

export const getAttribution = (): Attribution => readStore();

/** Alleen de UTM-parameters, voor doorgifte aan de Calendly-embed (officieel ondersteund). */
export function utmParams(): Record<string, string> {
  const a = getAttribution();
  const out: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    if (k === 'gclid') continue; // Calendly ondersteunt alleen de utm_*-velden.
    const v = a[k];
    if (v) out[k] = v;
  }
  return out;
}

/**
 * HubSpot's bezoekerstoken. Wordt pas gezet nadat HubSpot via GTM is geladen, en dat gebeurt alleen
 * na geldige toestemming. Ontbreekt het token, dan is er geen toestemming en sturen we niets mee.
 */
export function hubspotToken(): string | null {
  try {
    const m = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return m ? decodeURIComponent(m[1]).slice(0, 64) : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Consent: uitlezen, niet zetten. CookieYes blijft de enige bron.
 * ------------------------------------------------------------------ */

/**
 * Leest de CookieYes-consentcookie. Geeft null als er nog geen keuze is gemaakt, zodat de aanroeper
 * onderscheid kan maken tussen "geweigerd" en "nog niets gekozen".
 */
export function hasConsent(category: 'analytics' | 'functional' | 'advertisement'): boolean | null {
  try {
    const m = document.cookie.match(/(?:^|;\s*)cookieyes-consent=([^;]+)/);
    if (!m) return null;
    const raw = decodeURIComponent(m[1]);
    const hit = new RegExp('(?:^|,)' + category + ':(yes|no)(?:,|$)').exec(raw);
    return hit ? hit[1] === 'yes' : null;
  } catch {
    return null;
  }
}

/** Roept `fn` aan bij elke consentwijziging van CookieYes (en niet bij het laden zelf). */
export function onConsentChange(fn: () => void): void {
  document.addEventListener('cookieyes_consent_update', fn as EventListener);
  document.addEventListener('cookieyes_banner_load', fn as EventListener);
}
