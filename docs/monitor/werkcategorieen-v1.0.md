# Inhoudelijke werkcategorieën v1.0 (kandidaat)

**Deze codering wordt uitsluitend toegepast op de volledige vacaturetekst.** Niet op
zoekresultaat-snippets. Een snippet toont de eerste regels van een advertentie; daaruit de
inhoud van een functie afleiden levert een meting op die vooral de schrijfstijl van de
eerste alinea meet. Records zonder volledige tekst krijgen op elke werkcategorie `NA`, niet
`0`.

Het verschil tussen `NA` en `0` is hier wezenlijk: `0` betekent "de tekst noemt dit niet",
`NA` betekent "we hebben de tekst niet gezien".

## De twaalf categorieën

| # | Categorie | Kern |
|---|---|---|
| 1 | `administration` | Vastleggen en verwerken van transacties |
| 2 | `ap_ar` | Crediteuren, debiteuren, betalingen, incasso |
| 3 | `month_end_close` | Periodeafsluiting, aansluitingen, consolidatie |
| 4 | `reporting` | Rapportages maken en opleveren |
| 5 | `financial_control` | Bewaken dat de cijfers juist en volledig zijn |
| 6 | `analysis_business_control` | Verklaren waarom de cijfers zijn zoals ze zijn |
| 7 | `budgeting_forecasting` | Begroten, forecasten, vooruitkijken |
| 8 | `cash_treasury` | Liquiditeit, cashmanagement, financiering, bankrelaties |
| 9 | `tax_compliance` | Aangiften, jaarrekening, audit, wet- en regelgeving |
| 10 | `processes_internal_control` | Procesinrichting, AO/IC, automatisering |
| 11 | `business_partnering_advisory` | Adviseren van mensen buiten finance |
| 12 | `people_finance_management` | Aansturen van mensen, eindverantwoordelijkheid |

Codering is binair per categorie: `1` aanwezig, `0` afwezig, `NA` geen volledige tekst.

**Grens tussen 5 en 6, omdat die verwarring gegarandeerd optreedt.**
`financial_control` gaat over *bewaken dat het klopt*: controles op de administratie,
balansbewaking, vier-ogen op boekingen, signaleren van onjuistheden.
`analysis_business_control` gaat over *uitleggen wat er staat*: verschillenanalyse,
marge-analyse, afwijkingen verklaren. Het eerste beschermt de cijfers, het tweede
interpreteert ze.

## Systemen en gereedschap

Aparte structuur, niet een van de twaalf. Per record binair per groep, plus de letterlijk
genoemde namen in een tekstveld.

| Veld | Waarden |
|---|---|
| `sys_exact` | `1` · `0` · `NA` |
| `sys_afas` | `1` · `0` · `NA` |
| `sys_sap` | `1` · `0` · `NA` |
| `sys_erp_other` | `1` · `0` · `NA` — een ander bij naam genoemd ERP- of boekhoudpakket |
| `sys_erp_generic` | `1` · `0` · `NA` — "ervaring met een ERP-systeem" zonder merknaam |
| `sys_bi` | `1` · `0` · `NA` — Power BI, Tableau, Qlik, Looker, Cognos |
| `sys_excel_advanced` | `1` · `0` · `NA` — alleen bij een expliciete niveau-eis |
| `sys_named_raw` | tekst · `NA` — alle genoemde namen, letterlijk |

`sys_excel_advanced` telt niet bij "kennis van Excel" of "MS Office". Zonder niveau-eis is
dat standaardtekst die in vrijwel elke advertentie staat en dus niets onderscheidt.

## Kruistabel met het Financial Controller-onderzoek

Het verdiepende onderzoek gebruikt tien werksoorten met een eigen glossarium. Die blijven
ongewijzigd. Deze tabel legt vast hoe de twee zich verhouden, zodat ze niet stilzwijgend uit
elkaar lopen.

| Monitor-categorie | FC-werksoort | Relatie |
|---|---|---|
| `administration` | 1 Administratie | FC's werksoort 1 is hier gesplitst |
| `ap_ar` | 1 Administratie | tweede helft van die splitsing |
| `month_end_close` | 2 Afsluiting | gelijk |
| `reporting` | 4 Reporting | gelijk |
| `financial_control` | — | **nieuw**; FC kent geen aparte bewakingscategorie |
| `analysis_business_control` | 3 Control | gelijk; FC's "Control" is analyse, niet bewaking |
| `budgeting_forecasting` | 5 Forecasting | gelijk |
| `cash_treasury` | — | **nieuw**; komt in FC-vacatures nauwelijks voor |
| `tax_compliance` | 6 Compliance | gelijk |
| `processes_internal_control` | 8 Processen | gelijk |
| `business_partnering_advisory` | 7 Business partnering | gelijk |
| `people_finance_management` | 10 Team en eigenaarschap | gelijk |
| systemenstructuur | 9 Systemen | uit de categorieën gehaald, eigen velden |

**Gevolg voor de vergelijkbaarheid.** Een Monitor-record en een FC-record zijn niet
één-op-één vergelijkbaar op het aantal aangevinkte categorieën: de Monitor heeft er twaalf
en splitst administratie, FC heeft er tien en telt systemen mee. Wie de twee naast elkaar
wil zetten, moet eerst terugrekenen via deze tabel. Dat staat hier zodat niemand dat later
per ongeluk overslaat.

**De FC-definities zijn leidend waar ze bestaan.** Waar een Monitor-categorie een FC-tegen-
hanger heeft, geldt het FC-glossarium als bron. De Monitor mag die definitie niet oprekken.
