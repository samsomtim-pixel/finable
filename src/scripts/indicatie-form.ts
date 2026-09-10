// Meerstapsflow + verzending van het indicatie-/estimate-formulier (vanilla). Gedeeld door /indicatie en /en/estimate.
// Verzending gaat naar de eigen serverroute (/api/indicatie), die valideert en mailt. Bevestiging alleen bij een
// bevestigde succesvolle response; bij mislukken blijft het formulier staan met een rustige foutmelding.
// Analytics: 'indication_start' één keer bij de eerste echte interactie, 'indication_submit' alleen na succes.
// Er gaan nooit persoonsgegevens naar de dataLayer.
export {};

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

const form = document.querySelector<HTMLFormElement>('[data-indicatie-form]');
if (form) {
  const lang = form.dataset.lang || 'nl';
  const endpoint = form.dataset.endpoint || '/api/indicatie';
  const track = (data: Record<string, unknown>) => { window.dataLayer = window.dataLayer || []; window.dataLayer.push(data); };
  let started = false;
  const start = () => { if (started) return; started = true; track({ event: 'indication_start', form_name: 'finable_indication', locale: lang }); };
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
      sync();
    });
  });
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const firstInvalid = (scope: ParentNode): Control | null => scope.querySelector<Control>('input:invalid, select:invalid, textarea:invalid');
  const stepOf = (el: Element) => Number(el.closest<HTMLElement>('[data-formstep]')?.dataset.formstep) || step;

  form.querySelectorAll('[data-step-next]').forEach((b) => b.addEventListener('click', () => {
    // Verplichte velden van de huidige stap eerst (client-side, voor de UX; de server valideert opnieuw).
    const cur = form.querySelector<HTMLElement>('[data-formstep="' + step + '"]');
    const bad = cur ? firstInvalid(cur) : null;
    if (bad) { bad.reportValidity(); return; }
    step = Math.min(3, step + 1); sync(); toTop();
  }));
  form.querySelectorAll('[data-step-prev]').forEach((b) => b.addEventListener('click', () => { step = Math.max(1, step - 1); sync(); toTop(); }));

  const val = (n: string) => (form.elements.namedItem(n) as Control | null)?.value ?? '';
  const collect = () => {
    const out: Record<string, string> = { formulier: 'indicatie', taal: lang };
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
      website: val('website'),
      _gotcha: val('_gotcha'),
    });
    return out;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = form.querySelector<HTMLElement>('[data-formerror]');
    const btn = form.querySelector<HTMLButtonElement>('[data-submit]');
    if (err) err.style.display = 'none';
    if (val('_gotcha')) return; // honeypot
    const bad = firstInvalid(form);
    if (bad) {
      // Een verplicht veld in een eerdere stap (bijv. branche): terug naar die stap en de melding tonen.
      const s = stepOf(bad);
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
      done = true; sync(); toTop();
      track({ event: 'indication_submit', form_name: 'finable_indication', locale: lang });
    } catch {
      if (err) err.style.display = 'block';
      if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); btn.textContent = label; }
    }
  });
  sync();
}
