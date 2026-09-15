# Finable — analytics tracking

Meetplan en implementatie van de analytics-laag. Eén contract tussen de website en GTM.

**Principe:** elk event beantwoordt een beslissing. Geen event zonder businessdoel, geen twee events voor één handeling.

**Architectuur:**

| Bestand | Rol |
|---|---|
| `src/scripts/analytics.ts` | `trackEvent` / `trackOnce`, PII-filter, attributie, consent uitlezen |
| `src/scripts/site-analytics.ts` | Site-brede events. Eén keer ingeladen via `Layout.astro` |
| `src/scripts/indicatie-form.ts` | Indicatie-funnel, gedeeld door `/indicatie` en `/en/estimate` |
| `src/pages/gesprek.astro`, `src/pages/en/book-a-call.astro` | Calendly: consent, UTM-doorgifte, `book_call_complete` |
| `api/_lib/indicatie-mail.js` | Attributie in de leadmail |

De website schrijft uitsluitend naar `window.dataLayer`. Er staat geen GA4-, HubSpot- of advertentiecode in de repo; alles loopt via GTM-container **GTM-MNR75QQ7**.

---

## De funnel

```
traffic source/campaign   → GA4 automatisch + sessionStorage voor de lead
  → landing page          → page_view (Enhanced Measurement)
  → engagement            → scroll_50, case_view
  → CTA                   → cta_click / book_call_click / case_cta_click
  → indicatie gestart     → form_view → indication_start
  → formulierstappen      → indication_step_complete / indication_back / indication_validation_error
  → indicatie succesvol   → indication_submit          ← KEY EVENT
  → gesprek geklikt       → book_call_click
  → gesprek geboekt       → book_call_complete         ← KEY EVENT
```

---

## Eventtabel

