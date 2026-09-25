# Pre-flight — in te vullen vóór het venster opengaat

**Status:** leeg formulier, uit te voeren door een mens in een gewone browser
**Hoort bij:** `vacatureonderzoek-methode.md` §3 en §18
**Tijdsbeslag:** ongeveer 15 minuten

Doel: de zoekopdrachten die in het protocol staan één keer echt uitvoeren, de werkende
URL vastleggen, en tellen hoeveel treffers er zijn. **Niets opslaan, geen vacatureteksten
lezen, niets coderen.** Alleen de velden hieronder invullen.

Voer dit uit op één moment, op één dag, met één browser. Noteer die datum: de telling is
alleen te interpreteren met het moment erbij.

---

## Uitvoering

**Datum en tijd van uitvoering:** ______________________
**Browser en apparaat:** ______________________
**Ingelogd op de betreffende site?** ja / nee  *(zou nee moeten zijn — zie §5 van het protocol)*

---

## Bron A — Indeed

Startpunt, plakken in de adresbalk:

```
https://nl.indeed.com/jobs?q=%22financial+controller%22&l=Nederland&fromage=7&sort=date
```

| Vast te leggen | Antwoord |
|---|---|
| Werkt deze URL zoals bedoeld? | ja / nee |
| Zo nee: de URL die na correctie in de adresbalk staat | |
| Wordt de zoekterm met aanhalingstekens overgenomen in het zoekveld? | ja / nee |
| Locatiefilter zoals getoond op de pagina | |
| Datumfilter zoals getoond ("Laatste 7 dagen" of vergelijkbaar) | |
| Sorteervolgorde zoals getoond ("Datum" of "Relevantie") | |
| Overige filters die vanzelf aanstaan | |
| **Bruto aantal treffers zoals de pagina het zelf noemt** | |
| Letterlijke tekst van die telling | bv. "1.234 vacatures" |
| Staat er "1.000+" of een andere afgeronde weergave? | ja / nee |
| Aantal treffers op de eerste resultatenpagina | |
| Hoeveel daarvan dragen een label "Gesponsord" | |
| Staat bij elke treffer een plaatsingsdatum of "x dagen geleden"? | ja / nee / bij sommige |
| Is de volledige vacaturetekst zichtbaar zonder door te klikken naar de werkgever? | altijd / meestal / zelden |
| Kwam er een Cloudflare-controle of CAPTCHA? | ja / nee |
| Zo ja: hoe vaak tijdens deze sessie | |

**Schatting exacte titels.** Tel op de eerste twee resultatenpagina's hoeveel titels
letterlijk *financial controller* bevatten, en hoeveel niet (bv. business controller,
assistent-controller, finance manager).

| | Aantal |
|---|---|
| Titels mét "financial controller" | |
| Titels zonder | |
| Totaal bekeken | |

---

## Bron B — Nationale Vacaturebank

Ga naar `https://www.nationalevacaturebank.nl`, typ `"financial controller"` mét
aanhalingstekens in het zoekveld, laat de locatie op Nederland of leeg, zet het
datumfilter op maximaal 7 dagen en sorteer op datum.

| Vast te leggen | Antwoord |
|---|---|
| **De URL in de adresbalk na het instellen van alle filters** | |
| Neemt het zoekveld de aanhalingstekens over? | ja / nee |
| Bestaat er een filter op plaatsingsdatum? Zo ja, welke opties | |
| Bestaat er een sortering op datum? Hoe heet die precies | |
| Overige filters die vanzelf aanstaan | |
| **Bruto aantal treffers zoals de pagina het zelf noemt** | |
| Letterlijke tekst van die telling | |
| Aantal treffers op de eerste resultatenpagina | |
| Hoeveel daarvan zijn als advertentie of uitgelicht gemarkeerd | |
| Staat bij elke treffer een plaatsingsdatum? | ja / nee / bij sommige |
| Is de volledige vacaturetekst zichtbaar op de vacaturepagina zelf? | ja / nee / verwijst door |
| Vorm van de vacature-URL | bv. `/vacature/12345678/financial-controller` |
| Was inloggen ergens nodig? | ja / nee |

**Schatting exacte titels.** Zelfde telling als bij Indeed, eerste twee pagina's.

| | Aantal |
|---|---|
| Titels mét "financial controller" | |
| Titels zonder | |
| Totaal bekeken | |

---

## Uitvoerbaarheid van de verzamelmethode

| Vraag | Antwoord |
|---|---|
| Kun je de volledige vacaturetekst selecteren en als platte tekst plakken? | ja / nee / lastig |
| Hoe lang duurde het om één vacature volledig vast te leggen (tekst + velden)? | ____ minuten |
| Is het codeerdeel (functieomschrijving, taken, eisen) goed te scheiden van bedrijfsverhaal en arbeidsvoorwaarden? | ja / nee / wisselend |
| Liep je tegen iets aan dat het protocol niet voorziet? | |

Bij 2 minuten per vacature kost 120 items circa 4 uur verzamelen. Bij 5 minuten circa
10 uur. Dit cijfer bepaalt mede het urenbudget dat nog openstaat als beslispunt.

---

## Uitkomst

**Som van de exacte titels over beide bronnen, in 7 dagen:** ______

| Uitkomst | Betekenis |
|---|---|
| 40 of meer | 120 in veertien dagen is haalbaar. Venster 5-18 oktober vastleggen |
| 20 tot 39 | 120 is krap. Kies vooraf uit de vier opties in §5 van het bronkeuzerapport |
| Minder dan 20 | 120 gaat niet lukken. Kies vooraf een van de vier opties, of wijk uit naar het novembervenster |

**Besluit:** ______________________
**Genomen door en op:** ______________________

Na het invullen gaan de werkende URL's en filters letterlijk naar §3 van het
methodedocument. Pas daarna begint de pilot.
