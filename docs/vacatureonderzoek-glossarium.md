# Codeerglossarium — vacatureanalyse editie 1

**Versie:** v0.1 — voorstel, nog niet bevroren
**Bijlage bij:** `vacatureonderzoek-methode.md`, §7
**Datum:** 25 september 2026

Dit glossarium maakt de tien werksoorten uit §7 toepasbaar voor iemand zonder
financeachtergrond. Het voegt geen werksoorten toe en wijzigt geen definitie; het maakt de
bestaande definities alleen concreet genoeg om reproduceerbaar te zijn.

**Ontwerpuitgangspunt:** waar een regel twee kanten op kon, is gekozen voor de kant die
een vinkje moeilijker maakt. Dat is bewust. Finable heeft belang bij een uitkomst waarin
vacatures breed zijn; een glossarium dat twijfel naar "aanwezig" laat vallen zou dat
belang in de meting bouwen. Verschillende regels hieronder maken het aantoonbaar
strenger dan een codeur intuïtief zou doen — met name bij Control, Systemen, Business
partnering en Team.

---

## Deel 1 — Regels die voor alle tien gelden

**R1. Alleen het codeerdeel telt.** Je codeert de functieomschrijving, de taken- of
verantwoordelijkhedenlijst en de functie-eisen. Niet: het verhaal over het bedrijf, de
arbeidsvoorwaarden, het salaris, de sollicitatieprocedure of de standaardtekst van een
bureau. Dat deel is al voor je afgebakend; je hoeft er niet zelf over te beslissen.

**R2. Het onderwerp moet de functiehouder zijn.** Aanwezig alleen als het werk aan
*deze persoon* wordt toegeschreven: "je", "jij", "de controller", "in deze rol", "you".
Zinnen over wat het team, de afdeling of het bedrijf doet tellen niet, tenzij de functie
er expliciet aan wordt gekoppeld.

> "Ons finance-team verzorgt de consolidatie" → **niet** aanwezig.
> "Je verzorgt samen met het team de consolidatie" → wél aanwezig.

**R3. Je moet een zin kunnen aanwijzen.** Geen aanwijsbare zin, geen vinkje. Zet bij elk
grensgeval de betreffende zinsnede in de kolom `opmerking`. Kun je die zin niet vinden,
dan is de werksoort afwezig — ook als je "denkt" dat het werk er wel bij hoort.

**R4. Twijfel valt uit op afwezig.** Dit is de belangrijkste regel van het hele
onderzoek. Je vult niet aan wat er logischerwijs bij een functie hoort. Je codeert wat
er staat.

**R5. Eisen aan de kandidaat tellen mee, eigenschappen niet.** "Je hebt ervaring met
consolidatie" beschrijft werk dat de functie vraagt → aanwezig. "Je bent nauwkeurig",
"je bent communicatief sterk", "je hebt HBO Bedrijfseconomie" beschrijven een eigenschap
of een diploma → niet aanwezig, bij geen enkele werksoort.

**R6. Eén zin mag meerdere werksoorten opleveren.** "Je stelt de managementrapportage op
en verklaart de afwijkingen" is zowel Reporting als Control. Dat is normaal, geen fout.

**R7. Eén duidelijke vermelding is genoeg.** Vijf keer genoemd telt niet zwaarder dan
één keer.

**R8. Pré en wens.** Staat er expliciet "is een pré", "wenselijk", "nice to have" of
"bij voorkeur", dan codeer je `aanwezig = 1` én `pre = 1`. Bij alle andere gevallen
`pre = 0`.

**R9. Engelstalige advertenties** codeer je volgens dezelfde regels. De termenlijsten
bevatten de Engelse equivalenten.

**R10. Je kent de onderzoeksvraag niet en hoeft die niet te kennen.** Vraag er ook niet
naar. Codeer alleen wat in de tekst staat.

### Werkwijze per vacature

1. Lees het codeerdeel één keer helemaal door.
2. Loop daarna de tien werksoorten in volgorde langs, één voor één.
3. Zoek per werksoort een zin die eronder valt. Gevonden → 1. Niet gevonden → 0.
4. Noteer bij grensgevallen de zinsnede in `opmerking`.
5. Ga niet terug om eerdere vacatures aan te passen nadat je iets nieuws hebt geleerd.
   Meld het in plaats daarvan; dat hoort bij de herzieningsronde.

