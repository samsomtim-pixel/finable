# Finable — projectcontext

Nederlandse finance-as-a-service voor groeiende bedrijven van 10 tot 50 medewerkers. Een vast finance-team neemt de dagelijkse finance over, met één Nederlands aanspreekpunt. **De content is bevroren.** Wijzig geen copy zonder nieuwe klant- of salesinput.

---

## Wat er staat

**Zeven kernpagina's** (`.dc.html` in de ontwerpomgeving, schone URL's in productie):
`index` · `aanpak` · `hoe-het-werkt` · `over` · `indicatie` · `gesprek` · `vacature`

**Twee A4 one-pagers:** `vacature-onepager.html` en de hoofd-one-pager, print-klaar via `doc-page.js`.

**Assets in `assets/`:** Finable-logo's, The Good Roll-logo, foto Tim Samsom.

---

## Ontwerpsysteem

| Token | Waarde | Gebruik |
|---|---|---|
| Navy | `#1B3A5C` | Koppen en de conversie-CTA |
| Slate | `#41586E` | Donkere uitlegblokken |
| Terracotta | `#C4643A` | Accenten, iconen, knoppen, links |
| Canvas | wit | Achtergrond |
| Body | `#5F6B76` | Bodytekst en subregels |

**Kleurhiërarchie:** slate is uitleg, navy is actie. Maximaal twee donkere secties per pagina.

**Geen beige.** Warme tinten zoals `#F4EEE7` zijn er twee keer in geslopen. Als je een getinte sectie nodig hebt, gebruik een koele tint waarin de kanalen dicht bij elkaar liggen (`#F3F3F1`). Terracotta levert al genoeg warmte.

**Typografie:** Inter voor koppen, zwaar gewicht. Playfair Display **alleen** voor de twee contrastclaims — "één persoon / meerdere expertises" en "Een heel finance-team / Voor minder dan één controller". Verder nergens serif.

**Stijl:** weinig kaarten, dunne lijnen en witruimte, geen sectienummers. Gebruik kaarten alleen waar ze informatie structureren. Zonder die regel wordt een editoriale opzet alsnog een raster van afgeronde tegeltjes.

---

## De twee werkwoordsets — nooit mengen

Dit zijn twee bedoelde systemen die verschillende dingen betekenen. Ze zijn een keer door elkaar gelopen en dat kostte een volledige herstelronde.

**De vier lagen van de finance-functie.** Alleen op /aanpak, bij de lagenstapel:
**Verwerken → Controleren → Begrijpen → Sturen**
Dit legt uit welk niveau van waarde hoger in de functie ontstaat.

**Het maandritme.** Overal waar het operationele ritme bedoeld wordt — home, /over, /hoe-het-werkt, /vacature:
**Uitvoeren → Afsluiten → Controleren → Rapporteren → Bespreken**
Zelfde woorden, zelfde volgorde, geen synoniemen. Niet samenvoegen tot "Afsluiten & controleren".

---

## Taalregel — woorden voor ons, woorden voor de klant

**Intern** mogen bestaan: scope, deployment, capability, lagenmodel, capaciteit, maandritme, finance-organisatie, ontbrekende laag, white-label.

**Extern** volstaat een kleine woordenschat:
team · overnemen · dagelijkse finance · afsluiten · controleren · rapporteren · bespreken · één aanspreekpunt · vaste maandprijs

"Finance-functie" is de uitzondering. Die term is belangrijk voor de categorie die Finable bouwt en mag blijven, maar gedoseerd.

---

## Claim-verboden

Deze zijn allemaal minstens twee keer teruggeslopen. Controleer erop bij elke wijziging.

**Geen claims over data-eigendom.** Niet "je data blijft van jou, ook als we uit elkaar gaan". De contractuele afspraken met de uitvoeringspartner liggen nog open. Formuleer als wat vóór de start wordt vastgelegd: *"Vóór de start leggen we vast waar je administratie staat, wie toegang heeft, hoe export en overdracht werken en welke opzegtermijn geldt."*

**Geen doorlooptijden of servicegaranties.** Geen "binnen X weken", geen "vakantie of ziekte verandert niets". Wel: *"je bent minder afhankelijk van de beschikbaarheid van één persoon."*

**Geen absolute reviewclaim.** Niet "iedere oplevering wordt gecontroleerd". Wel: *"inhoudelijke controles en reviews zijn onderdeel van het vaste werkproces."*

**Geen personeelsbelofte.** Niet "dezelfde mensen die jouw finance draaien". Wel: *"je werkt met een vaste bezetting die je bedrijf, processen en systemen leert kennen."*

**De uitvoeringspartner nergens bij naam.** Niet Janesh, niet Quvisor. Wel: *"een vast finance-team waarmee Finable structureel samenwerkt."*