| Event | Trigger | Parameters | GA4 | Key Event | Consent | Locatie | Businessdoel | Testprocedure |
|---|---|---|---|---|---|---|---|---|
| `form_view` | Indicatieformulier komt in beeld (IntersectionObserver, 1×/pageview) | `form_name`, `language`, `page_path` | ja | nee | analytics | `site-analytics.ts` | Noemer onder `indication_start`: hoeveel mensen zien het formulier en beginnen niet? | Open `/indicatie`, check 1× in de dataLayer |
| `indication_start` | Eerste echte interactie met het formulier (input, change of tegelklik), 1×/pageview | `form_name`, `locale`, `page_path` | ja | **nee** (secundair) | analytics | `indicatie-form.ts` | Startpercentage per bron/campagne | Laad de pagina: niets. Klik een tegel: 1× |
| `indication_step_complete` | Geldige stap afgerond (`Volgende stap`, en stap 3 bij succesvolle submit) | `step_number`, `step_name`, `locale` | ja | nee | analytics | `indicatie-form.ts` | Waar valt men uit: stap 1, 2 of 3? Bepaalt welke vragen sneuvelen | Vul stap 1 en klik door |
| `indication_back` | Klik op `Vorige` | `from_step`, `to_step`, `locale` | ja | nee | analytics | `indicatie-form.ts` | Twijfelsignaal: welke stap laat mensen terugbladeren? | Klik `Vorige` op stap 2 |
| `indication_validation_error` | Verplichte vraag leeg of veld ongeldig | `step_number`, `field`, `error_type` | ja | nee | analytics | `indicatie-form.ts` | Welk veld kost conversie? Bepaalt of een vraag optioneel moet | Klik `Volgende stap` zonder iets in te vullen |
| `indication_submit` | **Uitsluitend** na `ok:true` van `/api/indicatie`, 1×/pageview | `form_name`, `locale`, `language` | ja | **JA (primair)** | analytics | `indicatie-form.ts` | De lead zelf. Kostprijs per aanvraag, campagne-ROI | Mock een 200-response; bij 500 mag het event niet vuren |
| `cta_click` | Klik op een commerciële CTA die géén boeking of case is (nu: links naar `/indicatie` en `/en/estimate`, plus elementen met `data-cta`) | `cta_name`, `cta_location`, `page_path`, `destination` | ja | nee | analytics | `site-analytics.ts` | Welke plek op de pagina levert intentie? | Klik een indicatie-link |
| `book_call_click` | Klik op een link naar `/gesprek` of `/en/book-a-call` | `cta_location`, `page_path`, `language` | ja | **nee** (secundair) | analytics | `site-analytics.ts` | Intentie vóór de kalender. Verschil met `book_call_complete` = uitval in Calendly | Klik de header-CTA |
| `book_call_complete` | Calendly `calendly.event_scheduled`, origin-gecontroleerd, 1×/pageview | `booking_provider`, `booking_type`, `language`, `page_path` | ja | **JA (primair)** | analytics | `gesprek.astro`, `en/book-a-call.astro` | Het daadwerkelijk geboekte gesprek | Simuleer een `message` van `https://calendly.com` |
| `case_view` | Bezoek aan `/cases/*` of `/en/cases/*`, 1×/pageview | `case_name`, `language` | ja | nee | analytics | `site-analytics.ts` | Wordt de case echt gelezen of blijft het bij de klik? | Open de casepagina |
| `case_cta_click` | Klik op een link naar een casepagina | `case_name`, `cta_location`, `page_path` | ja | nee | analytics | `site-analytics.ts` | Werkt het bewijsblok op de home? | Klik `Bekijk de case` |
| `nav_click` | Klik in de hoofdnavigatie (desktop of mobiel menu) | `nav_item`, `destination`, `page_path` | ja | nee | analytics | `site-analytics.ts` | Zijn de menulabels duidelijk? Onderbouwt de labelwijziging uit `CLAUDE.md` | Klik een menu-item |
| `language_switch` | Klik op NL·EN naar de *andere* taal | `from_language`, `to_language`, `page_path` | ja | nee | analytics | `site-analytics.ts` | Is de Engelse site het onderhoud waard? | Klik EN op een NL-pagina |
| `scroll_50` | 50% van de pagina bereikt, 1×/pageview, alleen bij pagina's >400px scrollruimte | `page_path`, `language` | ja | nee | analytics | `site-analytics.ts` | Middenstuk tussen bounce en de 90% van Enhanced Measurement | Scroll tot halverwege |

### Bewust NIET gemeten

- **`scroll_90`** — Enhanced Measurement doet dit al. Zelf bouwen levert dubbeltelling.
- **`page_view`** — native GA4.
- **Footerlinks** — geen beslissing die ervan afhangt.
- **Outbound clicks, file downloads** — Enhanced Measurement dekt dit.
- **Elke tegelselectie apart** — de antwoorden staan al in de leadmail; als event levert het alleen ruis.

### Regel tegen dubbeltelling

Eén klik levert één event. De prioriteit in `site-analytics.ts` is: taalwissel → boeking → case → navigatie → overige CTA. De eerste match wint en stopt. Een CTA naar `/gesprek` vuurt dus **alleen** `book_call_click`, nooit ook `cta_click`.

---

## Verwijderd / hernoemd

| Oud | Nieuw | Reden |
|---|---|---|
| `case_view_click` | `case_cta_click` (klik) + `case_view` (bezoek) | De oude naam beschreef een klik maar las als een paginaweergave. Twee verschillende vragen, nu twee events. |

**Actie in GA4/GTM:** `case_view_click` bestaat niet meer in de code. Bestaande GTM-tags of GA4-rapporten die erop draaien moeten worden omgezet naar `case_cta_click`. Historische data blijft onder de oude naam staan.

---

## GTM CONFIGURATION REQUIRED

### 1. dataLayer-variabelen aanmaken

Type *Data Layer Variable*, versie 2, één per parameter:

```
dlv - form_name        dlv - step_number      dlv - cta_name
dlv - locale           dlv - step_name        dlv - cta_location
dlv - language         dlv - from_step        dlv - destination
dlv - page_path        dlv - to_step          dlv - case_name
dlv - field            dlv - error_type       dlv - nav_item
dlv - booking_provider dlv - booking_type     dlv - from_language
dlv - to_language
```

