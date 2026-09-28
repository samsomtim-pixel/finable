# Functietaxonomie v1.0 (kandidaat)

Veertien families. De veertiende, `excluded_non_finance`, is geen familie maar de
uitkomst "hoort niet in de Monitor".

**Grondregel.** De functietitel classificeert; hij bepaalt niet wat iemand doet. Het woord
*controller* is op zichzelf geen financesignaal — in Nederlandse vacatureteksten staat het
net zo vaak voor documentbeheer, kwaliteit, voorraad of productie. Bij twijfel wordt niet
ingesloten.

**De originele titel blijft altijd bewaard** in `title_original`, onbewerkt. De
classificatie is een afgeleide kolom en vervangt de titel nooit.

**Volgorde is bindend.** Uitsluitingen gaan voor families; binnen de families wint de
eerste regel die raakt. De volgorde staat in `research/monitor/rules.json` en is daar
regel voor regel te lezen zonder de code erbij.

---

## De families

### `finance_administration`
*De uitvoerende financiële administratie: het vastleggen en verwerken zelf.*

**Wel:** financieel administratief medewerker · medewerker financiële administratie ·
administrateur · boekhouder · bookkeeper · financial administrator · assistent
boekhouding.
**Niet:** administratief medewerker zonder financieel voorvoegsel (kan receptie, HR of
logistiek zijn) · office manager · data entry.
**Grens met `accounting`:** verwerken hoort hier, verslaggeving en samenstellen horen daar.

### `accounting`
*Verslaggeving, jaarwerk en grootboek in de accountancy-betekenis.*

**Wel:** accountant · assistent-accountant · RA · AA · samensteller · financial accountant ·
general ledger accountant · GL accountant · medewerker verslaggeving · reporting specialist.
**Niet:** accountmanager (commercieel, sluit uit) · account executive · accountancy-student
zonder functie.
**Let op:** `accountmanager` bevat het woord *account* en is expliciet uitgesloten.

### `ap_ar_credit`
*Crediteuren, debiteuren en credit management.*

**Wel:** credit controller · creditmanager · debiteurenbeheerder · medewerker
crediteurenadministratie · accounts payable · accounts receivable · AP/AR specialist ·
incassomedewerker.
**Niet:** kredietbeoordelaar bij een bank of financier (dat is risicobeoordeling van
klanten, niet de eigen debiteurenstand).
**Belangrijk:** een **credit controller hoort hier, niet in `financial_control`.** Dat is
de meest voorkomende misclassificatie van deze taxonomie, omdat de titel op *controller*
eindigt.

### `assistant_junior_control`
*Controlfuncties waarin de assistent- of juniorstatus het onderscheidende element is en de
titel geen discipline noemt.*

**Wel:** assistent controller · assistant controller · trainee controller · controller
assistent · medewerker planning & control.
**Niet:** junior financial controller, assistent business controller — die noemen wél een
discipline. Die gaan naar `financial_control` respectievelijk `business_control`, met de
juniorstatus in het veld `seniority`.
**Bekend spanningspunt:** deze familie mengt niveau en discipline, terwijl `seniority` een
eigen veld is. Zie de voorstellenlijst onderaan.

### `financial_control`
*Controlfuncties met de nadruk op juistheid, afsluiting en verslaglegging.*

**Wel:** financial controller · financieel controller · group controller · reporting
controller.
**Niet:** business controller · credit controller · project controller · de niet-finance
controllers uit de uitsluitingslijst.

### `business_control`
*Controlfuncties met de nadruk op analyse en besluitvorming.*

**Wel:** business controller · commercial controller · operational controller · concern
controller.
**Niet:** financial controller · business analyst zonder financeaanduiding (kan IT zijn).

### `fp_and_a`
*Planning en analyse als eigen functie.*

**Wel:** FP&A analyst · FP&A manager · financial analyst · financieel analist ·
planning & analysis.
**Niet:** data analyst · business analyst · risk analyst · beleggingsanalist.

### `finance_management`
*Leidinggevend over een finance-team, zonder directiepositie.*

**Wel:** finance manager · financieel manager · manager financiële administratie · hoofd
financiële administratie · teamleider finance · manager accounting · finance lead.
**Niet:** finance director en head of finance (die horen bij `finance_leadership`).

### `finance_leadership`
*Eindverantwoordelijk voor finance, zonder de CFO-titel.*