### De zes verwarringen die het vaakst voorkomen

| Verwarring | Ezelsbruggetje |
|---|---|
| 1 Administratie ↔ 2 Afsluiting | Boeken wat er gebeurt = 1. Zorgen dat de periode klopt en dicht kan = 2 |
| 2 Afsluiting ↔ 3 Control | Cijfers kloppend máken = 2. Cijfers verklaren = 3 |
| 3 Control ↔ 5 Forecasting | Terugkijken op wat is gebeurd = 3. Vooruitkijken naar wat gaat gebeuren = 5 |
| 3 Control ↔ 4 Reporting | Uitzoeken waarom = 3. Het rapport maken = 4 |
| 4 Reporting ↔ 7 Business partnering | De cijfers opleveren of presenteren = 4. Adviseren wat iemand ermee moet doen = 7 |
| 6 Compliance ↔ 8 Processen | Verplichting van buiten (wet, belasting, accountant) = 6. Werkwijze van binnen = 8 |

**Val op tijd stil bij het woord "controleren".** In Nederlandse vacatureteksten betekent
dat meestal *nakijken of iets klopt* — dat is werksoort 1 of 2, niet 3. Werksoort 3 gaat
over analyseren en verklaren. "Controller" in de functietitel zegt hierover niets.

---

## Deel 2 — De tien werksoorten

### 1. Administratie

**Operationele definitie.** Het vastleggen en verwerken van financiële transacties in de
boekhouding: het terugkerende werk dat elke week doorgaat.

**Aanwezig als de tekst noemt:** facturen inboeken, verwerken of nakijken ·
crediteurenbeheer · debiteurenbeheer, aanmaningen, nabellen van openstaande posten ·
bankmutaties verwerken · betalingen klaarzetten of betaalbatches · memoriaalboekingen ·
grootboek of subadministraties bijhouden · salarisjournaalposten inboeken ·
intercompany-boekingen maken · de dagelijkse of wekelijkse boekhouding voeren.

**Niet aanwezig bij:** "je werkt met cijfers" · "administratieve ervaring" zonder te
zeggen waarmee · leidinggeven aan een administratie zonder dat je het werk zelf doet
(dat is 10) · beoordelen of analyseren van cijfers zonder verwerking (2 of 3) ·
**"administratieve organisatie" of "AO/IC"** — dat gaat over hoe processen zijn
ingericht en hoort bij 8, ondanks het woord "administratieve".

**Termen en synoniemen.** inboeken · boeken · verwerken · journaalpost · memoriaal ·
grootboek · subadministratie · crediteuren · debiteuren · accounts payable · accounts
receivable · AP · AR · bankmutaties · bankafschriften · betaalbatch · aanmaningen ·
facturatie · inkoopfacturen · verkoopfacturen · intercompany-boekingen · bookkeeping ·
transaction processing · invoice processing.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je bewaakt de debiteurenstand en belt klanten na" | **Aanwezig** | Debiteurenbeheer is onderdeel van de lopende administratie |
| "Je geeft leiding aan twee administratief medewerkers" | **Afwezig** (wel 10) | Er staat niet dat je het verwerkingswerk zelf doet |
| "Ervaring met administratieve organisatie en interne beheersing" | **Afwezig** (wel 8) | Het woord "administratieve" misleidt; dit gaat over procesinrichting |

---

### 2. Afsluiting

**Operationele definitie.** Het werk dat nodig is om een periode boekhoudkundig te
sluiten en de cijfers volledig en kloppend te krijgen: maand, kwartaal of boekjaar.

**Aanwezig als de tekst noemt:** maand-, kwartaal- of jaarafsluiting · het boekjaar
afsluiten · aansluitingen of reconciliaties maken · balansposten specificeren ·
balansdossier · voorzieningen · overlopende posten · afschrijvingsstaten · onderhanden
werk · consolidatie of eliminaties · intercompany-afstemming · "zorgen dat de cijfers op
tijd en juist klaar zijn".

**Niet aanwezig bij:** het enkel noemen van "de maandcijfers" zonder afsluitwerk · het
analyseren of verklaren van die cijfers (3) · het opstellen van de rapportage zelf (4) ·
het opstellen van de jaarrekening, jaarwerk of auditbegeleiding (6), tenzij de tekst
óók afsluitwerk noemt.