### 2. Triggers

Voor elk event één trigger, type *Custom Event*, event name exact gelijk aan de eventnaam:

`form_view`, `indication_start`, `indication_step_complete`, `indication_back`, `indication_validation_error`, `indication_submit`, `cta_click`, `book_call_click`, `book_call_complete`, `case_view`, `case_cta_click`, `nav_click`, `language_switch`, `scroll_50`

### 3. GA4 Event Tags

Veertien tags, type *GA4 Event*, gekoppeld aan de bestaande GA4-configuratietag. Event Name gelijk aan de trigger, Event Parameters gevuld met de bijbehorende `dlv`-variabelen uit de eventtabel.

**Consent Settings per tag:** Additional consent required → `analytics_storage`. Zo blijven de tags in lijn met de bestaande CookieYes/Consent Mode-opzet.

### 4. Bestaande tags aanpassen

| Tag | Wat |
|---|---|
| Bestaande `book_call_click`-tag | De trigger draaide op een klik-trigger in GTM. Zet hem om naar de **Custom Event** trigger `book_call_click`, zodat de parameters `cta_location`, `page_path` en `language` uit de code meekomen en beide talen worden gedekt. Verwijder de oude klik-trigger, anders telt de klik dubbel. |
| Eventuele tag op `case_view_click` | Hernoemen naar `case_cta_click`, of verwijderen en de nieuwe tag gebruiken. |
| GA4-configuratietag | Ongewijzigd. |
| CookieYes-template | Ongewijzigd, niet aankomen. |
| HubSpot-tag | Ongewijzigd, niet aankomen. |

### 5. Custom Dimensions registreren

Nodig in GA4 (zie hieronder), maar ze moeten wél als parameter in de GTM-tags staan.

---

## GA4 CONFIGURATION REQUIRED

### Enhanced Measurement

| Optie | Stand | Reden |
|---|---|---|
| Page views | **AAN** laten | Basis. Niet vervangen. |
| Scrolls (90%) | **AAN** laten | `scroll_50` vult aan, dupliceert niet. |
| Outbound clicks | **AAN** laten | Geen eigen equivalent, geen dubbeltelling. |
| Site search | **AAN** laten (of uit) | De site heeft geen zoekfunctie; de instelling doet niets. |
| Video engagement | **AAN** laten | Geen video's; doet niets. |
| File downloads | **AAN** laten | Geen eigen equivalent. |
| **Form interactions** | **UIT** | Kritiek. GA4 vuurt anders `form_start` en `form_submit` op hetzelfde formulier waar wij `indication_start` en `indication_submit` meten. GA4's `form_submit` vuurt bovendien op de submit-handeling, niet op een bevestigde serverresponse, en telt dus ook mislukte verzendingen als conversie. |

Pad: **Admin → Data Streams → [webstream] → Enhanced Measurement → tandwiel**.

### Key Events

| Event | Markeren? |
|---|---|
| `indication_submit` | **JA** — primair |
| `book_call_complete` | **JA** — primair |
| `indication_start` | nee |
| `book_call_click` | nee |
| alle overige | nee |

Je voorkeur klopt. Reden om `indication_start` en `book_call_click` níét als Key Event te markeren: een Key Event stuurt Google Ads-biedingen en de conversiekolom in alle rapporten. Zet je intentie-events erbij, dan optimaliseert Ads naar mensen die *beginnen* in plaats van naar mensen die *afmaken*, en wordt je conversieratio betekenisloos. Ze blijven als gewoon event volledig bruikbaar in trechterrapporten.

Pad: **Admin → Events → Mark as key event**.

### Custom Dimensions

Registreer als **Event-scoped** custom dimension, anders zijn de parameters niet zichtbaar in rapporten:

| Dimension name | Parameter |
|---|---|
| Language | `language` |
| Page path | `page_path` |
| CTA location | `cta_location` |
| CTA name | `cta_name` |
| Case name | `case_name` |
| Step number | `step_number` |
| Step name | `step_name` |
| Field | `field` |
| Error type | `error_type` |
| Nav item | `nav_item` |

