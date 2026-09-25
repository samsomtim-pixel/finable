# Onderzoeksopzet — Finable vacatureanalyse, editie 1

**Status:** v0.1 — ontwerp, nog niet bevroren
**Vraag:** Wat vragen Nederlandse werkgevers van één financial controller?
**Datum ontwerp:** 25 september 2026

Dit document legt de methode vast *vóór* dataverzameling. Dat is het hele punt: zonder
vooraf vastgelegd coderingsschema wordt achteraf bepaald wat "meerdere rollen in één
vacature" betekent, en dan is de uitkomst niet meer dan een bevestiging van wat we al
vonden.

De opzet wordt in twee stappen definitief:

1. **Pilot** — 20 vacatures, gecodeerd volgens dit document. Doel is het schema testen,
   niet het beantwoorden van de onderzoeksvraag.
2. **Eén herziening** — op basis van de pilot mag het schema één keer worden aangepast.
   Daarna wordt het bevroren als v1.0. Elke wijziging ná het bevriezen verplicht tot
   hercodering van alles wat al gecodeerd is.

---

## 1. Onderzoeksvragen

Neutraal geformuleerd. Geen hypothesen, geen verwachte richting.

**Hoofdvraag**
Welke soorten financewerk worden in Nederlandse vacatureteksten voor een financial
controller bij één functie ondergebracht?

**Deelvragen**

1. Hoeveel van de tien onderscheiden werksoorten komen per vacature voor?
2. Welke werksoorten komen het vaakst voor, en welke zelden?
3. Welke werksoorten komen samen voor, en welke combinaties zijn zeldzaam?
4. Verschilt de breedte tussen vacatures die door de werkgever zelf zijn geplaatst en
   vacatures die via een bureau zijn geplaatst?

**Wat zou onze eigen stelling tegenspreken**

Finable stelt publiekelijk dat bedrijven werk uit verschillende finance-lagen bij één
persoon proberen neer te leggen. De data spreekt dat tegen wanneer de mediaan van het
aantal aanwezige werksoorten laag ligt (drie of minder), of wanneer de combinatie van
uitvoerend werk met analyse- en adviesvragen in een minderheid van de vacatures
voorkomt. Dat resultaat wordt gepubliceerd zoals het is. Deze grenzen staan hier vóór
de verzameling en mogen achteraf niet worden verschoven.

---

## 2. Populatie

