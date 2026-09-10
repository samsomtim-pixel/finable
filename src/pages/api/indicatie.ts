// POST /api/indicatie — ontvangt het indicatie-/estimate-formulier (JSON), valideert serverzijde en mailt
// alle antwoorden naar tim@finable.nl via Resend. Antwoordt pas met ok:true als Resend de mail heeft geaccepteerd.
// Logt bewust geen formulierinhoud, alleen statussen.
export const prerender = false;

import type { APIRoute } from 'astro';
import { parseSubmission, sendWithResend } from '../../lib/indicatie-mail';

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

// Lichte rate-limiting per IP, per serverless-instantie (best effort; geen gedeelde opslag).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function limited(ip: string, now = Date.now()) {
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) { hits.set(ip, list); return true; }
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!/application\/json/i.test(request.headers.get('content-type') ?? '')) return json(415, { ok: false, error: 'unsupported_media_type' });

  const raw = await request.text();
  if (raw.length > 20_000) return json(413, { ok: false, error: 'too_large' });
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return json(400, { ok: false, error: 'invalid_json' }); }

  // Honeypot: bots krijgen een neutraal antwoord, er wordt niets verstuurd.
  if (body && typeof body === 'object' && typeof (body as Record<string, unknown>)._gotcha === 'string' && (body as Record<string, unknown>)._gotcha) {
    return json(200, { ok: true });
  }

  let ip = 'unknown';
  try { ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown'; } catch { /* clientAddress kan ontbreken in dev */ }
  if (limited(ip)) return json(429, { ok: false, error: 'rate_limited' });

  const parsed = parseSubmission(body);
  if (!parsed.ok) return json(400, { ok: false, error: 'validation', fields: parsed.invalid });

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) { console.error('indicatie: RESEND_API_KEY ontbreekt'); return json(500, { ok: false, error: 'not_configured' }); }
  const cfg = {
    apiKey,
    apiUrl: import.meta.env.RESEND_API_URL || 'https://api.resend.com/emails',
    to: import.meta.env.INDICATIE_TO || 'tim@finable.nl',
    from: import.meta.env.INDICATIE_FROM || 'Finable <onboarding@resend.dev>',
  };

  try {
    const sent = await sendWithResend(cfg, parsed.data);
    if (!sent.ok) { console.error('indicatie: mailprovider antwoordde', sent.status); return json(502, { ok: false, error: 'mail_failed' }); }
    return json(200, { ok: true });
  } catch (err) {
    console.error('indicatie: verzenden mislukt', err instanceof Error ? err.message : 'unknown');
    return json(502, { ok: false, error: 'mail_failed' });
  }
};

export const GET: APIRoute = () => json(405, { ok: false, error: 'method_not_allowed' });