Pad: **Admin → Custom definitions → Create custom dimension**. GA4 staat er 50; dit zijn er 10.

### Privacy-instelling die je handmatig moet controleren

**Admin → Data Streams → [webstream] → "Door gebruikers verstrekte gegevens" / "User-provided data collection"** → zet op **uit**, tenzij je bewust Enhanced Conversions wilt inrichten mét de bijbehorende juridische grondslag en vermelding in de privacyverklaring.

Dit is een accountinstelling en niet vanuit de repo te wijzigen. De website stuurt zelf **nooit** e-mailadressen, namen of telefoonnummers naar GA4 — `trackEvent` weigert die sleutels en waarden actief — maar als deze instelling aanstaat kan GA4 zulke gegevens proberen te verzamelen uit formuliervelden op de pagina.

Controleer daarnaast: **Admin → Data Settings → Data Collection → Google signals** (staat dit aan, dan hoort het in de privacyverklaring) en **Data retention** (standaard 2 maanden; 14 maanden is gebruikelijk en verdedigbaar).

---

## Attributie

### Wat GA4 zelf doet

GA4 bepaalt source, medium, campaign, term en content zelf uit de URL en de referrer, en houdt dat vast in het `_ga`-cookie en op sessieniveau. **Voor GA4-rapportage is geen eigen UTM-opslag nodig**, en UTM-parameters meesturen in de dataLayer zou de attributie alleen maar dubbel maken. Dat doen we dus niet.

### Wat we wél zelf doen, en waarom

Voor **lead-attributie** — welke campagne leverde déze aanvraag — heeft GA4 geen antwoord dat je in de mail of het CRM terugziet. Daarvoor slaat `analytics.ts` de acquisitieparameters op:

- **Waar:** `sessionStorage`, sleutel `finable_attribution`. Geen cookie, verdwijnt met het tabblad, niet bruikbaar om iemand over sessies heen te volgen.
- **Wat:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, plus `landing_page` (pad zonder querystring), `referrer` (alleen hostname) en `first_seen`.
- **Wanneer:** bij de eerste pagina van de sessie. Een nieuwe campagne binnen dezelfde sessie vervangt het geheel, zodat source en medium niet uit twee bezoeken door elkaar lopen.
- **Waarheen:** alleen naar `/api/indicatie`, in het veld `attribution`, op het moment dat de bezoeker zelf het formulier verstuurt. Nooit naar de dataLayer, nooit naar GA4.

Dit overleeft de route landingspagina → andere pagina → `/indicatie` → verzenden.

### Backwards compatibility

`api/_lib/indicatie-mail.js` accepteert `attribution` als optioneel object. Ontbreekt het (oude client, geblokkeerde `sessionStorage`), dan is de mail identiek aan voorheen. De Resend-verzending is ongewijzigd. Getest met en zonder attributie.

---

## HubSpot — wat er nu staat en wat er later nodig is

**Nu geïmplementeerd:** als het `hubspotutk`-cookie bestaat, gaat het mee als `attribution.hubspot_utk` in de payload naar `/api/indicatie`, en komt het in de leadmail te staan. Dat cookie bestaat alleen nadat de HubSpot-tag via GTM is geladen, en dat gebeurt alleen na geldige toestemming. Geen toestemming betekent dus automatisch geen token. Er is bewust géén HubSpot CRM-integratie gebouwd.

**Later nodig voor `indicatie → HubSpot contact → oorspronkelijke campagne-attributie`:**