**Termen en synoniemen.** maandafsluiting · periodeafsluiting · kwartaalafsluiting ·
jaarafsluiting · afsluitproces · afsluitkalender · month-end close · closing ·
hard close · soft close · aansluiten · aansluiting · reconciliatie · reconciliëren ·
balansspecificatie · voorziening · overlopende posten · accruals · afschrijvingen ·
onderhanden werk · OHW · consolidatie · eliminatie · intercompany-afstemming.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je zorgt dat de maandcijfers op de vijfde werkdag klaar zijn" | **Aanwezig** | Beschrijft het sluiten van de periode, ook zonder het woord afsluiting |
| "Je analyseert de maandcijfers en bespreekt afwijkingen" | **Afwezig** (wel 3) | Analyseren is geen afsluiten |
| "Je stelt de jaarrekening op en begeleidt de accountantscontrole" | **Afwezig** (wel 6) | Jaarrekening en audit zijn externe verantwoording |

---

### 3. Control

**Operationele definitie.** Het onderzoeken en verklaren van cijfers die al gerealiseerd
zijn: waarom staan ze zoals ze staan.

**Aanwezig als de tekst noemt:** analyse van resultaten, omzet, marge of kosten ·
budget versus realisatie · begroting versus werkelijk · verschillen- of
variantieanalyse · afwijkingen verklaren of duiden · kostprijsberekening ·
kostentoerekening · projectresultaten analyseren · KPI's duiden · "inzicht geven in wat
er achter de cijfers zit".

**Niet aanwezig bij:** het woord "controlling" of "controller" in de functietitel of het
bedrijfsverhaal · **"controleren" in de betekenis van nakijken** — facturen, boekingen of
aangiften controleren hoort bij 1 of 2 · het maken van een rapportage zonder duiding (4) ·
vooruitkijkend werk zoals begroten, forecasten en scenario's (5).

**Termen en synoniemen.** analyse · analyseren · verschillenanalyse · variantieanalyse ·
variance analysis · budget versus realisatie · plan versus actual · afwijkingen
verklaren · marge-analyse · kostprijs · kostentoerekening · kostenbeheersing ·
resultaatanalyse · rendementsanalyse · duiden · doorgronden · "waarom" achter de cijfers.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je controleert de inkoopfacturen op juistheid" | **Afwezig** (wel 1) | "Controleren" betekent hier nakijken, niet analyseren |
| "Je verklaart de afwijking tussen budget en realisatie" | **Aanwezig** | Kern van de werksoort |
| "Je stelt het budget op" | **Afwezig** (wel 5) | Opstellen is vooruitkijken; vergelijken is terugkijken |

---

### 4. Reporting

**Operationele definitie.** Het maken en opleveren van periodieke financiële rapportages
aan een ontvanger binnen of buiten de organisatie.

**Aanwezig als de tekst noemt:** managementrapportage of maandrapportage opstellen ·
rapportage aan directie, MT of bestuur · KPI-rapportage · dashboards bouwen of
onderhouden · rapportagepakket of reporting package · groepsrapportage aan een
moedermaatschappij · rapportage aan bank of investeerder · stuurinformatie opleveren ·
managementinformatie samenstellen · de cijfers presenteren in een periodiek overleg.

**Niet aanwezig bij:** **"je rapporteert aan de CFO"** — dat is de rapportagelijn in de
organisatie, geen rapportagewerk. Ook niet: analyseren zonder dat er een rapportage
wordt gemaakt (3) · advies geven over wat er met de cijfers moet gebeuren (7).

**Termen en synoniemen.** managementrapportage · maandrapportage · periodieke
rapportage · rapportagepakket · reporting package · groepsrapportage ·
KPI-rapportage · dashboard · stuurinformatie · managementinformatie · MI · board pack ·
monthly reporting · financial reporting · rapportage aan de moedermaatschappij ·
bankrapportage · convenantrapportage.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je rapporteert rechtstreeks aan de CFO" | **Afwezig** | Beschrijft de hiërarchie, niet het werk |
| "Je bouwt dashboards in Power BI" | **Aanwezig** (én 9) | Dashboard bouwen is rapportagewerk; Power BI is een genoemd systeem |
| "Je levert maandelijks de cijfers aan het moederbedrijf" | **Aanwezig** | Periodieke oplevering aan een ontvanger |

---

### 5. Forecasting

