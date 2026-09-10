// Meerstapsflow + verzending van het indicatie-/estimate-formulier (vanilla). Gedeeld door /indicatie en /en/estimate.
// Teksten voor de laadstatus en het onderwerp komen uit data-attributen, zodat de logica taalneutraal blijft.
// Bevestiging alleen bij een succesvolle response; bij mislukken de zichtbare foutmelding.
const form = document.querySelector<HTMLFormElement>('[data-indicatie-form]');
if (form) {
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
  form.querySelectorAll('[data-step-next]').forEach((b) => b.addEventListener('click', () => { step = Math.min(3, step + 1); sync(); toTop(); }));
  form.querySelectorAll('[data-step-prev]').forEach((b) => b.addEventListener('click', () => { step = Math.max(1, step - 1); sync(); toTop(); }));

  const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '';
  const collect = () => {
    const out: Record<string, string> = {
      formulier: 'indicatie',
      taal: form.dataset.lang || 'nl',
      _subject: form.dataset.subject || 'Nieuwe indicatie-aanvraag via finable.nl',
    };
    for (const g of ['grootte', 'entiteiten', 'landen', 'hulp', 'wie', 'facturen', 'pakket', 'start']) {
      const v = sel[g];
      out[g] = Array.isArray(v) ? v.join(', ') : (v ?? '');
    }
    const branche = form.querySelector<HTMLSelectElement>('[data-branche]');
    Object.assign(out, { branche: branche?.value ?? '', naam: val('naam'), email: val('email'), telefoon: val('tel'), website: val('website') });
    return out;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = form.querySelector<HTMLElement>('[data-formerror]');
    const btn = form.querySelector<HTMLButtonElement>('[data-submit]');
    if (err) err.style.display = 'none';
    if (val('_gotcha')) return; // honeypot
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const endpoint = form.dataset.endpoint || '';
    const label = btn?.textContent ?? '';
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = form.dataset.busy || 'Versturen…'; }
    try {
      if (!endpoint) throw new Error('Geen formulier-endpoint geconfigureerd (PUBLIC_FORM_ENDPOINT_INDICATIE).');
      const payload: Record<string, string> = collect();
      if (form.dataset.accessKey) payload.access_key = form.dataset.accessKey;
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('bad status ' + res.status);
      done = true; sync(); toTop();
    } catch (ex) {
      console.error(ex);
      if (err) err.style.display = 'block';
      if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); btn.textContent = label; }
    }
  });
  sync();
}
