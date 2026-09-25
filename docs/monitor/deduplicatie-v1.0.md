# Deduplicatie v1.0 (kandidaat)

**Er wordt nooit een record verwijderd.** Duplicaten krijgen een groep en een status; de
analyse gebruikt per groep één record. Fysiek wissen maakt een beslissing onherroepelijk
en oncontroleerbaar.

## Wanneer

Na het sluiten van een batch, in één aaneengesloten ronde, **vóór** enige inhoudelijke
codering. Anders kan de uitkomst van de codering de duplicaatbeslissing beïnvloeden.

## Genormaliseerde sleutels

Voor het vergelijken worden vier velden apart genormaliseerd. De originelen blijven staan.

| Sleutel | Normalisatie |
|---|---|
| `k_employer` | kleine letters, rechtsvormen weg (bv · b.v. · nv · holding · group · nederland), leestekens weg, spaties samengevoegd |
| `k_title` | `title_normalized` uit `classify.py` |
| `k_location` | kleine letters, "regio" en "omgeving" weg, accenten weg |
| `k_url` | protocol, `www.`, querystring en anker weg; sluitende slash weg |

## Beslisvolgorde

| Regel | Situatie | Uitkomst |
|---|---|---|
| **D1** | Zelfde `source` én zelfde `source_vacancy_id` | Duplicaat, zeker |
| **D2** | Zelfde `k_url` | Duplicaat, zeker |
| **D3** | Zelfde `k_employer` + `k_title` + `k_location`, plaatsingsdata binnen 30 dagen | Duplicaat, zeker |
| **D4** | Zelfde `k_employer` + `k_title`, **andere** `k_location` | **Geen** duplicaat zonder aanvullend bewijs. Zie hieronder |
| **D5** | Anonieme bureauplaatsing die lijkt op een directe plaatsing | Alleen samenvoegen bij tekstovereenkomst; anders beide behouden, status `suspected` |
| **D6** | Zelfde vacature later opnieuw geplaatst | Eén vacature, vroegste `date_posted` |
| **D7** | Zelfde werkgever en titel, maar de tekst beschrijft aantoonbaar een andere functie | Geen duplicaat |

## D4 in detail: dezelfde vacature op meerdere locaties

Een bureau dat één opdracht op vijf steden plaatst, produceert vijf records die er als vijf
vacatures uitzien. Ze automatisch als vijf tellen blaast de markt op; ze automatisch als één
tellen gooit echte meervoudige vacatures weg.

Daarom: **standaard geen duplicaat**, met status `suspected` wanneer aan alle drie is
voldaan:

1. `intermediary` is gevuld en `employer` is `NA`;
2. `k_title` is identiek;
3. de plaatsingsdata liggen binnen zeven dagen.

Samenvoegen mag pas bij een van deze bewijzen: identieke `source_vacancy_id`,
nagenoeg identieke vacaturetekst, of één advertentie die de meerdere standplaatsen zelf
noemt. Zonder bewijs blijven het aparte records en wordt de onzekerheid gerapporteerd, niet
opgelost.

## Tekstovereenkomst

Vereist de volledige tekst; op snippets niet toepasbaar. Werkwijze, met de hand na te doen:
neem uit beide teksten de regels die een taak of eis beschrijven; twee regels heten
nagenoeg gelijk als ze identiek zijn afgezien van interpunctie, hoofdletters en maximaal
twee gewijzigde woorden; komt 80% of meer van de regels van het kortste record overeen, dan
is het één vacature.

De drempel van 80% is een keuze, geen norm. Hij ligt hier vast vóór de verzameling en wordt
in elke publicatie genoemd. Dezelfde drempel als in het FC-onderzoek, bewust.

## Statussen en velden

| Veld | Waarden |
|---|---|
| `duplicate_group` | `DG-0001`, of `NA` als het record in geen enkele groep zit |
| `duplicate_status` | `unique` · `primary` · `duplicate` · `suspected` |
| `duplicate_rule` | `D1`…`D7`, of `NA` |
| `duplicate_of` | het `vacancy_id` van het primaire record, of `NA` |

Per groep is precies één record `primary` en krijgt dat `include_monitor = true`; de rest
krijgt `false` met `exclusion_reason = duplicaat`. Records met status `suspected` blijven
allemaal `true` en worden in een gevoeligheidsanalyse weggelaten.

**Welk record wordt `primary`:** het record met de meest complete velden; bij gelijke
volledigheid de vroegste `date_posted`; daarna het laagste `vacancy_id`.

## Log

Elke beslissing komt in `deduplicatie_log.csv`, inclusief de beslissingen die géén duplicaat
opleveren. Zonder die laatste is niet na te gaan of een regel consequent is toegepast.
Kolommen: `datum` · `id_a` · `id_b` · `regel` · `besluit` · `primary_id` ·
`overeenkomst_pct` · `motivering`.