**Geen prijsbedragen op de site.** Niet "rond een ton per jaar", niet "vanaf €X". Het anker is *"Een heel finance-team. Voor minder dan één controller."* Het getal komt in het gesprek.

**Geen verzonnen quotes of klantnamen.** The Good Roll is de enige klantcase, met exact deze quote: *Van sceptisch naar: "Ik zou het iedereen aanraden."* Geen tweede citaat, geen parafrase, geen anonieme cases.

**Geen absolute claims over de arbeidsmarkt.** Niet "dat profiel bestaat niet". Wel: *"dat profiel is lastig te vinden."*

**Geen kunstmatige urgentie.** Niet "het venster is kort", niet "elke week telt".

---

## Rolverdeling van de pagina's

| Pagina | Beantwoordt |
|---|---|
| Home | Wat is Finable — de claim, groot |
| /aanpak | Waarom zou ik finance zo organiseren — model, vergelijking, lagen, prijslogica |
| /hoe-het-werkt | Wat gebeurt er nadat ik ja zeg — diagnose, scope, samenwerking, proces, exit |
| /over | Wie zit erachter — Tim, het team, de constructie |
| /indicatie | Wat kost het ongeveer — intake in drie stappen |
| /gesprek | Primaire conversie |
| /vacature | Campagnepagina, buiten de navigatie, noindex |

**De home doet de claim, /aanpak doet de nuance.** Als de home al begint met "je hoeft niet alles af te nemen", verklein je jezelf voordat je iets hebt geclaimd.

**Voeg geen tekst toe om pagina's coherenter te maken.** Samenhang betekent niet dat elke pagina hetzelfde zegt. Elke pagina heeft een eigen functie.

---

## Navigatie — eerstvolgende wijziging

De huidige labels "Aanpak" en "Hoe het werkt" zijn te abstract en liggen te dicht bij elkaar. De inhoud verschilt prima; de labels dwingen de bezoeker te raden.

**Nieuw menu:** Finance-team · Zo werkt Finable · Over · [Plan een gesprek]

- "Finance-team" wijst naar /aanpak. Dat is de term die al in al het sterke materiaal staat — de one-pager, de vacature-A4, de boekhouderscampagne, de hoofdclaim.
- "Zo werkt Finable" wijst naar /hoe-het-werkt. Beter dan "Hoe het werkt", want "het" is vaag.
- **De URL's blijven `aanpak` en `hoe-het-werkt`.** Alleen de zichtbare labels wijzigen, dus geen migratie en niets kan breken.
- De eyebrow op /aanpak wordt **FINANCE-TEAM** in plaats van AANPAK.

**Niet doen: een menu-item "Diensten".** Dat leest als een administratiekantoor met een prijslijst, precies de categorie waar Finable uit wil. En "Zo werkt Finable" wegstoppen onder een ander item maakt de sterkste vertrouwenspagina onvindbaar.

---

## Laatst gedaan — /vacature herbouwd op de one-pager

Flow: hero-contrast → vijf disciplines → donker slate-blok → waarom een team (Capaciteit, Continuïteit, Inzicht, Minder afhankelijkheid) → bewijs The Good Roll → overstap-visual → Tim-CTA.

Verwijderd: het dubbele argument, Flexibiliteit en Kwaliteit, sectienummers, de aparte prijssectie, en de losse "wanneer past dit niet" (nu één rustige regel onder "waarom een team").

`noindex, nofollow` plus de comment *NIET LIVE tot delivery, pricing en commitment definitief zijn afgestemd.*

Responsive bug verholpen: de benefits-grid overlapte de prijslink tussen 560 en 900 pixels.

---

## Openstaand vóór live

**Blokkerend:**
- Formulieren op /gesprek en /indicatie naar een werkend endpoint. Bevestiging alleen bij een succesvolle response, zichtbare fout bij mislukken, nooit een succesmelding die altijd verschijnt.
- Echte foto van Tim, echt The Good Roll-logo, echte KVK en statutaire naam.
- Publiek akkoord van Sander voor naam en logo van The Good Roll.
- Privacyverklaring en AVG-review.

**Blokkerend voor sterkere copy, niet voor live:**
- Partnerafspraken over data-eigendom, overdraagbaarheid, aansprakelijkheid en opzegtermijn. Zodra die staan kan de exit-passage op /hoe-het-werkt sterker.
- Bevestiging van "ruim twintig specialisten", de Big Four-achtergrond en de vier internationale referenties.

**Werkwijze bij een ronde over meerdere pagina's:** lees ze eerst allemaal naast elkaar en markeer de patronen voordat je herschrijft. Losse optimalisaties zijn lokaal goed maar creëren globaal opnieuw complexiteit — zo is de eerdere leesbaarheidsschuld ontstaan.