**Definitie.** Alle vacatures die in de meetperiode publiek toegankelijk zijn op de
geselecteerde bronnen, betrekking hebben op een functie in Nederland, en waarvan de
functietitel de woordcombinatie *financial controller* bevat (hoofdletterongevoelig,
ook als onderdeel van een langere titel zoals "Financial Controller a.i." of "Medior
Financial Controller").

**Waarom deze afbakening.** Eén functietitel houdt de vergelijking zuiver. "Business
controller" is per definitie adviserender en "credit controller" is per definitie
smaller; die meenemen zou het breedtecijfer vertroebelen met een verschil dat al in de
titel zit.

**Variantenlogboek.** Afgewezen titels worden wél geregistreerd (titel, bron, datum,
reden van afwijzing). Dat logboek kost niets, maakt de steekproefselectie
controleerbaar, en levert de steekproefkaders voor een eventuele tweede editie.

**Niet gefilterd op bedrijfsgrootte.** Finable's segment is 10-50 medewerkers, maar
vacatureteksten vermelden de bedrijfsgrootte zelden betrouwbaar. Filteren op iets wat
niet vaststaat introduceert meer vertekening dan het wegneemt. Grootte wordt
geregistreerd waar die *expliciet in de tekst staat* en verder als ontbrekend behandeld.

---

## 3. Bronnen en meetperiode

**Meetperiode.** Eén aaneengesloten venster van veertien kalenderdagen. Begin- en
einddatum worden vóór aanvang vastgelegd en niet verlengd om de steekproef vol te
krijgen. Komt het aantal niet rond, dan wordt dat gerapporteerd, niet gerepareerd.

**Bronnen.** Twee bronnen, om afhankelijkheid van één platform zichtbaar te maken:

- **Bron A** — een landelijke vacature-aggregator.
- **Bron B** — een generalistische vacaturebank die niet volledig uit A put.

De bron wordt per vacature geregistreerd en is een analysevariabele, geen
achtergrondgegeven. Verschilt de uitkomst sterk per bron, dan is dat een bevinding die
in de publicatie hoort.

**Verzamelwijze.** Handmatig, via publiek toegankelijke zoekresultaatpagina's. Geen
geautomatiseerd scrapen, geen omzeilen van inlogmuren, geen gebruik van betaalde
recruiter-interfaces. Bij 120 items is handmatig werk haalbaar en het voorkomt discussie
over gebruiksvoorwaarden. Deze keuze wordt in de publicatie vermeld.

**Vaste zoekopdracht.** Per bron één zoekstring en één filterset, letterlijk genoteerd
en bij een volgende editie ongewijzigd herhaald.

---

## 4. Steekproef

**Omvang.** 20 voor de pilot, daarna circa 100 aanvullend, streefwaarde 120 totaal.
Dit is geen aselecte steekproef uit een bekend register en levert geen
foutmarge-uitspraken op. Dat wordt expliciet zo gerapporteerd.

**Trekking.** Resultaten worden gesorteerd op plaatsingsdatum, nieuwste eerst. Vervolgens
systematisch trekken: elke *k*-de treffer, waarbij *k* = (aantal treffers ÷ doelaantal),
naar beneden afgerond, minimaal 1. Sorteren op relevantie zou gesponsorde plaatsingen
oververtegenwoordigen; sorteren op datum met een vaste stap niet.

**Vervanging.** Valt een getrokken vacature af op de inclusiecriteria, dan wordt de
eerstvolgende treffer genomen. Elke vervanging wordt geregistreerd met reden.

**Pilotselectie.** De 20 pilotvacatures worden op dezelfde manier getrokken en tellen
mee in de uiteindelijke 120, mits het schema ná de herziening ongewijzigd op ze kan
worden toegepast. Kan dat niet, dan worden ze hergecodeerd of vervangen — de keuze
wordt vastgelegd.

---

## 5. Inclusie- en exclusiecriteria

**Inclusie — alle vier vereist**

1. Functietitel bevat *financial controller*.
2. Standplaats in Nederland, of expliciet remote binnen Nederland.
3. De tekst bevat een herkenbare beschrijving van taken of verantwoordelijkheden.
4. De vacature is in de meetperiode publiek toegankelijk zonder inloggen.

**Exclusie**

1. Stages, afstudeeropdrachten, traineeships en werkstudentfuncties.
2. Open sollicitaties en talentpools zonder concrete functie.
3. Vacatures die uitsluitend naar een pdf of externe pagina verwijzen die niet
   toegankelijk is.
4. Teksten korter dan 75 woorden in het te coderen deel (zie §6): te weinig materiaal om
   afwezigheid van een werksoort te onderscheiden van beknoptheid.
5. Vacatures buiten de meetperiode geplaatst, wanneer de plaatsingsdatum zichtbaar is.
6. Duplicaten volgens §8.

Niet uitgesloten: interim- en tijdelijke functies, parttimefuncties, en vacatures via
bureaus. Die zijn onderdeel van de markt. Ze worden gecodeerd als variabele, niet
weggelaten.

---

## 6. Codeereenheid

Gecodeerd wordt **het deel van de advertentie dat de functie beschrijft**: de
functieomschrijving, de taken- of verantwoordelijkhedenlijst, en de functie-eisen.

**Niet gecodeerd:** bedrijfsomschrijving, arbeidsvoorwaarden, salarisblok,
sollicitatieprocedure, gelijkekansenverklaring, bureau-eigen boilerplate, en teksten over
wat het *team* of het *bedrijf* doet zonder dat de functie eraan wordt gekoppeld.

Dit onderscheid is de belangrijkste bron van codeerfouten. "Wij werken met AFAS" in een
bedrijfsomschrijving is geen functie-eis; "je werkt dagelijks in AFAS" wel.

Het te coderen deel wordt per vacature apart opgeslagen, zodat een tweede codeur exact
dezelfde tekst voor zich heeft.

---

## 7. Coderingsschema

Tien werksoorten. Per werksoort wordt **aanwezig / afwezig** gecodeerd — geen telling van
taken, want tellen hangt af van hoe de schrijver zijn opsomming heeft opgeknipt en is
daarmee niet reproduceerbaar.

**Algemene beslisregels**

- Een werksoort is aanwezig als de tekst beschrijft dat de functiehouder dat werk doet,
  eraan bijdraagt of er verantwoordelijk voor is.
- Verwijzingen naar wat het team of de organisatie doet tellen niet, tenzij de functie er
  expliciet aan wordt gekoppeld.
- Twijfel valt uit op **afwezig**. Dat maakt de uitkomst conservatief: liever een te smal
  beeld dan een opgeblazen beeld dat onze eigen stelling toevallig bevestigt.
- Eén duidelijke vermelding is genoeg; herhaling verandert niets.
- Wordt een werksoort expliciet als wens gemarkeerd ("is een pré", "wenselijk"), dan
  wordt naast `aanwezig` ook `pre = ja` vastgelegd. Hoofdanalyses draaien op `aanwezig`;
  een gevoeligheidsanalyse zonder de pré-gevallen wordt apart gerapporteerd.

| # | Werksoort | Aanwezig bij onder meer | Telt niet als |
|---|---|---|---|
| 1 | Administratie | Grootboek, crediteuren/debiteuren, inkoop- en verkoopfacturen, bankboekingen, dagelijkse verwerking | Alleen "je werkt met cijfers"; verantwoordelijkheid voor een team dat dit doet zonder eigen uitvoering |
| 2 | Afsluiting | Maand-, kwartaal- of jaarafsluiting, reconciliaties, aansluitingen, consolidatie, voorzieningen, onderhanden werk | Alleen het noemen van "de maandcijfers" zonder afsluitwerk |
| 3 | Control | Analyse van cijfers, budget versus realisatie, marge- en kostenanalyse, variantieverklaring | Het woord "controlling" in de functietitel of bedrijfsomschrijving |
| 4 | Reporting | Managementrapportages opstellen, KPI-rapportage, periodieke rapportage aan directie of moeder | Rapporteren *aan* een leidinggevende in hiërarchische zin |
| 5 | Forecasting | Budgettering, forecast, cashflowprognose, meerjarenplanning, scenario's | Historische analyse zonder vooruitkijkend element |
| 6 | Compliance | Btw- en andere aangiften, jaarrekening, auditbegeleiding, wet- en regelgeving, fiscale afstemming | Algemene verwijzingen naar "kwaliteit" of "zorgvuldigheid" |
| 7 | Business partnering | Management of directie adviseren, sparringpartner zijn, meedenken over beslissingen, andere afdelingen ondersteunen bij financiële vragen | Alleen "communicatief vaardig" of "je schakelt met collega's" |
| 8 | Processen | Procesverbetering, interne beheersing, AO/IC, optimaliseren van de finance-cyclus, automatiseringsprojecten | Alleen "je werkt gestructureerd" |
| 9 | Systemen | Genoemd ERP- of boekhoudpakket (Exact, AFAS, NetSuite, SAP, Twinfield en vergelijkbaar), BI-tooling, gevorderd Excel als expliciete eis | Kantoorsoftware zonder financiële functie; pakketten die alleen in de bedrijfsomschrijving staan |
| 10 | Team en eigenaarschap | Aansturen of begeleiden van medewerkers, vaktechnisch aanspreekpunt, eindverantwoordelijkheid voor een finance-onderdeel | "Zelfstandig werken"; verantwoordelijkheid voor je eigen takenpakket |

**Kenmerken die per vacature worden vastgelegd zonder oordeel**

`bron`, `bron_type` (werkgever zelf / bureau / onbekend), `titel_letterlijk`,
`seniority_in_titel` (junior / medior / senior / niet vermeld), `dienstverband`
(vast / interim / niet vermeld), `uren` (fulltime / parttime / bandbreedte / niet
vermeld), `bedrijfsgrootte_indien_vermeld`, `sector_indien_vermeld`,
`salaris_indien_vermeld`, `taal_advertentie`, `woordenaantal_codeerdeel`.

Salaris wordt geregistreerd omdat het gratis meekomt, maar het is **geen onderzoeksvraag**
van deze editie. Het markt­salarisbeeld is al bezet door partijen met veel betere
steekproeven, en Finable publiceert geen bedragen die als prijsanker kunnen gaan werken.

---

## 8. Bronregistratie en deduplicatie

**Per vacature vastleggen**

| Veld | Toelichting |
|---|---|
| `id` | Doorlopend nummer, toegekend bij opname |
| `url` | Volledige bron-URL |
| `datum_vastlegging` | Datum waarop de tekst is opgehaald |
| `datum_plaatsing` | Zoals getoond op de bron; leeg als niet zichtbaar |
| `werkgever` | Naam, of "anoniem via bureau" |
| `bureau` | Naam van het bemiddelende bureau, indien van toepassing |
| `titel_letterlijk` | Onbewerkt overgenomen |
| `tekst_codeerdeel` | Het deel uit §6, opgeslagen als platte tekst |
| `tekst_volledig` | De hele advertentie, voor controle achteraf |
| `vervangt_id` | Gevuld wanneer dit item een afgevallen trekking vervangt |

Contactgegevens van recruiters — naam, e-mail, telefoonnummer — worden **bij opname
verwijderd**. Ze zijn voor de analyse irrelevant en het opslaan van persoonsgegevens
zonder noodzaak is onder de AVG niet te verdedigen. De opslag bevat uitsluitend
functietekst en werkgeversgegevens.

**Deduplicatieregels, in volgorde**

1. **Zelfde URL** → duplicaat.
2. **Zelfde werkgever + zelfde functietitel, plaatsingsdata binnen 30 dagen** →
   duplicaat. Behoud het exemplaar met de langste codeertekst; noteer beide URL's.
3. **Vrijwel identieke tekst bij verschillende bronnen** → duplicaat. Werkwijze: vergelijk
   het codeerdeel; komen de taakregels nagenoeg woordelijk overeen, dan is het één
   vacature op twee plaatsen.
4. **Zelfde werkgever, zelfde titel, aantoonbaar andere standplaats** → twee vacatures.
5. **Anonieme bureauvacature die op een directe vacature lijkt** → alleen samenvoegen bij
   woordelijke overeenkomst in het codeerdeel. Bij twijfel beide behouden en beide
   markeren met `mogelijk_duplicaat = ja`. Er volgt een gevoeligheidsanalyse waarin deze
   gevallen worden weggelaten.
6. **Herplaatsing van dezelfde vacature later in het venster** → één vacature, vroegste
   datum aanhouden.

Elk verwijderd duplicaat blijft in het bestand staan met `status = duplicaat` en een
verwijzing naar het behouden `id`. Niets wordt weggegooid.

---

## 9. Betrouwbaarheid van de codering

Dit is het zwakste punt van elke inhoudsanalyse met één codeur, en dus waar de opzet het
strengst moet zijn.

**Voorkeur:** een tweede codeur codeert onafhankelijk dezelfde 20 pilotvacatures.

**Minimum wanneer er één codeur is:** dezelfde 20 vacatures worden twee keer gecodeerd
met minimaal zeven dagen ertussen, zonder de eerste codering erbij.

**Wat wordt berekend en gepubliceerd:** per werksoort het percentage overeenstemming én
Cohen's kappa. Beide worden in de publicatie opgenomen, ook de lage.

**Beslisregel bij de herziening**

- Kappa ≥ 0,70 → regel blijft ongewijzigd.
- Kappa 0,50-0,69 → de beslisregel voor die werksoort wordt herschreven en scherper
  afgebakend. Dit is de enige toegestane herziening.
- Kappa < 0,50 na de herziening → de werksoort **vervalt** en wordt niet gepubliceerd.
  Een onbetrouwbaar gemeten dimensie publiceren is schadelijker dan er negen hebben.

Na de herziening wordt het schema bevroren als v1.0, met datum. De 100 resterende
vacatures worden uitsluitend met v1.0 gecodeerd.

---

## 10. Vooraf vastgelegde analyses

Alles hieronder staat vast vóór de verzameling. Analyses die later opkomen mogen, maar
worden in de publicatie als **verkennend** gemarkeerd en niet als bevinding gepresenteerd.

**Primair**

1. Verdeling van het aantal aanwezige werksoorten per vacature: volledige verdeling van 0
   tot 10, plus mediaan en interkwartielafstand. Geen gemiddelde als kerngetal — de
   verdeling is waarschijnlijk scheef.

**Secundair**

2. Percentage vacatures waarin elke werksoort voorkomt, met aantallen erbij.
3. Co-occurrence-matrix: hoe vaak elk paar werksoorten samen voorkomt.
4. Vier vooraf benoemde combinaties, elk als percentage:
   - Administratie én Control
   - Afsluiting én Forecasting
   - Administratie én Control én Business partnering
   - Systemen naast minimaal één van Administratie, Afsluiting of Compliance
5. Verdeling van het aantal werksoorten, uitgesplitst naar `bron_type` (werkgever zelf
   versus bureau).
6. Zelfde verdeling uitgesplitst naar `seniority_in_titel`.

**Gevoeligheidsanalyses**

7. Alles opnieuw met `pre = ja` als afwezig.
8. Alles opnieuw zonder de gevallen met `mogelijk_duplicaat = ja`.
9. Alles opnieuw per bron afzonderlijk.

**Expliciet niet gedaan**

Geen significantietoetsen. Dit is geen aselecte steekproef uit een bekend register; een
p-waarde zou een precisie suggereren die het ontwerp niet waarmaakt. Geen uitspraken
over ontwikkeling in de tijd — er is één meetmoment en dus geen trend. Geen causale
uitspraken.

---

## 11. Methodologische beperkingen

Deze horen onverkort in de publicatie, niet in een voetnoot.

1. **Een vacaturetekst is geen functie.** Het is een wensenlijst, geschreven om te werven.
   Wat er staat is wat een werkgever vraagt, niet wat iemand uiteindelijk doet.
2. **Bureauteksten zijn herschreven.** Bureaus formuleren breder of juist generieker dan
   de werkgever zelf. Daarom wordt `bron_type` als analysevariabele meegenomen.
3. **Geen steekproefkader.** Er bestaat geen register van Nederlandse vacatures. Twee
   bronnen dekken de markt niet volledig en zijn niet aselect.
4. **Lengtebias.** Langere advertenties bevatten per definitie meer aanknopingspunten.
   Daarom wordt het woordenaantal vastgelegd en de samenhang met de breedte gerapporteerd.
5. **Bedrijfsgrootte grotendeels onbekend.** De uitkomst geldt dus niet specifiek voor
   Finable's segment van 10-50 medewerkers, en die koppeling mag niet worden gelegd.
6. **Eén titel.** De uitkomst gaat over de financial controller, niet over "finance" of
   "de controller" in het algemeen.
7. **Eén venster van veertien dagen.** Seizoenseffecten zijn niet uit te sluiten.
8. **Belang van de onderzoeker.** Finable heeft een commercieel belang bij een bepaalde
   uitkomst. Daarom staan de codeerregels, de conservatieve twijfelregel, de
   falsificatiegrens en de betrouwbaarheidscijfers vóór de verzameling vast en worden ze
   volledig gepubliceerd. Dat belang wordt in de publicatie zelf benoemd.

---

## 12. Publicatie en herhaalbaarheid

Meegepubliceerd, in de publicatie zelf of als downloadbare bijlage:

- dit methodedocument in de bevroren versie v1.0;
- de zoekstrings, de filters en de meetperiode;
- het aantal getrokken, afgevallen en vervangen items, met redenen;
- de betrouwbaarheidscijfers per werksoort, inclusief de lage;
- de geaggregeerde tabellen waarop elke figuur rust.

**Niet gepubliceerd:** de volledige vacatureteksten (auteursrecht bij de plaatser) en
werkgeversnamen op vacatureniveau. Citaten uitsluitend kort en niet herleidbaar, tenzij
de werkgever toestemming geeft.

**Naamgeving.** Editie 1 verschijnt als losse analyse met een inhoudelijke titel, niet als
"Monitor". Een monitornaam belooft herhaling; die belofte doe je pas als editie 1 heeft
gewerkt.

---

## 13. Wat er nu moet gebeuren, in deze volgorde

1. Bronnen A en B kiezen en de zoekstrings letterlijk vastleggen.
2. De meetperiode van veertien dagen vastleggen.
3. Besluiten of er een tweede codeur beschikbaar is.
4. Pas daarna: 20 vacatures trekken en coderen.
5. Betrouwbaarheid berekenen, één herziening doorvoeren, v1.0 bevriezen.
6. Pas daarna: de resterende circa 100 verzamelen.

Stap 4 begint niet voordat 1 tot en met 3 zwart op wit staan.
