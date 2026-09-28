# Evaluatiekader — vacatureanalyse editie 1

**Versie:** v0.1 — voorgelegd ter beoordeling
**Datum:** 25 september 2026
**Hoort bij:** `vacatureonderzoek-methode.md`

Dit document legt vóór publicatie vast waarop editie 1 wordt beoordeeld. Reden: achteraf
is elk resultaat te verdedigen. Eén mediavermelding heet dan "bewijs dat het werkt", geen
enkele vermelding heet "we moeten het beter promoten", en beide keren gaat het door.

De achterliggende beslissing is er één: **maken we hier een halfjaarlijkse reeks van, ja
of nee.** Dat is geen SEO-vraag en geen linkvraag. Vier signalen samen beantwoorden hem.

---

## 1. Nulmetingen — vóór publicatie vastleggen

Zonder deze cijfers is geen enkel signaal te interpreteren. Ze worden vastgelegd in de
week vóór publicatie, met datum.

| Nulmeting | Bron | Waarom |
|---|---|---|
| Gemiddelde impressies en reacties van Tims laatste vijf LinkedIn-posts | LinkedIn-analytics | Anders is elke respons "veel" |
| `book_call_click` en `book_call_complete` per maand, laatste drie maanden | GA4, key events | Noemer voor salesrespons |
| `indication_submit` per maand, laatste drie maanden | GA4, key event | Idem |
| Verwijzend verkeer per maand, laatste drie maanden | GA4 source/medium | Basis voor het meten van earned media |
| Antwoordpercentage van de lopende outbound | Eigen registratie | Noemer voor de outbound-vergelijking |
| Bestaande externe vermeldingen van "Finable" | Handmatige zoekopdracht, vastgelegd als lijst | Vertrekpunt; nu vrijwel uitsluitend GitHub |

Zonder deze zes staat de evaluatie stil. Ze kosten samen ongeveer een uur.

---

## 2. Signaal 1 — Earned media en links

**Wat het is.** Redactionele vermelding van het onderzoek door een derde partij, met of
zonder link.

**Wat we meten**

| Meetpunt | Hoe | Wanneer |
|---|---|---|
| Aantal publicaties dat het onderzoek noemt | Handmatige zoekopdrachten op onderzoekstitel en op "Finable", wekelijks | Week 1-6 na aanbieden |
| Per publicatie: medium, datum, wel/geen link, ankertekst, wordt de methode genoemd | Handmatig vastleggen in een log | Doorlopend |
| Verwijzend verkeer vanaf die publicaties | GA4 source/medium, afgezet tegen de nulmeting | Week 1-8 |
| Redactiereacties zonder publicatie | Mailbox; ook een "interessant, maar niet nu" is informatie | Doorlopend |

**Meetbeperking, vooraf benoemd.** Er is geen backlinktool en geen Search Console. We
kunnen niet vaststellen of een link follow of nofollow is, en we zien geen links die niet
via zoekopdrachten of verkeer opduiken. Het gemeten aantal is dus een ondergrens. Dat
wordt bij de uitkomst vermeld in plaats van weggelaten.

**Voorgestelde uitkomstniveaus** *(beslispunt B1)*

- **Sterk** — minimaal één redactionele vermelding mét bronlink bij Accountancy Vanmorgen,
  cfo.nl, Fiscaal Vanmorgen of MT/Sprout.
- **Voldoende** — minimaal één redactionele vermelding zonder link bij een van die media,
  of een vermelding met link bij een medium daarbuiten.
- **Zwak** — geen enkele redactionele vermelding binnen zes weken.

De grens ligt bij één, niet bij drie. Voor een domein van enkele maanden oud zonder
bestaande perscontacten is één redactionele vermelding een echt resultaat.

---

## 3. Signaal 2 — Social respons

**Wat het is.** Reactie op LinkedIn, waar Finable's doelgroep en de vakgenoten zitten.

**Wat we meten**

