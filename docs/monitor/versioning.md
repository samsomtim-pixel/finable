# Versionering en freeze-regels — Monitor

## Nummering

| Onderdeel | Huidige versie |
|---|---|
| Taxonomie | kandidaat-v1.0 |
| Datamodel | kandidaat-v1.0 |
| Werkcategorieen | kandidaat-v1.0 |
| Deduplicatie | kandidaat-v1.0 |
| Regelbestand `rules.json` | 1.0-kandidaat |

Alle onderdelen dragen hetzelfde hoofdversienummer. Ze veranderen samen, niet los: een
taxonomiewijziging zonder bijbehorende regelwijziging levert een dataset op waarvan de
kolommen niet meer bij de documentatie horen.

## Wanneer welke ophoging

| Wijziging | Gevolg |
|---|---|
| Een familie toevoegen, verwijderen of hernoemen | **v2.0** en hercodering van alles wat al geclassificeerd is |
| Een inclusie- of exclusieregel die de uitkomst van bestaande records verandert | **v2.0**, zelfde gevolg |
| Een regel scherper formuleren zonder dat een bestaand record van familie wisselt | **v1.1**, met bewijs: de hele set opnieuw draaien en aantonen dat geen enkele familie wijzigt |
| Een veld toevoegen dat bestaande velden ongemoeid laat | **v1.1** |
| Tekstuele correcties | **v1.0.x**, met `geen inhoudelijke wijziging` in het commitbericht |

## Freeze

Bevriezen gebeurt pas na de QA van 50 records en de daaruit volgende herzieningsronde.
De freeze is één commit die alleen de documentatie en `rules.json` bevat; die commit-hash
wordt vanaf dat moment de referentie waar elke gepubliceerde uitkomst naar verwijst.

Elke afwijking tijdens de uitvoering komt in een afwijkingenlog met datum en reden, in
plaats van dat het document stilzwijgend wordt bijgewerkt.

## De regel die het belangrijkst is

Voorgestelde taxonomiewijzigingen worden **eerst apart genoteerd** en pas na expliciete
goedkeuring doorgevoerd. Een taxonomie die tijdens de analyse meebeweegt met de uitkomst
is geen taxonomie meer. De lijst met openstaande voorstellen staat onderaan
`taxonomie-v1.0.md` en is bewust niet verwerkt.
