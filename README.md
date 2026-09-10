# Finable — productiesite

Astro, statische output, deploy op Vercel. De pagina's zijn letterlijk overgenomen uit de ontwerp-prototypes; alleen header, footer, knop en layout zijn gedeelde componenten.

```
npm install
npm run dev      # lokaal
npm run build    # statische output in dist/
```

## Structuur

- `src/layouts/Layout.astro` — `<head>`, metadata (canonical, Open Graph, Twitter), basisstijlen, container `.wrap`, eyebrow `.lbl`, knop `.btn`.
- `src/components/Header.astro`, `Footer.astro`, `Button.astro` — de gedeelde onderdelen (bron: hoe-het-werkt).
- `src/styles/tokens.css` — kleurtokens. `src/styles/fonts.css` — zelf gehoste fonts in `public/fonts/`.
- `src/pages/*.astro` — de zeven Nederlandse pagina's. `/finance-hire` ("Finance-hire of Finable?") staat in elke footer en in de sitemap; `/vacature` redirect er permanent naartoe.
- `src/pages/en/*.astro` — de zeven Engelse pagina's (zie *Engelse site*).
- `src/lib/i18n.ts` — de NL↔EN paginakoppeling, taal uit de route, canonical/hreflang-helpers.
- `src/scripts/indicatie-form.ts` — de meerstapslogica van het indicatie-/estimate-formulier, gedeeld door `/indicatie` en `/en/estimate`.
- `public/assets/` — logo-SVG's (zonder C2PA-metadata). `public/images/` — foto's als WebP (Tim, team, Sander/The Good Roll, Janesh, Shilpa), `public/images/logos/` — de twaalf logo's van de bewegende ervaringsrail op de home (`LogoMarquee.astro`), in eigen merkkleuren. `public/og.png` — deelafbeelding.

## Engelse site

Route-based, geen Astro-i18n-config en geen automatische redirect op browsertaal of locatie: de bezoeker kiest via **NL · EN** (header, mobiel menu, footer). De wissel linkt altijd naar de equivalente pagina.

| Nederlands | Engels |
|---|---|
| `/` | `/en` |
| `/aanpak` | `/en/finance-team` |
| `/hoe-het-werkt` | `/en/how-it-works` |
| `/over` | `/en/about` |
| `/indicatie` | `/en/estimate` |
| `/gesprek` | `/en/book-a-call` |
| `/finance-hire` | `/en/finance-hire` |

`Layout.astro` zet per pagina `lang`, canonical en `hreflang` (nl, en, x-default → NL) op basis van `src/lib/i18n.ts`; alle URL's op `https://www.finable.nl` zonder trailing slash. De head bevat ook een Apple touch icon en een Organization-JSON-LD met alleen geverifieerde gegevens. `npm run build` schrijft na de sitemap-integratie ook `dist/sitemap.xml` (`scripts/sitemap-alias.mjs`); robots.txt en `<link rel="sitemap">` verwijzen daarnaar. De sitemap bevat alle NL- en EN-pagina's; `/vacature` staat er niet in. Onbedoelde Engelse varianten met Nederlandse slugs (`/en/aanpak`, `/en/over`, …) redirecten in `vercel.json` permanent naar de Engelse route. Header en footer lezen de taal uit de route; de Engelse footer heeft dezelfde opbouw met Engelse linkgroepen. Brits-Engelse spelling (organisation, personalised).

## Formulieren en boeking

`/indicatie` en `/en/estimate` posten dezelfde JSON (plus `taal`) naar de eigen serverroute `POST /api/indicatie` (`src/pages/api/indicatie.ts`, on-demand via `@astrojs/vercel`; alle pagina's blijven statisch). De route valideert serverzijde (verplicht: naam, bedrijfsnaam `company_name`, e-mail, branche `industry`; lengtes; honeypot `_gotcha`; lichte rate-limiting per IP), bouwt de mail op in `src/lib/indicatie-mail.ts` en verstuurt via de Resend REST API naar `tim@finable.nl` met reply-to op het opgegeven adres. Het formulier toont pas de bevestiging als de server `ok:true` teruggeeft; anders blijft het staan met een foutmelding. Analytics: `indication_start` (één keer, bij eerste interactie) en `indication_submit` (alleen na succes) op de dataLayer, zonder persoonsgegevens. Geen prijsberekening, geen opslag.

```
RESEND_API_KEY=re_…                 # verplicht op Vercel (Project → Settings → Environment Variables)
INDICATIE_FROM=Finable <indicatie@finable.nl>   # na domeinverificatie in Resend; standaard onboarding@resend.dev
INDICATIE_TO=tim@finable.nl         # standaard
```

`/gesprek` en `/en/book-a-call` embedden Calendly inline (`https://calendly.com/tim-finable/30min`); het Calendly-script wordt alleen op die pagina's geladen. Na een bevestigde afspraak (`calendly.event_scheduled`) gaat `book_call_complete` naar de dataLayer.

## Ontwerp (Claude Design, september 2026)

De zeven Nederlandse pagina's volgen de goedgekeurde referentiepagina's (`*-nav2 v2.dc.html`): witte navigatie, navy hero met warm-witte H1 en terracotta nadruk, editoriale witte/zacht-getinte secties, selectieve navy-ankers en een witte footer. De capability-taal is site-breed **Dagelijkse finance → Maandafsluiting → Controlling → Rapportage & inzicht**; "managementrapportage" komt alleen nog voor in de vacaturetekst op /finance-hire (bewust). De Engelse pagina's onder `/en/` volgen dezelfde v2-opbouw met de goedgekeurde Engelse copy (Brits-Engels).

## Nog niet ingevuld (vóór livegang)

- Privacy en Voorwaarden/Terms linken naar `#` — er zijn nog geen NL- of EN-juridische pagina's.
- Portretten van Rishabh Goyal en Himanshu Poddar op /over (bewust neutrale plek, `.port-pending`).
- "20+ finance-specialisten" op /over verifiëren (zie HTML-comment ter plekke).
- Domein in `astro.config.mjs` (`site`) controleren.