1. Een **HubSpot Private App** met scope `crm.objects.contacts.write`, token als `HUBSPOT_ACCESS_TOKEN` in Vercel.
2. Serverside aanroep vanuit `api/indicatie.js` naar de **HubSpot Forms API** (`https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`) in plaats van de CRM API. Dat endpoint accepteert in `context` het veld `hutk`, en **alleen via die route koppelt HubSpot de inzending aan de volledige browsegeschiedenis en de originele bron van die bezoeker**. Via de CRM API krijg je een contact zonder die attributie.
3. Een HubSpot-formulier met velden die matchen op de payload (`email`, `firstname`/`lastname` of één naamveld, `company`, `website`, `phone`, plus custom properties voor de tegelantwoorden).
4. Verzending achteraf en niet-blokkerend: faalt HubSpot, dan moet de Resend-mail en de `ok:true` naar de bezoeker gewoon doorgaan.
5. Privacyverklaring aanvullen met HubSpot als verwerker, en een verwerkersovereenkomst.
6. Toestemming: zonder `hutk` alsnog aanmaken (dan zonder browsergeschiedenis) of overslaan — dat is een juridische keuze, geen technische.

---

## Consent en privacy

### Wat er staat

CookieYes en Google Consent Mode lopen volledig via GTM. **De websitecode zet nergens consent en verandert geen tag.** `analytics.ts` *leest* alleen het `cookieyes-consent`-cookie, voor één doel: beslissen hoe de Calendly-embed geladen wordt.

### Calendly — gevonden en opgelost

De embed-URL bevatte onvoorwaardelijk `hide_gdpr_banner=1`. Dat onderdrukt Calendly's eigen toestemmingsmelding, terwijl onze CMP die toestemming niet namens Calendly geeft. Effectief werden er dus niet-essentiële cookies van een derde partij geplaatst zonder dat iemand ergens ja had gezegd.

**Nu:** `hide_gdpr_banner=1` wordt alleen gezet als CookieYes toestemming voor analytics heeft. Geen toestemming, of nog geen keuze gemaakt, betekent dat Calendly zijn eigen melding toont en zijn eigen toestemming regelt. De kalender laadt in beide gevallen direct en de boekingsflow blijft volledig werkend — bewust niet achter een klik-om-te-laden gezet, omdat dat de primaire conversie zou schaden.

Getest op NL en EN, desktop en mobiel, met toestemming gegeven en geweigerd.

### Calendly — UTM-doorgifte

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content` en `utm_term` zijn officieel ondersteunde Calendly-embedparameters en worden nu doorgegeven, zodat een boeking in Calendly zelf te herleiden is naar de campagne. `gclid` gaat niet mee: dat ondersteunt Calendly niet. Geen persoonsgegevens, geen custom hack.

### Wat er nooit gebeurt

- `trackEvent` weigert sleutels als `email`, `naam`, `telefoon`, `company_name`, `website`, `message`, en weigert elke waarde met een `@` of een reeks van zeven of meer cijfers, en elke waarde langer dan 100 tekens.
- Bij `indication_validation_error` gaan alleen de veldnaam en het fouttype mee, nooit de ingevulde waarde.
- Ingevulde formulierantwoorden gaan naar de leadmail, niet naar analytics.
- `page_path` wordt altijd zonder querystring verstuurd.

### Aandachtspunt

De attributie-opslag in `sessionStorage` vindt plaats vóór een toestemmingskeuze. Het is geen cookie en geen tracking over sessies heen, en het wordt alleen verzonden als de bezoeker zelf een formulier indient, maar het is wel het vermelden waard in de privacyverklaring onder "gegevens die we bij een aanvraag vastleggen". Wil je het strikter, dan kan `captureAttribution()` achter dezelfde consentcheck.

---

## Debuggen

Zet `?analytics_debug=1` achter een URL, of `localStorage.setItem('finable_analytics_debug','1')`. Elk event wordt dan in de console gelogd, inclusief geweigerde parameters. In productie logt de laag niets.

## Testen

De QA-scripts uit de implementatieronde staan niet in de repo (tijdelijke bestanden). Handmatig testen: open GTM Preview, doorloop de funnel en controleer per stap of het event exact één keer verschijnt. Test `indication_submit` **nooit** met een echte inzending op productie — dat levert een echte mail en straks een echte lead op. Gebruik een lokale preview met een gemockte 200-response.