**Operationele definitie.** Werk dat over een toekomstige periode gaat: plannen,
begroten, voorspellen, doorrekenen.

**Aanwezig als de tekst noemt:** budget of begroting opstellen · het budgetproces
begeleiden · forecast of rolling forecast maken · prognoses opstellen ·
liquiditeits- of cashflowprognose · meerjarenraming of meerjarenplan · scenario's
doorrekenen · businesscases doorrekenen · investeringsvoorstellen financieel onderbouwen.

**Niet aanwezig bij:** budget versus realisatie of het bewaken van kosten ten opzichte
van het budget (3) · het bewaken van de huidige liquiditeitsstand zonder prognose ·
"meedenken over de strategie" zonder dat er wordt gerekend (7).

**Termen en synoniemen.** budget opstellen · begroting · budgettering · budgetcyclus ·
budgetproces · forecast · forecasting · rolling forecast · prognose · voorspelling ·
liquiditeitsprognose · cashflowprognose · cash forecast · meerjarenbegroting ·
meerjarenplan · scenario · scenarioanalyse · wat-als · businesscase ·
investeringsanalyse · planning & control cyclus (voor het plandeel).

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je stelt de jaarbegroting op met de afdelingshoofden" | **Aanwezig** | Begroting opstellen is vooruitkijken |
| "Je bewaakt de kosten ten opzichte van het budget" | **Afwezig** (wel 3) | Vergelijken met een bestaand budget is terugkijken |
| "Je maakt een liquiditeitsprognose voor dertien weken" | **Aanwezig** | Expliciet een prognose |

---

### 6. Compliance

**Operationele definitie.** Werk dat voortkomt uit een wettelijke of externe
verplichting, of uit verantwoording aan een partij buiten de organisatie.

**Aanwezig als de tekst noemt:** btw-aangifte of andere aangiften · ICP-opgaaf ·
vennootschapsbelasting · loonheffing · CBS-opgaven · jaarrekening opstellen of
samenstellen · jaarwerk · publicatiestukken of deponeren bij de KvK ·
accountantscontrole begeleiden · controle- of auditdossier aanleveren ·
subsidieverantwoording · werkkostenregeling · transfer pricing · toepassen van IFRS of
de Richtlijnen voor de Jaarverslaggeving · rapportageverplichtingen richting bank of
verzekeraar die uit een contract voortvloeien.

**Niet aanwezig bij:** losse woorden als "kwaliteit", "zorgvuldigheid" of
"compliance-minded" zonder object · **interne beheersing, AO/IC of interne
controlemaatregelen** — dat is een interne werkwijze en hoort bij 8.

**Termen en synoniemen.** btw · omzetbelasting · aangifte · ICP · vennootschapsbelasting ·
VPB · loonheffing · CBS · jaarrekening · jaarwerk · samenstellen · publicatiestukken ·
deponeren · KvK · accountantscontrole · externe accountant · auditbegeleiding ·
controledossier · audit file · IFRS · RJ · fiscaal · fiscale aangiften · transfer
pricing · subsidieverantwoording · WKR · statutory reporting · tax compliance.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je verzorgt de btw-aangifte" | **Aanwezig** | Wettelijke verplichting |
| "Je bent verantwoordelijk voor de interne beheersing" | **Afwezig** (wel 8) | Interne werkwijze, geen externe verplichting |
| "Je bent eerste aanspreekpunt voor de externe accountant" | **Aanwezig** | Verantwoording aan een partij buiten de organisatie |

---

### 7. Business partnering

**Operationele definitie.** Het adviseren van of meedenken met mensen buiten de
finance-afdeling, op basis van financiële informatie.

**Aanwezig als de tekst noemt:** sparringpartner van directie, MT of ondernemer ·
adviseren van management · business partner voor afdelingen of vestigingen · meedenken
over beslissingen · gevraagd en ongevraagd advies · aanbevelingen doen · operationele
managers ondersteunen bij financiële vragen · de business challengen · cijfers vertalen
naar wat ze betekenen voor de bedrijfsvoering.

**Niet aanwezig bij:** eigenschappen als "communicatief vaardig", "je schakelt makkelijk
met collega's", "teamplayer", "stevige persoonlijkheid" (zie R5) · het opleveren of
presenteren van een rapportage zonder dat er wordt geadviseerd (4) · begeleiden of
adviseren van collega's binnen finance (10).