| Meetpunt | Hoe | Wanneer |
|---|---|---|
| Impressies en reacties, afgezet tegen de nulmeting | LinkedIn-analytics | Dag 1-14 |
| **Inhoudelijke reacties** — commentaar dat op de inhoud ingaat, niet "mooi werk" | Handmatig indelen: inhoudelijk / instemmend / felicitatie | Dag 1-14 |
| Herkomst van de reageerders: finance-verantwoordelijke bij een bedrijf, administratiekantoor, recruiter, overig | Handmatig, op profieltitel | Dag 1-14 |
| Reposts en vermeldingen door mensen buiten het eigen netwerk | LinkedIn | Dag 1-14 |
| Gesprekken die er rechtstreeks uit voortkomen | Eigen registratie | Dag 1-30 |

**Waar het om gaat.** Bereik is de zwakste van deze meetpunten. Het signaal zit in het
aantal inhoudelijke reacties van mensen uit de doelgroep. Twintig reacties van collega-
marketeers zeggen minder dan drie van finance-verantwoordelijken bij groeibedrijven.

**Voorgestelde uitkomstniveaus** *(beslispunt B2)*

- **Sterk** — meetbaar meer bereik dan de nulmeting én minimaal vijf inhoudelijke reacties
  uit de doelgroep, waaronder minimaal één gesprek.
- **Voldoende** — minimaal drie inhoudelijke reacties uit de doelgroep.
- **Zwak** — respons in lijn met een gewone post, geen inhoudelijke doelgroepreacties.

---

## 4. Signaal 3 — Salesrespons

**Wat het is.** Verandert het onderzoek iets aan gesprekken en aanvragen.

**Wat we meten**

| Meetpunt | Hoe | Wanneer |
|---|---|---|
| `book_call_click`, `book_call_complete`, `indication_submit` met de onderzoekspagina als landingspagina of in het pad | GA4, bestaande key events | Week 1-8 |
| Gesprekken waarin de prospect het onderzoek **uit zichzelf** noemt | Handmatig noteren direct na het gesprek | Week 1-8 |
| Antwoordpercentage op outbound waarin het onderzoek de opening is, tegenover de nulmeting | Eigen registratie | Week 1-8 |
| Gebruik in lopende trajecten: helpt het cijfer in een gesprek dat al liep | Kwalitatieve notitie per gesprek | Week 1-8 |

**Meetbeperkingen, vooraf benoemd.** Er is geen CRM; leads komen binnen via de leadmail
met attributie uit `sessionStorage`. Analytics staat achter consent, dus een deel van het
verkeer is onzichtbaar. De aantallen zijn klein: dit worden tellingen, geen percentages.
Eén geboekt gesprek is één, geen "100% stijging".

**Voorgestelde uitkomstniveaus** *(beslispunt B3)*

- **Sterk** — minimaal één geboekt gesprek of indicatieaanvraag die aantoonbaar via het
  onderzoek binnenkwam, óf een merkbaar hoger antwoordpercentage op outbound.
- **Voldoende** — het onderzoek wordt in minimaal twee lopende gesprekken uit zichzelf
  genoemd of bewijsbaar nuttig gebruikt.
- **Zwak** — geen waarneembaar effect op gesprekken of aanvragen.

---

## 5. Signaal 4 — Kwaliteit en originaliteit van de dataset

**Wat het is.** Het enige signaal dat losstaat van hoe de buitenwereld reageert, en
daarmee het enige dat we volledig zelf in de hand hebben. Een reeks bouwen op een zwakke
meting is erger dan geen reeks.

**Wat we meten**

| Meetpunt | Hoe | Norm |
|---|---|---|
| Behaalde *n* tegenover de streefwaarde 120 | Register | Minimaal 100 bruikbare items |
| Volledigheid per veld | Register, percentage `NA` | Kernvelden onder 20% `NA` |
| Intercodeurbetrouwbaarheid per werksoort | Kappa uit §13 van het methodedocument | Minimaal zeven werksoorten met kappa ≥ 0,70 |
| Aantal vervallen werksoorten | Uit de herziening | Maximaal drie |
| Originaliteit: minimaal één bevinding die niet uit bestaande publieke bronnen te halen was | Toets tegen Robert Half, Full Finance, NOAB, UWV, Jobdigger-publicaties | Minimaal één |
| Werkelijk bestede uren, verzamelen plus coderen plus schrijven | Urenregistratie vanaf de eerste trekking | Bepaalt of halfjaarlijks herhalen haalbaar is |

