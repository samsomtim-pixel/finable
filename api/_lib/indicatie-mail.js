// Validatie, e-mailopbouw en verzending via Resend (REST) voor het indicatieformulier. Geen prijsberekening, geen opslag.
const FIELDS = [
  { key: "naam", label: "Naam", max: 120, required: true },
  { key: "company_name", label: "Bedrijfsnaam", max: 160, required: true },
  { key: "email", label: "E-mailadres", max: 200, required: true },
  { key: "telefoon", label: "Telefoonnummer", max: 40 },
  { key: "website", label: "Website", max: 200 },
  { key: "industry", label: "Branche", max: 80, required: true },
  { key: "grootte", label: "Aantal medewerkers", max: 40 },
  { key: "entiteiten", label: "Aantal entiteiten", max: 40 },
  { key: "landen", label: "Actief in", max: 120 },
  { key: "hulp", label: "Waar hulp bij nodig (finance-scope)", max: 300 },
  { key: "wie", label: "Wie doet finance nu", max: 80 },
  { key: "facturen", label: "Facturen per maand", max: 40 },
  { key: "pakket", label: "Boekhoudpakket", max: 80 },
  { key: "start", label: "Gewenste start", max: 80 }
];
const IGNORED_KEYS = /* @__PURE__ */ new Set(["_gotcha", "taal", "formulier", "_subject"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EXTRA_FIELDS = 20;
const MAX_EXTRA_LENGTH = 500;
const CONTROL_CHARS = new RegExp("[\\x00-\\x1F\\x7F]", "g");
const clean = (v, max) => typeof v === "string" ? v.replace(CONTROL_CHARS, "").trim().slice(0, max) : "";
function parseSubmission(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, invalid: ["body"] };
  const raw = body;
  const fields = {};
  const invalid = [];
  for (const f of FIELDS) {
    const v = clean(raw[f.key], f.max);
    if (f.required && !v) invalid.push(f.key);
    if (typeof raw[f.key] === "string" && raw[f.key].length > f.max * 4) invalid.push(f.key);
    fields[f.key] = v;
  }
  if (fields.email && !EMAIL_RE.test(fields.email)) invalid.push("email");
  const extra = {};
  for (const [k, v] of Object.entries(raw)) {
    if (FIELDS.some((f) => f.key === k) || IGNORED_KEYS.has(k)) continue;
    if (Object.keys(extra).length >= MAX_EXTRA_FIELDS) break;
    if (typeof v === "string" && v.trim()) extra[k.slice(0, 60)] = clean(v, MAX_EXTRA_LENGTH);
  }
  if (invalid.length) return { ok: false, invalid: Array.from(new Set(invalid)) };
  const locale = raw.taal === "en" ? "en" : "nl";
  return { ok: true, data: { locale, fields, extra } };
}
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
function buildMail(sub, now = /* @__PURE__ */ new Date()) {
  const company = sub.fields.company_name || "(onbekend)";
  const stamp = now.toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", dateStyle: "full", timeStyle: "short" });
  const rows = FIELDS.map((f) => [f.label, sub.fields[f.key] || "\u2014"]);
  for (const [k, v] of Object.entries(sub.extra)) rows.push([`Overig veld: ${k}`, v]);
  rows.push(["Taal", sub.locale === "en" ? "Engels (/en/estimate)" : "Nederlands (/indicatie)"]);
  rows.push(["Bronpagina", sub.locale === "en" ? "/en/estimate" : "/indicatie"]);
  rows.push(["Ingezonden op", `${stamp} (${now.toISOString()})`]);
  const subject = `Nieuwe Finable indicatie-aanvraag \u2014 ${company}`;
  const text = ["Nieuwe indicatie-aanvraag via finable.nl", "", ...rows.map(([l, v]) => `${l}: ${v}`), "", "Beantwoord deze mail om direct te reageren (reply-to staat op het opgegeven e-mailadres)."].join("\n");
  const html = `<!doctype html><html lang="nl"><body style="font-family:Inter,Arial,sans-serif;color:#1B3A5C;line-height:1.5">
<h2 style="margin:0 0 16px;font-size:20px">Nieuwe indicatie-aanvraag via finable.nl</h2>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px">
${rows.map(([l, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#5F6B76;vertical-align:top;white-space:nowrap">${esc(l)}</td><td style="padding:6px 0;vertical-align:top">${esc(v)}</td></tr>`).join("\n")}
</table>
<p style="margin-top:20px;font-size:13px;color:#5F6B76">Beantwoord deze mail om direct te reageren.</p>
</body></html>`;
  return { subject, text, html };
}
async function sendWithResend(cfg, sub, fetchImpl = fetch) {
  const mail = buildMail(sub);
  const res = await fetchImpl(cfg.apiUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: cfg.from, to: [cfg.to], reply_to: sub.fields.email, subject: mail.subject, text: mail.text, html: mail.html })
  });
  if (!res.ok) return { ok: false, status: res.status };
  const json = await res.json().catch(() => null);
  return json?.id ? { ok: true, id: json.id } : { ok: false, status: res.status };
}
export {
  FIELDS,
  buildMail,
  parseSubmission,
  sendWithResend
};