**Termen en synoniemen.** sparringpartner · business partner · klankbord ·
gesprekspartner van het MT · adviseren · advies · meedenken · aanbevelingen ·
challengen · uitdagen van aannames · gevraagd en ongevraagd advies · ondersteunt de
directie · vertaalt cijfers naar de business · trusted advisor · finance business partner.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je bent gesprekspartner voor het MT en challenget hun aannames" | **Aanwezig** | Adviserende rol richting niet-finance |
| "Je bent communicatief sterk en werkt graag samen" | **Afwezig** | Eigenschap, geen taak (R5) |
| "Je presenteert de maandcijfers in het MT-overleg" | **Afwezig** (wel 4) | Presenteren is nog geen adviseren. Staat er ook "en adviseert over bijsturing", dan wél |

---

### 8. Processen

**Operationele definitie.** Het verbeteren, inrichten of beheersen van de manier waarop
het financewerk wordt uitgevoerd — niet het uitvoeren zelf.

**Aanwezig als de tekst noemt:** processen verbeteren of optimaliseren · de
finance-cyclus inrichten · administratieve organisatie · AO/IC · interne beheersing of
interne controlemaatregelen · procedures of werkinstructies beschrijven en vastleggen ·
automatiseringsprojecten · een systeem implementeren of migreren · digitaliseren ·
standaardiseren · de doorlooptijd van de afsluiting verkorten · verbetervoorstellen
doen en doorvoeren.

**Niet aanwezig bij:** "je werkt gestructureerd" of "je bent nauwkeurig" (R5) · het
gewoon uitvoeren van een bestaand proces · externe verplichtingen (6) · dagelijks
werken in een systeem (9) — pas het inrichten, implementeren of verbeteren ervan telt
hier.

**Termen en synoniemen.** procesverbetering · proces optimaliseren · verbetervoorstellen ·
inrichten · AO/IC · administratieve organisatie · interne beheersing · internal
controls · procedures · werkinstructies · vastleggen van processen · automatisering ·
digitalisering · implementatie · uitrol · migratie · standaardisatie · efficiency ·
lean · continuous improvement · doorlooptijd verkorten · closing versnellen.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je signaleert verbetermogelijkheden in de financiële processen en voert die door" | **Aanwezig** | Expliciet procesverbetering |
| "Je bent nauwkeurig en gestructureerd" | **Afwezig** | Eigenschap (R5) |
| "Je werkt dagelijks in Exact" | **Afwezig** (wel 9) | Gebruiken is geen inrichten |

---

### 9. Systemen

**Operationele definitie.** Een bij naam genoemd financieel systeem of gegevensgereedschap
dat de functiehouder gebruikt of moet kennen.

**Aanwezig als de tekst een van deze bij naam noemt:**

- *Boekhoud- en ERP-pakketten:* Exact, Exact Online, AFAS, SAP, Oracle, NetSuite,
  Twinfield, Unit4, Microsoft Dynamics, Business Central, Navision, Visma, SnelStart,
  Yuki, Xero, Coda, Infor, of een vergelijkbaar met naam genoemd pakket.
- *BI- en rapportagegereedschap:* Power BI, Tableau, Qlik, Looker, Cognos.
- *Consolidatie- en planningstools:* LucaNet, Tagetik, OneStream, Anaplan, Board.
- *Gegevensgereedschap met expliciete niveau-eis:* "vergevorderd Excel", "Excel op hoog
  niveau", draaitabellen, Power Query, macro's, VBA, SQL.
- *Een ERP-systeem zonder merknaam:* "ervaring met een ERP-systeem", "je werkt in een
  ERP-pakket". Noteer dan `ERP generiek` in `opmerking`.

**Over die laatste regel.** Dit is geen uitzondering op R4 en geen versoepeling. R4 zegt
dat je niet mag aanvullen wat er niet staat — en hier staat het er wel: de werkgever
stelt de ERP-eis zelf, expliciet, als eis aan de functie. Het enige dat ontbreekt is de
merknaam, en die is voor deze werksoort niet wat gemeten wordt. Vergelijk het met
"kennis van Excel": daar ontbreekt niet de naam maar de eis zelf, en daarom telt die
niet. Waar wél een naam staat, noteer je die naam; waar geen naam staat, noteer je
`ERP generiek`.

