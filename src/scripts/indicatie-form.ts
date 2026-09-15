// Meerstapsflow + verzending van het indicatie-/estimate-formulier (vanilla). Gedeeld door /indicatie en /en/estimate.
// Verzending gaat naar de eigen serverroute (/api/indicatie), die valideert en mailt. Bevestiging alleen bij een
// bevestigde succesvolle response; bij mislukken blijft het formulier staan met een rustige foutmelding.
//
// Analytics loopt via scripts/analytics.ts. Er gaan nooit persoonsgegevens of ingevulde antwoorden naar de
// dataLayer: bij een validatiefout sturen we de veldnaam en het fouttype, nooit de waarde.
// 'form_view' wordt door site-analytics.ts gevuurd, zodat er één noemer is onder deze funnel.
import { trackEvent, trackOnce, getAttribution, hubspotToken, language, pagePath } from './analytics';

export {};

const form = document.querySelector<HTMLFormElement>('[data-indicatie-form]');
if (form) {
  const lang = form.dataset.lang || 'nl';
  const endpoint = form.dataset.endpoint || '/api/indicatie';

  // Stapnamen zijn stabiel en taalonafhankelijk, zodat NL en EN in GA4 op één rij vallen.
  const STEP_NAMES: Record<number, string> = { 1: 'organisation', 2: 'finance', 3: 'contact' };

  /** Tegelvragen die beantwoord moeten zijn. Geen enkele staat als "(optioneel)" in de copy, en elke
   *  groep heeft een uitweg-antwoord ("Weet ik nog niet", "Anders of nog niets"), dus verplicht is eerlijk.
   *  Wil je er een loslaten: haal hem hier weg, de rest blijft werken. */
  const REQUIRED_TILES: { group: string; step: number }[] = [
    { group: 'grootte', step: 1 },
    { group: 'entiteiten', step: 1 },
    { group: 'landen', step: 1 },
    { group: 'hulp', step: 2 },
    { group: 'wie', step: 2 },
    { group: 'facturen', step: 2 },
    { group: 'pakket', step: 2 },
    { group: 'start', step: 3 },
  ];
  const REQUIRED_MESSAGE = lang === 'en' ? 'Please choose an option to continue.' : 'Kies een optie om verder te gaan.';

  const start = () => trackOnce('indication_start', 'indication_start', {
    form_name: 'finable_indication', locale: lang, page_path: pagePath(),
  });
  form.addEventListener('input', start);
  form.addEventListener('change', start);

  const sel: Record<string, string | string[] | null> = {};
  let step = 1;
  let done = false;
  const tiles = form.querySelectorAll<HTMLButtonElement>('[data-tile]');
  const sync = () => {
    tiles.forEach((t) => {
      const g = t.dataset.group!, v = t.dataset.value!, cur = sel[g];
      const on = Array.isArray(cur) ? cur.indexOf(v) >= 0 : cur === v;
      t.setAttribute('data-active', on ? '1' : '0');
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const cur = done ? 'done' : String(step);
    form.querySelectorAll<HTMLElement>('[data-formstep]').forEach((el) => { el.style.display = el.dataset.formstep === cur ? 'block' : 'none'; });
    document.querySelectorAll<HTMLElement>('[data-leftstep]').forEach((el) => { el.style.display = (!done && el.dataset.leftstep === String(step)) ? 'block' : 'none'; });
    for (let i = 1; i <= 3; i++) {
      const active = !done && i === step;
      const dot = document.querySelector<HTMLElement>('[data-stepdot="' + i + '"]');
      const lab = document.querySelector<HTMLElement>('[data-steplabel="' + i + '"]');
      // Kleuren via CSS op [data-active] (de stapindicator staat op navy én op wit).
      if (dot) dot.setAttribute('data-active', active ? '1' : '0');
      if (lab) lab.setAttribute('data-active', active ? '1' : '0');
    }
  };

  const isAnswered = (group: string) => {
    const v = sel[group];
    return Array.isArray(v) ? v.length > 0 : Boolean(v);
  };

  /** Melding onder de tegelrij, in dezelfde stijl als de bestaande formulierfout. Geen nieuw ontwerp. */
  const tileError = (group: string): HTMLElement => {
    const first = form.querySelector<HTMLElement>('[data-tile][data-group="' + group + '"]');
    const row = first?.parentElement;
    let el = form.querySelector<HTMLElement>('[data-tile-error="' + group + '"]');
    if (!el && row) {
      el = document.createElement('p');
      el.setAttribute('data-tile-error', group);
      el.setAttribute('role', 'alert');
      el.style.cssText = 'display:none;font-size:14px;color:var(--terracotta);margin-top:10px';
      el.textContent = REQUIRED_MESSAGE;
      row.insertAdjacentElement('afterend', el);
    }
    return el!;
  };
  const clearTileError = (group: string) => {
    const el = form.querySelector<HTMLElement>('[data-tile-error="' + group + '"]');
    if (el) el.style.display = 'none';
  };

  tiles.forEach((t) => {
    t.addEventListener('click', () => {
      start();
      const group = t.dataset.group!, val = t.dataset.value!, multi = t.dataset.multi === '1';
      if (multi) {
        const arr = Array.isArray(sel[group]) ? (sel[group] as string[]).slice() : [];
        const i = arr.indexOf(val);
        if (i >= 0) arr.splice(i, 1); else arr.push(val);
        sel[group] = arr;
      } else {
        sel[group] = sel[group] === val ? null : val;
      }
      if (isAnswered(group)) clearTileError(group);
      sync();
    });
  });
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const firstInvalid = (scope: ParentNode): Control | null => scope.querySelector<Control>('input:invalid, select:invalid, textarea:invalid');
  const stepOf = (el: Element) => Number(el.closest<HTMLElement>('[data-formstep]')?.dataset.formstep) || step;

  const validationError = (stepNumber: number, field: string, errorType: string) =>
    // Alleen veldnaam en fouttype. Nooit wat de bezoeker invulde.
    trackEvent('indication_validation_error', { step_number: stepNumber, field, error_type: errorType, locale: lang });

  /** Eerste onbeantwoorde verplichte tegelvraag van een stap; toont de melding en springt ernaartoe. */
  const missingTile = (stepNumber: number): string | null => {
    for (const r of REQUIRED_TILES) {
      if (r.step !== stepNumber || isAnswered(r.group)) continue;
      const el = tileError(r.group);
      if (el) el.style.display = 'block';
      const firstTile = form.querySelector<HTMLElement>('[data-tile][data-group="' + r.group + '"]');
      firstTile?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstTile?.focus({ preventScroll: true });
      return r.group;
    }
    return null;
  };

  /** Valideert één stap: eerst de tegelvragen, daarna de native velden. Retourneert true als de stap klopt. */
  const validateStep = (stepNumber: number): boolean => {
    const missing = missingTile(stepNumber);
    if (missing) { validationError(stepNumber, missing, 'required'); return false; }
    const scope = form.querySelector<HTMLElement>('[data-formstep="' + stepNumber + '"]');
    const bad = scope ? firstInvalid(scope) : null;
    if (bad) {
      validationError(stepNumber, bad.name || bad.id || 'unknown', bad.validity.valueMissing ? 'required' : 'invalid');
      bad.reportValidity();
      return false;
    }
    return true;
  };

  form.querySelectorAll('[data-step-next]').forEach((b) => b.addEventListener('click', () => {
    // Client-side validatie voor de UX; de server valideert opnieuw.
    if (!validateStep(step)) return;
    trackEvent('indication_step_complete', { step_number: step, step_name: STEP_NAMES[step] || String(step), locale: lang });
    step = Math.min(3, step + 1); sync(); toTop();
  }));
  form.querySelectorAll('[data-step-prev]').forEach((b) => b.addEventListener('click', () => {
    const from = step;
    step = Math.max(1, step - 1);
    if (step !== from) trackEvent('indication_back', { from_step: from, to_step: step, locale: lang });
    sync(); toTop();
  }));

  const val = (n: string) => (form.elements.namedItem(n) as Control | null)?.value ?? '';
  /** De bezoeker hoeft geen protocol te typen: 'accelr.nl' wordt 'https://accelr.nl'. Wat al met http(s):// begint
   *  blijft ongewijzigd. De server normaliseert opnieuw; dit is alleen voor de payload, het veld zelf blijft staan. */
  const normaliseWebsite = (raw: string) => {
    const v = raw.trim();
    if (!v) return '';
    return /^https?:\/\//i.test(v) ? v : 'https://' + v.replace(/^\/+/, '');
  };

  const collect = () => {
    const out: Record<string, unknown> = { formulier: 'indicatie', taal: lang };
    for (const g of ['grootte', 'entiteiten', 'landen', 'hulp', 'wie', 'facturen', 'pakket', 'start']) {
      const v = sel[g];
      out[g] = Array.isArray(v) ? v.join(', ') : (v ?? '');
    }
    Object.assign(out, {
      industry: val('industry'),
      company_name: val('company_name'),
      naam: val('naam'),
      email: val('email'),
      telefoon: val('tel'),
      website: normaliseWebsite(val('website')),
      _gotcha: val('_gotcha'),
    });
    // Campagne-attributie voor de lead (niet voor GA4, dat doet acquisitie zelf).
    // Backwards compatible: de server negeert het veld als hij het niet kent.
    const attribution = getAttribution();
    const hutk = hubspotToken();
    if (hutk) (attribution as Record<string, string>).hubspot_utk = hutk;
    if (Object.keys(attribution).length) out.attribution = attribution;
    return out;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = form.querySelector<HTMLElement>('[data-formerror]');
    const btn = form.querySelector<HTMLButtonElement>('[data-submit]');
    if (err) err.style.display = 'none';
    if (val('_gotcha')) return; // honeypot
    // Alle stappen opnieuw langs, zodat een overgeslagen tegelvraag uit stap 1 hier alsnog blokkeert.
    for (const s of [1, 2, 3]) {
      const missing = missingTile(s);
      if (missing) {
        validationError(s, missing, 'required');
        if (s !== step) { step = s; sync(); }
        requestAnimationFrame(() => form.querySelector<HTMLElement>('[data-tile][data-group="' + missing + '"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        return;
      }
    }
    const bad = firstInvalid(form);
    if (bad) {
      // Een verplicht veld in een eerdere stap (bijv. branche): terug naar die stap en de melding tonen.
      const s = stepOf(bad);
      validationError(s, bad.name || bad.id || 'unknown', bad.validity.valueMissing ? 'required' : 'invalid');
      if (s !== step) { step = s; sync(); toTop(); }
      requestAnimationFrame(() => bad.reportValidity());
      return;
    }
    const label = btn?.textContent ?? '';
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = form.dataset.busy || 'Versturen…'; }
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(collect()) });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data || data.ok !== true) throw new Error('submit failed: ' + res.status);
      trackEvent('indication_step_complete', { step_number: 3, step_name: STEP_NAMES[3], locale: lang });
      done = true; sync(); toTop();
      // Uitsluitend na een bevestigde succesvolle response. Eén keer per pageview.
      trackOnce('indication_submit', 'indication_submit', { form_name: 'finable_indication', locale: lang, language: language() });
    } catch {
      if (err) err.style.display = 'block';
      if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); btn.textContent = label; }
    }
  });
  sync();
}
