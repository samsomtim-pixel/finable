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
- `src/pages/*.astro` — de zeven pagina's. `/vacature` ("Finance-hire of Finable?") staat in elke footer en in de sitemap.
- `public/assets/` — logo-SVG's (zonder C2PA-metadata). `public/images/` — WebP-afbeeldingen. `public/og.png` — deelafbeelding.

## Formulieren en boeking

`/indicatie` post JSON naar een formulierdienst (Formspree, Web3Forms of Basin). `/gesprek` heeft een boekingsmodule met illustratieve dagen en tijden (TODO in de code: echte agenda-provider koppelen); het gekozen moment wordt voorlopig naar hetzelfde type endpoint gepost. Zet in Vercel de omgevingsvariabelen uit `.env.example`:

```
PUBLIC_FORM_ENDPOINT_GESPREK=https://formspree.io/f/<id>
PUBLIC_FORM_ENDPOINT_INDICATIE=https://formspree.io/f/<id>
PUBLIC_FORM_ACCESS_KEY=            # alleen voor Web3Forms
```

Zonder endpoint toont het formulier de foutmelding met `tim@finable.nl` als terugvaloptie; een bevestiging verschijnt alleen na een succesvolle response. Let op: de boekingsmodule op `/gesprek` heeft geen naam- of e-mailveld; zonder gekoppelde agenda-provider is dit nog geen werkende conversie.

## Nog niet ingevuld (vóór livegang)

- `[STATUTAIRE NAAM]` en `[NUMMER]` in de footer; Privacy en Voorwaarden linken naar `#`.
- Beeld: stillevens op home, /aanpak en /hoe-het-werkt, teamportretten en hero-portret op /over (placeholders met `.ph`).
- Domein in `astro.config.mjs` (`site`) controleren.
