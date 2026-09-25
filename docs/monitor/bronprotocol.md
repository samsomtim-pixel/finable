# Bronprotocol

## Batchnummering

`<BRON>-B<nnn>`, bijvoorbeeld `NVB-B001`. Eén batch is één zoekopdracht op één bron in één
afgebakende periode. Batches worden nooit samengevoegd in de raw-laag; combineren gebeurt
pas in de analysislaag, waar de batchherkomst een kolom is.

Per batch wordt vastgelegd: bron · letterlijke zoekopdracht · filters · sortering ·
verzamelperiode · datum van uitvoering · bruto aantal treffers zoals de bron het zelf
rapporteert · aantal daadwerkelijk vastgelegde records.

## NVB-B001

| | |
|---|---|
| Bron | Nationale Vacaturebank |
| Zoekopdracht | `"financial controller"` |
| Bruto treffers volgens de bron | 1.031 |
| Status | Handmatig verzameld, nog niet aangeleverd voor verwerking |

**Die 1.031 is geen aantal relevante vacatures.** Het is het aantal treffers van een brede
match. De handmatige resultaten laten zien dat de zoekmachine ook business controllers,
finance managers, financiële administratie en functies buiten finance teruggeeft. Het getal
mag nergens worden gepresenteerd als marktomvang, en ook niet als noemer van een percentage.
Wat het wél is: het startpunt waar de filtering op wordt getest.

## De drie lagen

```
raw/         onbewerkte vastlegging, nooit gewijzigd
  <batch>/records.csv        velden uit intake-template.csv
  <batch>/texts/<id>.txt     volledige vacaturetekst, indien vastgelegd
  <batch>/batch.md           zoekopdracht, filters, tellingen, datum

normalized/  schema v1.0 toegepast
  <batch>/normalized.csv     uitvoer van classify.py

analysis/    afgeleid, over batches heen
  dataset.csv                deduplicatie, include-vlaggen, werkcategorieën
  deduplicatie_log.csv
  aggregates/                alleen geaggregeerde tabellen
```

Bewerkingen lopen altijd één kant op: raw → normalized → analysis. Een correctie op een
record gebeurt in de laag waar hij thuishoort, nooit door de raw-laag aan te passen. Blijkt
de vastlegging zelf fout, dan komt er een nieuw record met een verwijzing; het oude blijft
staan.

## Wat waar mag staan

| | Publieke repository | Afgeschermde opslag |
|---|---|---|
| Documentatie, `rules.json`, `classify.py` | ja | — |
| `intake-template.csv` met verzonnen voorbeelden | ja | — |
| Ruwe records, volledige vacatureteksten | **nee** | ja |
| Genormaliseerde en analysebestanden | **nee** | ja |
| Geaggregeerde tabellen bij een publicatie | ja, na beoordeling | ja |

Vacatureteksten zijn auteursrechtelijk beschermd door de plaatser. Een publieke repository
is daar geen plek voor, ongeacht de onderzoeksbedoeling.

## Verzamelwijze

Handmatig, via publiek toegankelijke zoekresultaatpagina's. Geen geautomatiseerd scrapen,
geen omzeilen van inlogmuren, geen betaalde recruiter-interfaces. Dit is dezelfde regel als
in het FC-onderzoek en hij geldt ook hier.

Bij vastlegging worden contactgegevens van recruiters verwijderd: naam, e-mailadres,
telefoonnummer. Werkgeversnaam blijft, dat is een bedrijfsgegeven.
