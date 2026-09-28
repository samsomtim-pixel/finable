# Monitor-gereedschap

Twee bestanden, allebei offline en zonder afhankelijkheden.

| Bestand | Rol |
|---|---|
| `rules.json` | De classificatieregels. Los te lezen en te reviewen zonder de code |
| `classify.py` | Past de regels toe. Deterministisch: dezelfde titel geeft altijd dezelfde uitkomst |
| `intake-template.csv` | De kolommen waarin ruwe vacaturegegevens moeten worden aangeleverd |

```bash
python3 research/monitor/classify.py --selftest
python3 research/monitor/classify.py --in <intake.csv> --out <normalized.csv>
```

`--selftest` toetst de regels tegen 40 geconstrueerde titels. Dat is een **regeltest, geen
steekproef**: de titels zijn bedacht om de regels te laten vallen en zeggen niets over de
Nederlandse arbeidsmarkt.

**Dit gereedschap classificeert uitsluitend op functietitel.** Inhoudelijke codering van
werkcategorieen vereist de volledige vacaturetekst en gebeurt hier niet.

**Geen vacaturedata in deze repository.** De repository is publiek en vacatureteksten zijn
auteursrechtelijk beschermd. Invoer- en uitvoerbestanden staan in de afgeschermde opslag
buiten de repo; alleen `intake-template.csv` met verzonnen voorbeeldregels staat hier.
