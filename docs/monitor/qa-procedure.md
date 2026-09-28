# QA-procedure — classificatie

Doel: vaststellen of de titelclassificatie betrouwbaar genoeg is om op te bouwen. Niet:
aantonen dat hij goed werkt.

## De steekproef van 50

**Trekking.** Aselect uit alle records van de batch, met een vastgelegd startgetal zodat de
trekking herhaalbaar is. Niet: de eerste vijftig, en niet de interessante gevallen.

**Aanvulling die apart wordt gerapporteerd.** Naast de 50 worden **alle** records
beoordeeld waarvan de genormaliseerde titel het woord *controller* of *control* bevat maar
die zijn uitgesloten, plus alle records met `classification_confidence = low`. Deze twee
groepen zijn precies waar de fouten zitten en mogen niet aan de loting worden overgelaten.
Ze tellen niet mee in het foutpercentage van de 50; ze worden apart gerapporteerd.

## Beoordelingsformulier

Per record, in deze volgorde zichtbaar:

`title_original` → `function_family` → `include_monitor` → `exclusion_reason` →
`classification_confidence` → `rule_id`

De beoordelaar noteert: `akkoord` · `fout` · `twijfel`, plus bij `fout` de familie die het
had moeten zijn, en bij `twijfel` waarom.

**De beoordelaar ziet de titel en het oordeel tegelijk.** Dat is een bekende zwakte — het
nodigt uit tot instemmen. Tegenmaatregel: beoordeel eerst de eerste vijftien titels zonder
de kolommen erachter, noteer je eigen familie, en vergelijk daarna. Wijken die vijftien
sterk af, dan is het hele oordeel over de resterende 35 verdacht en wordt dat gemeld.

## Wat als fout telt

| Situatie | Fout? |
|---|---|
| Verkeerde familie | Ja |
| Ingesloten terwijl het geen finance is (**false positive**) | Ja, en apart geteld |
| Uitgesloten terwijl het wel finance is (**false negative**) | Ja, en apart geteld |
| Juiste familie, verkeerde seniority | Ja, apart geteld als niveaufout |
| `other_finance` terwijl er een passende familie bestaat | Ja |
| `other_finance` terwijl er geen passende familie bestaat | Nee — dat is een taxonomiegat, geen classificatiefout |
| Lage confidence op een terecht lastig geval | Nee |

False positives wegen zwaarder dan false negatives: een vacature die ten onrechte meetelt
vervuilt elke verdeling, terwijl een gemiste vacature alleen ruis toevoegt aan de noemer.

## Drempels

| Uitkomst op de 50 | Gevolg |
|---|---|
| 0 false positives en ten hoogste 2 overige fouten | Taxonomie bruikbaar; door naar de volgende batch |
| 1-2 false positives, of 3-5 overige fouten | Eén herzieningsronde op `rules.json`, daarna opnieuw 50 nieuwe records |
| 3 of meer false positives, of meer dan 5 overige fouten | Taxonomie niet bruikbaar; terug naar het ontwerp |

Deze drempels staan vóór de eerste beoordeling vast en worden achteraf niet verschoven.

## Wat wordt gerapporteerd

Aantal ruwe records · aantal ingesloten · aantal uitgesloten met reden · verdeling over de
veertien families · aantal `low` en aantal reviewvlaggen · aantal duplicaatgroepen en
`suspected` · foutpercentage op de 50, uitgesplitst naar false positive, false negative en
niveaufout · elke concrete misclassificatie met titel erbij · de vastgestelde
taxonomiegaten.

Ook wanneer de uitkomst ongunstig is. Een taxonomie die bij de eerste test 96% haalt is
verdachter dan een die 82% haalt en laat zien waar hij faalt.

## Herziening

Voorgestelde wijzigingen worden **eerst apart genoteerd** en pas na expliciete goedkeuring
doorgevoerd. Een regel aanpassen omdat hij een record verkeerd classificeerde is legitiem;
een regel aanpassen omdat de verdeling dan mooier uitkomt, niet. Het verschil moet uit de
motivering blijken, en die motivering wordt bewaard.

Na een herziening wordt de volledige batch opnieuw geclassificeerd, niet alleen de
gecorrigeerde records — anders bevat de dataset twee generaties regels door elkaar.
