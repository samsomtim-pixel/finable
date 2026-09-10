// Vercel serverless function for the /indicatie form submission.
//
// Static-site deployments on Vercel automatically expose files in this /api
// directory as serverless functions at /api/*, independent of the Astro
// static build. The browser posts the collected answers here; this function
// validates them server-side and emails every answer to Finable.
//
// Email is sent via Resend's transactional REST API (no SMTP, no extra npm
// dependency — uses the Node 18+ global fetch available on Vercel).
//
// Required environment variable:
//   RESEND_API_KEY   — Resend API key (server-side only, never exposed to the client)
// Optional environment variables:
//   INDICATIE_TO     — recipient (defaults to tim@finable.nl)
//   INDICATIE_FROM   — verified sender (defaults to "Finable <indicatie@finable.nl>";
//                      the domain must be verified in Resend for delivery to work)

const TO = process.env.INDICATIE_TO || 'tim@finable.nl';
const FROM = process.env.INDICATIE_FROM || 'Finable indicatie <indicatie@finable.nl>';

const MAX_FIELD = 2000; // per-field character cap
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort in-memory rate limit. Serverless instances are ephemeral and not
// shared, so this only throttles bursts hitting the same warm instance — a
// lightweight guard, not a hard global limit.
const RATE = { windowMs: 60_000, max: 6, hits: new Map() };
function isRateLimited(ip) {
  const now = Date.now();
  const rec = RATE.hits.get(ip) || { count: 0, reset: now + RATE.windowMs };
  if (now > rec.reset) { rec.count = 0; rec.reset = now + RATE.windowMs; }
  rec.count += 1;
  RATE.hits.set(ip, rec);
  return rec.count > RATE.max;
}

// Human-readable labels for every field the form can submit. Order defines the
// order in the email so nothing is silently dropped.
const FIELDS = [
  ['naam', 'Naam'],
  ['email', 'E-mailadres'],
  ['telefoon', 'Telefoonnummer'],
  ['website', 'Website'],
  ['grootte', 'Aantal medewerkers'],
  ['entiteiten', 'Aantal entiteiten'],
  ['landen', 'Actief in landen'],
  ['hulp', 'Waar hulp bij gezocht (finance scope)'],
  ['wie', 'Wie doet finance nu'],
  ['tevredenheid', 'Loopt dat naar tevredenheid'],
  ['facturen', 'Facturen per maand'],
  ['pakket', 'Boekhoudpakket'],
  ['vastloopt', 'Wat loopt het meest vast'],
  ['start', 'Gewenste start'],
  ['extra', 'Aanvullende opmerkingen'],
];

function asText(value) {
  if (Array.isArray(value)) return value.map((v) => String(v).slice(0, MAX_FIELD)).join(', ');
  if (value === null || value === undefined) return '';
  return String(value).slice(0, MAX_FIELD);
}

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    if (typeof req.body === 'string') {
      try { return resolve(JSON.parse(req.body)); } catch { return resolve({}); }
    }
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 100_000) req.destroy(); // guard against oversized payloads
    });
    req.on('end', () => { try { resolve(JSON.parse(raw || '{}')); } catch { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) return res.status(429).json({ ok: false });

  const body = await readBody(req);

  // Honeypot: a hidden field no human fills. If it has content, silently accept
  // (return success so bots get no signal) but send nothing.
  if (asText(body.hp).trim().length > 0) return res.status(200).json({ ok: true });

  // Server-side validation — never trust the client alone.
  const naam = asText(body.naam).trim();
  const email = asText(body.email).trim();
  if (!naam || naam.length > 200) return res.status(400).json({ ok: false });
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) return res.status(400).json({ ok: false });

  const locale = ['nl', 'en'].includes(body.locale) ? body.locale : 'nl';
  const timestamp = new Date().toISOString();

  // Subject requires a company name; this form has no company field, so fall
  // back to the website host, then the person's name.
  let bedrijf = asText(body.bedrijf).trim();
  if (!bedrijf) {
    const site = asText(body.website).trim();
    if (site) { try { bedrijf = new URL(site.startsWith('http') ? site : `https://${site}`).hostname.replace(/^www\./, ''); } catch { /* ignore */ } }
  }
  if (!bedrijf) bedrijf = naam;
  const subject = `Nieuwe Finable indicatie-aanvraag — ${bedrijf}`;

  // Build the email from every submitted field (present ones only).
  const lines = [];
  const htmlRows = [];
  for (const [key, label] of FIELDS) {
    const val = asText(body[key]).trim();
    if (!val) continue;
    lines.push(`${label}: ${val}`);
    htmlRows.push(
      `<tr><td style="padding:4px 12px 4px 0;color:#5b6470;vertical-align:top;white-space:nowrap;"><strong>${label}</strong></td><td style="padding:4px 0;color:#1f2933;">${escapeHtml(val)}</td></tr>`
    );
  }
  const meta = [
    ['Taal / locale', locale],
    ['Tijdstip', timestamp],
    ['Bronpagina', '/indicatie'],
  ];
  for (const [label, val] of meta) {
    lines.push(`${label}: ${val}`);
    htmlRows.push(
      `<tr><td style="padding:4px 12px 4px 0;color:#5b6470;vertical-align:top;white-space:nowrap;"><strong>${label}</strong></td><td style="padding:4px 0;color:#1f2933;">${escapeHtml(val)}</td></tr>`
    );
  }

  const text = `Nieuwe indicatie-aanvraag via finable.nl\n\n${lines.join('\n')}\n`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;">
    <h2 style="margin:0 0 16px;color:#1f2933;">Nieuwe indicatie-aanvraag</h2>
    <table style="border-collapse:collapse;">${htmlRows.join('')}</table>
  </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration: report failure to the client (calm generic error) but
    // do not leak details.
    console.error('indicatie: RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!r.ok) {
      console.error('indicatie: email provider returned', r.status);
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('indicatie: email send failed', err?.message || 'unknown error');
    return res.status(502).json({ ok: false });
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