**Urenregistratie is hier geen administratie maar een meetpunt.** Loopt editie 1 op naar
een veelvoud van de begroting, dan is een halfjaarlijkse reeks niet realistisch, hoe goed
de externe respons ook is.

**Voorgestelde uitkomstniveaus** *(beslispunt B4)*

- **Sterk** — alle zes normen gehaald.
- **Voldoende** — *n* en betrouwbaarheid gehaald, hooguit één andere norm niet.
- **Zwak** — *n* onder 100, of minder dan zeven betrouwbare werksoorten.

---

## 6. Hoe de vier samen tot een besluit leiden

| Uitkomst | Besluit |
|---|---|
| Datasetkwaliteit **zwak** | **Niet herhalen**, ongeacht de rest. Een zwakke meting herhalen maakt hem niet beter, alleen zichtbaarder |
| Datasetkwaliteit voldoende of sterk, én minimaal twee van de drie externe signalen voldoende of beter | **Herhalen**, halfjaarlijks, en dan pas een vaste naam |
| Datasetkwaliteit voldoende of sterk, één extern signaal voldoende | **Eenmalig herhalen** met dezelfde opzet, geen reeks en geen naam. Eén editie is te weinig om te weten of het toeval was |
| Datasetkwaliteit voldoende of sterk, alle drie externe signalen zwak | **Niet herhalen als publicatie.** De dataset blijft dan wel bruikbaar als verkoopmateriaal, maar het is geen autoriteitsinstrument |

**Wanneer.** Het besluit valt binnen tien werkdagen na sluiting van het laatste
meetvenster (week 8), en wordt schriftelijk vastgelegd mét de gemeten cijfers erbij. Niet
"het voelde goed", maar de getallen en het besluit dat eruit volgt.

**Eén signaal heeft geen veto**, behalve datasetkwaliteit. Dat is bewust: de enige
uitkomst waarbij doorgaan aantoonbaar schadelijk is, is een reeks bouwen op een meting
die niet deugt.

---

## 7. Wat we expliciet niet als succes tellen

- **Rankings en organisch verkeer op de onderzoekspagina.** Dat is een SEO-uitkomst, geen
  autoriteitsuitkomst, en hij komt te laat om deze beslissing te informeren.
- **Vermeldingen op contentfarms en scrapers** die het bericht automatisch overnemen.
- **Complimenten zonder vervolg**, van wie dan ook.
- **Eigen distributie.** Een nieuwsbrief aan de eigen lijst is geen earned media.
- **Vermelding in een publicatie waarvoor is betaald.** Die kan nuttig zijn voor bereik,
  maar telt in dit kader niet mee als signaal.

---

## 8. Openstaande beslispunten

| # | Beslispunt |
|---|---|
| B1 | Akkoord op de uitkomstniveaus voor earned media (§2) |
| B2 | Akkoord op de uitkomstniveaus voor social respons (§3), inclusief de definitie van "doelgroep" |
| B3 | Akkoord op de uitkomstniveaus voor salesrespons (§4) |
| B4 | Akkoord op de normen voor datasetkwaliteit (§5), met name *n* ≥ 100 en zeven betrouwbare werksoorten |
| B5 | Akkoord op de besluitregel in §6, met name het veto van datasetkwaliteit |
| B6 | Wie legt de nulmetingen uit §1 vast, en wanneer |
| B7 | Lengte van de meetvensters: nu 6 weken voor media, 2 weken voor social, 8 weken voor sales |

---

## 9. Versiehistorie

| Versie | Datum | Wijziging |
|---|---|---|
| v0.1 | 2026-09-25 | Eerste opzet |
