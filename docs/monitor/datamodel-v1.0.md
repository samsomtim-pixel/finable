# Datamodel v1.0 (kandidaat)

Eén regel per vacature-record, per laag. Kolomvolgorde is vast.

## De NA-conventie

Lege cellen bestaan niet. Elk veld is altijd gevuld met een van deze waarden:

| Waarde | Betekenis |
|---|---|
| een echte waarde | Stond in de bron en is genormaliseerd |
| `NA` | Stond **niet** in de bron |
| `UNRESOLVED` | Stond er wel, maar was niet betrouwbaar om te zetten naar het schema |

Het verschil tussen `NA` en `UNRESOLVED` is het verschil tussen "de werkgever vermeldt geen
salaris" en "er staat iets over salaris dat we niet kunnen lezen". Beide zijn informatie;
een lege cel is dat niet. `UNRESOLVED` zonder toelichting in `notes` is een fout.

## Velden

| Veld | Type | Toegestane waarden | Laag | Toelichting |
|---|---|---|---|---|
| `vacancy_id` | string | `NVB-B001-0001` | normalized | Batchcode plus volgnummer. Nooit hergebruikt, nooit hernummerd |
| `source` | enum | `nvb` · `indeed` · `other` | raw | |
| `source_vacancy_id` | string | vrij, of `NA` | raw | Het id dat de bron zelf gebruikt |
| `source_url` | string | volledige URL | raw | Onbewerkt bewaren; de genormaliseerde vorm staat in de dedupsleutel |
| `date_collected` | date | JJJJ-MM-DD | raw | Verplicht, nooit `NA` |
| `date_posted` | date | JJJJ-MM-DD of `NA` | raw | Toont de bron alleen "3 dagen geleden", dan omrekenen vanaf `date_collected` en dat in `notes` zetten |
| `employer` | string | naam, of `NA` | normalized | Bij een anonieme bureauplaatsing `NA`, niet de bureaunaam |
| `intermediary` | string | naam, of `NA` | normalized | Het bureau dat plaatst |
| `direct_employer` | bool | `true` · `false` · `NA` | normalized | `true` als de werkgever zelf plaatst; `NA` als onbepaalbaar |
| `title_original` | string | onbewerkt | raw | **Altijd bewaren.** Wordt nooit overschreven |
| `title_normalized` | string | kleine letters, ruis verwijderd | normalized | Zie `classify.py` |
| `function_family` | enum | de veertien uit de taxonomie | normalized | |
| `seniority` | enum | `trainee` · `assistant` · `junior` · `medior` · `senior` · `lead` · `head` · `unknown` | normalized | Afgeleid uit de titel, niet uit de tekst |
| `location` | string | plaats of regio, of `NA` | normalized | Letterlijk zoals vermeld; niet omzetten naar provincie |
| `salary_min` | number | getal, `NA` of `UNRESOLVED` | normalized | In euro, zonder opmaak |
| `salary_max` | number | idem | normalized | Bij één bedrag: min en max gelijk |
| `salary_period` | enum | `month` · `year` · `hour` · `NA` | normalized | Zonder periode is een bedrag betekenisloos |
| `hours_min` | number | getal, of `NA` | normalized | Uren per week |
| `hours_max` | number | idem | normalized | Bij "40 uur": min en max gelijk |
| `education_level` | enum | `mbo` · `hbo` · `wo` · `hbo_wo` · `NA` | normalized | Alleen als expliciet vermeld |
| `employment_type` | enum | `vast` · `tijdelijk` · `interim` · `zzp` · `uitzend` · `NA` | normalized | |
| `language` | enum | `nl` · `en` · `mixed` | normalized | Taal van de advertentie |
| `duplicate_group` | string | groeps-id, of `NA` | analysis | Zie deduplicatie |
| `include_monitor` | bool | `true` · `false` | analysis | Telt dit record mee in de analyse |
| `exclusion_reason` | string | vrije tekst, of `NA` | analysis | Verplicht als `include_monitor = false` |
| `classification_confidence` | enum | `high` · `medium` · `low` | normalized | |
| `notes` | string | vrije tekst, of `NA` | alle | Alles wat een latere lezer nodig heeft |

## Velden die het gereedschap er zelf bij zet

| Veld | Waarom |
|---|---|
| `rule_id` | Welke regel uit `rules.json` heeft geraakt. Zonder dit is een classificatie niet te reconstrueren |
| `review_flag` | `true` als menselijke beoordeling nodig is |
| `review_note` | Waarom |

`rule_id` is het verschil tussen een dataset die je kunt verdedigen en een dataset die je
moet geloven.

## Wat níét in het schema zit

**De volledige vacaturetekst.** Die staat in de raw-laag buiten de repository, als los
tekstbestand per record. Reden: auteursrecht bij de plaatser, en een publieke repository is
geen plek voor andermans advertentieteksten.

**Contactgegevens van recruiters.** Naam, e-mail en telefoon worden bij vastlegging
verwijderd. Ze zijn voor de analyse irrelevant en het bewaren van persoonsgegevens zonder
noodzaak is onder de AVG niet te verdedigen. Werkgeversnaam is een bedrijfsgegeven en blijft.
