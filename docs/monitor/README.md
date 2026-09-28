# Finable Finance Vacancy Dataset v1.0 — overzicht

**Status:** kandidaat-v1.0, ontwikkelfase. Niets hiervan is gepubliceerd of bevroren.
**Datum:** 25 september 2026

## Twee onderzoeken, één dataset

| | A. Finance Vacature Monitor | B. Verdiepend onderzoek |
|---|---|---|
| Populatie | Alle relevante Nederlandse financefuncties | Eén functietitel, nu `financial controller` |
| Vraag | Hoe bouwen organisaties hun financefunctie op | Hoeveel verantwoordelijkheden komen in één functie samen |
| Codering | Titelclassificatie; inhoudelijke codering alleen op volledige tekst | Strenge codering van tien werksoorten, twee codeurs |
| Documentatie | `docs/monitor/*` | `docs/vacatureonderzoek-*.md` |
| Status | In ontwikkeling | Methode kandidaat-v1.0, glossarium v0.1 |

**De bestaande Financial Controller-methodiek en het glossarium blijven ongewijzigd.** De
Monitor komt er los naast te staan. Waar de twee elkaar raken — de werkcategorieen — staat
in `werkcategorieen-v1.0.md` een expliciete kruistabel, zodat ze niet stilzwijgend uit
elkaar kunnen lopen. Een wijziging in de FC-methodiek wordt apart voorgesteld en apart
goedgekeurd, nooit als bijvangst van Monitorwerk.

## Documenten

| Bestand | Inhoud |
|---|---|
| `taxonomie-v1.0.md` | Veertien functiefamilies met inclusie-, exclusie- en twijfelregels |
| `datamodel-v1.0.md` | Velddefinities, toegestane waarden, de `NA`-conventie |
| `werkcategorieen-v1.0.md` | Twaalf inhoudelijke werkcategorieen, systemenstructuur, kruistabel met de FC-werksoorten |
| `deduplicatie-v1.0.md` | Sleutels, beslisvolgorde, statussen |
| `bronprotocol.md` | Bronnen, batchnummering, de drie datalagen, wat wel en niet publiek mag |
| `qa-procedure.md` | De QA van 50 records, wat wordt geteld, wat een fout is |
| `versioning.md` | Versienummering en de freeze-regels |

Het gereedschap staat in `research/monitor/`.

## Wat er nu níét is

Er is **geen data**. NVB-B001 is nog niet aangeleverd, dus de verwerking en de QA van
50 records staan open. Wat wel klaar is: de taxonomie, het schema, de regels als
uitvoerbare code, en de intakespecificatie waarin de data moet worden aangeleverd.