**Niet aanwezig bij:** "kennis van Excel", "goede beheersing van MS Office" of "Office-
pakket" zonder niveau-eis — dat is standaardtekst en zegt niets over het werk · Word,
PowerPoint, Outlook, Teams · systemen die niets met finance te maken hebben, zoals een
HR- of ATS-pakket · een systeem dat alleen in het bedrijfsverhaal staat (dat deel codeer
je sowieso niet, R1).

**Termen en synoniemen.** zie de opsomming hierboven; verder boekhoudpakket, financieel
pakket, BI-tool, rapportagetool, consolidatietool — **alleen als er een naam bij staat of
een expliciete niveau-eis**. ERP en ERP-pakket vormen hierop de enige uitzondering en
tellen ook zonder naam, om de reden die hierboven staat.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Ervaring met Exact Online is een pré" | **Aanwezig**, `pre = 1` | Bij naam genoemd pakket, expliciet als wens |
| "Goede kennis van MS Office" | **Afwezig** | Geen financieel systeem, geen niveau-eis |
| "Je bent vergevorderd in Excel (draaitabellen, Power Query)" | **Aanwezig** | Expliciete niveau-eis met genoemde functionaliteit |
| "Ervaring met een ERP-systeem" (geen naam) | **Aanwezig** | De ERP-eis staat er zelf en is het bewijs; alleen de merknaam ontbreekt. Noteer `ERP generiek` in `opmerking` |

---

### 10. Team en eigenaarschap

**Operationele definitie.** Verantwoordelijkheid voor andere mensen, of eindverantwoordelijkheid
voor een afgebakend onderdeel van finance dat verder gaat dan het eigen takenpakket.

**Aanwezig als de tekst noemt:** leidinggeven, aansturen, coachen of begeleiden van
medewerkers · inwerken of opleiden van junioren · vaktechnisch aanspreekpunt zijn ·
eindverantwoordelijk voor de administratie, een entiteit of een werkmaatschappij ·
eigenaarschap over het afsluitproces of de rapportagecyclus · de finance manager of
controller vervangen bij afwezigheid · rechterhand van de CFO · verantwoordelijk voor een
team.

**Niet aanwezig bij:** "je werkt zelfstandig" · "je bent verantwoordelijk voor je eigen
werk" · "je werkt in een team van vijf" — dat is teamlidmaatschap, geen
verantwoordelijkheid · "je rapporteert aan de CFO" (rapportagelijn) · "je bent de spin
in het web" zonder dat er verantwoordelijkheid bij staat.

**Termen en synoniemen.** leidinggeven · aansturen · hiërarchisch of functioneel
leidinggeven · coachen · begeleiden · inwerken · opleiden · vaktechnisch aanspreekpunt ·
eindverantwoordelijk · verantwoordelijk voor de volledige administratie · eigenaarschap ·
ownership · rechterhand · vervangt bij afwezigheid · teamlead · people management.

**Grensgevallen**

| Zin | Oordeel | Waarom |
|---|---|---|
| "Je stuurt twee administratief medewerkers aan" | **Aanwezig** | Verantwoordelijkheid voor mensen |
| "Je werkt zelfstandig binnen een team van vier" | **Afwezig** | Zelfstandigheid en teamlidmaatschap zijn geen verantwoordelijkheid voor anderen |
| "Je bent eindverantwoordelijk voor de administratie van twee werkmaatschappijen" | **Aanwezig** | Eindverantwoordelijkheid voor een afgebakend onderdeel, ook zonder leidinggeven |

---

## Deel 3 — Wat je doet bij een geval dat hier niet in staat

1. Pas R2 tot en met R5 toe. Meestal is het daarmee beslist.
2. Lukt dat niet: codeer **afwezig** en noteer de zinsnede in `opmerking`.
3. Vraag niet aan de andere codeur wat die heeft gedaan. De twee coderingen moeten
   onafhankelijk blijven; overleg komt na afloop.
4. Verzamel je opmerkingen. Ze zijn de belangrijkste input voor de ene herzieningsronde
   die dit glossarium krijgt.

---

## Deel 4 — Versiehistorie

| Versie | Datum | Wijziging |
|---|---|---|
| v0.1 | 2026-09-25 | Eerste voorstel; tien werksoorten uit §7 geoperationaliseerd, geen werksoort toegevoegd of gewijzigd |
