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
- `public/assets/` — logo-SVG's (zonder C2PA-metadata). `public/images/` — foto's als WebP (Tim, team, Sander/The Good Roll, Janesh, Shilpa), `public/images/logos/` — de logo's van de ervaringstrip op de home. `public/og.png` — deelafbeelding.

## Engelse site

Route-based, geen Astro-i18n-config en geen automatische redirect op browsertaal of locatie: de bezoeker kiest via **NL · EN** (header, mobiel menu, footer). De wissel linkt altijd naar de equivalente pagina.

| Nederlands | Engels |
|---|---|
| `/` | `/en/` |
| `/aanpak` | `/en/finance-team` |
| `/hoe-het-werkt` | `/en/how-it-works` |
| `/over` | `/en/about` |
| `/indicatie` | `/en/estimate` |
| `/gesprek` | `/en/book-a-call` |
| `/finance-hire` | `/en/finance-hire` |

`Layout.astro` zet per pagina `lang`, canonical en `hreflang` (nl, en, x-default → NL) op basis van `src/lib/i18n.ts`. De sitemap bevat alle NL- en EN-pagina's; `/vacature` staat er niet in. Onbedoelde Engelse varianten met Nederlandse slugs (`/en/aanpak`, `/en/over`, …) redirecten in `vercel.json` permanent naar de Engelse route. Header en footer lezen de taal uit de route; de Engelse footer heeft dezelfde opbouw met Engelse linkgroepen. Brits-Engelse spelling (organisation, personalised).

## Formulieren en boeking

`/indicatie` en `/en/estimate` posten dezelfde JSON (plus `taal`) naar dezelfde formulierdienst (Formspree, Web3Forms of Basin). `/gesprek` heeft een boekingsmodule die uitgeschakeld blijft tot een echte agenda-provider is gekoppeld (`bookingProviderConnected` in `src/pages/gesprek.astro`); tot die tijd toont de kaart de mail-route en rendert `/en/book-a-call` alleen die mail-route (geen kalender, geen boekingsscript). Zet in Vercel de omgevingsvariabelen uit `.env.example`:

```
PUBLIC_FORM_ENDPOINT_GESPREK=https://formspree.io/f/<id>
PUBLIC_FORM_ENDPOINT_INDICATIE=https://formspree.io/f/<id>
PUBLIC_FORM_ACCESS_KEY=            # alleen voor Web3Forms
```

Zonder endpoint toont het formulier de foutmelding met `tim@finable.nl` als terugvaloptie; een bevestiging verschijnt alleen na een succesvolle response. De boekingsmodule op `/gesprek` heeft geen naam- of e-mailveld; koppel een agenda-provider voordat je `bookingProviderConnected` op true zet.

## Ontwerp (Claude Design, september 2026)

De zeven Nederlandse pagina's volgen de goedgekeurde referentiepagina's (`*-nav2 v2.dc.html`): witte navigatie, navy hero met warm-witte H1 en terracotta nadruk, editoriale witte/zacht-getinte secties, selectieve navy-ankers en een witte footer. De capability-taal is site-breed **Dagelijkse finance → Maandafsluiting → Controlling → Rapportage & inzicht**; "managementrapportage" komt alleen nog voor in de vacaturetekst op /finance-hire (bewust). De Engelse pagina's onder `/en/` volgen dezelfde v2-opbouw met de goedgekeurde Engelse copy (Brits-Engels).

## Nog niet ingevuld (vóór livegang)

- `[STATUTAIRE NAAM]` en `[NUMMER]` in de footer (Engels: `[LEGAL ENTITY]` en `[NUMBER]`); Privacy en Voorwaarden/Terms linken naar `#` — er zijn nog geen NL- of EN-juridische pagina's.
- Portretten van Rishabh Goyal en Himanshu Poddar op /over (bewust neutrale plek, `.port-pending`).
- "20+ finance-specialisten" op /over verifiëren (zie HTML-comment ter plekke).
- Domein in `astro.config.mjs` (`site`) controleren.