**Wel:** head of finance · hoofd finance · finance director · director of finance · group
finance director.
**Grens met `cfo`:** de CFO-titel en financieel directeur gaan naar `cfo`; de rest hierheen.
Dit onderscheid is deels arbitrair en in kleinere organisaties feitelijk dezelfde rol.
Vastgelegd als beperking.

### `cfo`
**Wel:** CFO · Chief Financial Officer · financieel directeur · financial director.

### `treasury`
**Wel:** treasurer · treasury analyst · treasury manager · cash manager · cashmanagement.
**Niet:** beleggingsadviseur · asset manager · fondsbeheerder.

### `project_control`
*Financiële beheersing van projecten.*

**Wel:** project controller · projectcontroller · project control binnen een financiële
context.
**Niet:** project control in de bouw, offshore of engineering, waar het planning en
voortgang betekent — cost engineer, planner, werkvoorbereider.
**Standaard laag betrouwbaarheidsniveau.** Deze titel is zonder de volledige tekst niet
met zekerheid finance. Elk record krijgt een reviewvlag.

### `other_finance`
*Aantoonbaar finance, maar geen van de families hierboven dekt het.*

**Wel:** fiscalist · belastingadviseur · tax specialist · internal auditor ·
salarisadministrateur · payroll specialist · finance trainee.
**Bedoeld als signaal, niet als vergaarbak.** Loopt deze familie vol, dan mist de taxonomie
een categorie. Dat is een bevinding die gerapporteerd wordt, geen probleem dat wordt
weggewerkt door hem breder te definiëren.

### `excluded_non_finance`
*Valt buiten de Monitor.*

Vaste uitsluitingen: document controller · quality controller · kwaliteitscontroleur ·
inventory controller · voorraadcontroller · stock controller · warranty controller ·
production controller · productieplanner · air traffic controller · verkeersleider · cost
engineer · planning engineer · werkvoorbereider · IT-controller · HR-functies ·
commerciële functies · werving en selectie.

Verder valt hierin: elke titel zonder financesignaal, en elke lege of onbruikbare titel.

---

## De twee vangnetten

**Vangnet 1 — controller zonder finance-marker.** Bevat de titel *controller* maar raakt
geen enkele familieregel en geen uitsluitingsregel, dan wordt hij níét ingesloten. Hij
krijgt `other_finance` met lage betrouwbaarheid en een reviewvlag. Insluiten op basis van
het woord alleen is precies de fout die deze taxonomie moet voorkomen.

**Vangnet 2 — financewoord zonder familie.** Zelfde behandeling. Dit is het signaal dat de
taxonomie een gat heeft; het wordt geteld en gerapporteerd.

---

## Betrouwbaarheidsniveaus

| Niveau | Wanneer |
|---|---|
| `high` | Een eenduidige familieregel of uitsluitingsregel raakt |
| `medium` | Een regel raakt die bekend ambigu is: `assistant_junior_control`, `other_finance` |
| `low` | `project_control`, of een vangnet is geraakt |

Alles wat niet `high` is, gaat door de menselijke QA.

---

## Voorstellen voor v2.0 — bewust niet verwerkt

Deze komen voort uit het bouwen en testen van de regels. Ze zijn **niet doorgevoerd**;
doorvoeren vraagt expliciete goedkeuring en hercodering.

1. **Payroll heeft geen familie.** `salarisadministrateur` en `payroll specialist` vallen
   nu in `other_finance`. Payroll is een eigen vakgebied dat deels bij HR hoort. Voorstel:
   een aparte familie `payroll`, of een expliciete uitsluiting. Nu niet gekozen omdat beide
   verdedigbaar zijn.
2. **Tax heeft geen familie.** `fiscalist` en `tax specialist` vallen in `other_finance`.
3. **Internal audit heeft geen familie** en is bovendien discutabel als finance.
4. **`assistant_junior_control` mengt niveau en discipline** terwijl `seniority` een eigen
   veld is. Voorstel: de familie laten vervallen en de records verdelen over de
   disciplinefamilies. Nu niet gedaan omdat de familie in de opdracht staat.
5. **`finance_management` versus `finance_leadership`** is in het mkb vaak dezelfde functie
   met een andere titel. Voorstel: samenvoegen, of het onderscheid expliciet op
   organisatiegrootte baseren zodra die bekend is.
