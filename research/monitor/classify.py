#!/usr/bin/env python3
"""
Titelclassificatie voor de Finable Finance Vacature Monitor, v1.0-kandidaat.

Deterministisch en regelgebaseerd: dezelfde titel levert altijd dezelfde uitkomst.
Geen netwerk, geen model, geen willekeur. De regels staan in rules.json en zijn
los van deze code te lezen en te reviewen.

Deze module classificeert UITSLUITEND op functietitel. Inhoudelijke codering van
werkcategorieen vereist de volledige vacaturetekst en gebeurt hier niet.

Gebruik:
    python3 classify.py --in intake.csv --out normalized.csv
    python3 classify.py --selftest
"""
import argparse
import csv
import json
import re
import sys
import unicodedata
from pathlib import Path

RULES_PATH = Path(__file__).with_name("rules.json")
NA = "NA"


def load_rules(path=RULES_PATH):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def strip_accents(text):
    return "".join(c for c in unicodedata.normalize("NFD", text)
                   if unicodedata.category(c) != "Mn")


def normalize_title(raw, rules):
    """Zet een ruwe titel om naar een genormaliseerde vorm.

    De normalisatie is bewust terughoudend: ze verwijdert ruis die niets over de
    functie zegt (haakjes, m/v, uren) en knipt een staart af die duidelijk geen
    onderdeel van de titel is (locatie na een liggend streepje of pipe). Ze raakt
    de functiewoorden zelf niet aan.
    """
    if raw is None:
        return ""
    t = strip_accents(str(raw)).lower()

    if rules["normalisatie"].get("verwijder_haakjes"):
        t = re.sub(r"\([^)]*\)", " ", t)
        t = re.sub(r"\[[^\]]*\]", " ", t)

    # Uren en percentages zeggen niets over de functie.
    t = re.sub(r"\b\d{1,2}\s*[-/]\s*\d{1,2}\s*uur\b", " ", t)
    t = re.sub(r"\b\d{1,3}\s*%\b", " ", t)
    t = re.sub(r"\b\d{1,2}\s*uur\b", " ", t)

    uitz = rules["normalisatie"].get("knip_na_scheidingsteken_uitzondering", [])
    for sep in rules["normalisatie"].get("knip_na_scheidingsteken", []):
        if sep in t:
            kop, staart = t.split(sep, 1)
            # Niet knippen als de scheiding onderdeel is van een vaste term.
            rond = (kop[-12:] + sep + staart[:12])
            if not any(u in rond for u in uitz) and kop.strip():
                t = kop

    for tok in rules["normalisatie"].get("verwijder_tokens", []):
        t = re.sub(r"\b" + re.escape(strip_accents(tok.lower())) + r"\b", " ", t)

    t = re.sub(r"[^a-z0-9&/+\s\.-]", " ", t)
    t = re.sub(r"\s+", " ", t).strip(" -.,/")
    return t


def detect_seniority(norm, rules):
    """Eerste match wint; de lijst staat van junior naar senior."""
    for regel in rules["seniority"]:
        if re.search(regel["patroon"], norm):
            return regel["niveau"]
    return "unknown"


def classify_title(raw, rules):
    """Geeft een dict met familie, include-vlag, reden, confidence en seniority."""
    norm = normalize_title(raw, rules)
    out = {
        "title_original": "" if raw is None else str(raw),
        "title_normalized": norm if norm else NA,
        "function_family": NA,
        "seniority": "unknown",
        "include_monitor": False,
        "exclusion_reason": NA,
        "classification_confidence": NA,
        "rule_id": NA,
        "review_flag": False,
        "review_note": NA,
    }
    if not norm:
        out["function_family"] = "excluded_non_finance"
        out["exclusion_reason"] = "lege of onbruikbare titel"
        out["classification_confidence"] = "low"
        out["review_flag"] = True
        return out

    out["seniority"] = detect_seniority(norm, rules)

    # 1. Uitsluitingen gaan voor. Een quality controller is geen finance,
    #    ook niet als er verderop een financieel woord staat.
    for regel in rules["exclude"]:
        if re.search(regel["patroon"], norm):
            out["function_family"] = "excluded_non_finance"
            out["exclusion_reason"] = regel["reden"]
            out["classification_confidence"] = "high"
            out["rule_id"] = regel["id"]
            return out

    # 2. Families, eerste match wint. De volgorde in rules.json is bindend:
    #    specifieke titels staan boven algemene.
    for regel in rules["families"]:
        if re.search(regel["patroon"], norm):
            out["function_family"] = regel["familie"]
            out["include_monitor"] = True
            out["classification_confidence"] = regel.get("confidence", "medium")
            out["rule_id"] = regel["id"]
            if regel.get("review"):
                out["review_flag"] = True
                out["review_note"] = regel["review"]
            # Uitzondering F09: noemt de titel wel een discipline, dan wint die
            # familie en draagt seniority het junior- of assistentniveau.
            if regel["familie"] == "assistant_junior_control":
                for vervolg in rules["families"]:
                    if vervolg["familie"] in ("financial_control", "business_control",
                                              "project_control") and re.search(vervolg["patroon"], norm):
                        out["function_family"] = vervolg["familie"]
                        out["rule_id"] = regel["id"] + ">" + vervolg["id"]
                        out["review_note"] = ("discipline in de titel gaat voor; "
                                              "assistent- of juniorstatus staat in seniority")
                        break
            return out

    # 3. Bevat de titel wel een financewoord maar matcht geen familie, dan is dat
    #    een signaal dat de taxonomie een gat heeft. Niet insluiten, wel melden.
    if re.search(rules["finance_markers"], norm):
        out["function_family"] = "other_finance"
        out["include_monitor"] = False
        out["exclusion_reason"] = "financewoord herkend maar geen familieregel geraakt"
        out["classification_confidence"] = "low"
        out["review_flag"] = True
        out["review_note"] = "handmatig beoordelen; mogelijk ontbrekende familieregel"
        return out

    # 4. Geen enkel financesignaal.
    out["function_family"] = "excluded_non_finance"
    out["exclusion_reason"] = "geen financesignaal in de titel"
    out["classification_confidence"] = "high"
    return out


def run_file(inpad, uitpad, rules):
    with open(inpad, newline="", encoding="utf-8-sig") as fh:
        rijen = list(csv.DictReader(fh))
    if not rijen:
        sys.exit("Invoerbestand bevat geen rijen.")
    kolom = next((k for k in ("title_original", "titel", "title") if k in rijen[0]), None)
    if kolom is None:
        sys.exit("Invoerbestand mist een kolom title_original.")

    velden = list(rijen[0].keys())
    extra = ["title_normalized", "function_family", "seniority", "include_monitor",
             "exclusion_reason", "classification_confidence", "rule_id",
             "review_flag", "review_note"]
    for e in extra:
        if e not in velden:
            velden.append(e)

    with open(uitpad, "w", newline="", encoding="utf-8") as fh:
        schrijver = csv.DictWriter(fh, fieldnames=velden)
        schrijver.writeheader()
        for rij in rijen:
            res = classify_title(rij.get(kolom), rules)
            rij.update({k: v for k, v in res.items() if k != "title_original"})
            schrijver.writerow(rij)
    print(f"{len(rijen)} rijen verwerkt -> {uitpad}")


def selftest(rules):
    """Toetst de regels tegen geconstrueerde testtitels.

    LET OP: dit is een REGELTEST, geen steekproef. De titels hieronder zijn
    bedacht of ontleend aan eerder bureauonderzoek om de regels te laten vallen,
    en zeggen niets over de Nederlandse arbeidsmarkt.
    """
    cases = [
        # (titel, verwachte familie)
        ("Financial Controller", "financial_control"),
        ("Senior Financial Controller (32-40 uur)", "financial_control"),
        ("Junior Financial Controller", "financial_control"),
        ("Assistent Controller", "assistant_junior_control"),
        ("Trainee Controller", "assistant_junior_control"),
        ("Business Controller", "business_control"),
        ("Concern Controller", "business_control"),
        ("Project Controller", "project_control"),
        ("Credit Controller", "ap_ar_credit"),
        ("Medewerker Crediteurenadministratie", "ap_ar_credit"),
        ("Accounts Payable Specialist", "ap_ar_credit"),
        ("Finance Manager", "finance_management"),
        ("Hoofd Financiele Administratie", "finance_management"),
        ("Head of Finance", "finance_leadership"),
        ("CFO", "cfo"),
        ("Financieel Directeur", "cfo"),
        ("Treasury Analist", "treasury"),
        ("FP&A Analyst", "fp_and_a"),
        ("Financial Analyst", "fp_and_a"),
        ("Assistent Accountant", "accounting"),
        ("Financial Accountant", "accounting"),
        ("Financieel Administratief Medewerker", "finance_administration"),
        ("Boekhouder", "finance_administration"),
        # Payroll heeft geen eigen familie in v1.0 en valt daarom in other_finance.
        # Dit is een vastgesteld taxonomiegat, geen regelfout. Zie taxonomie-v1.0.md.
        ("Salarisadministrateur", "other_finance"),
        ("Fiscalist", "other_finance"),
        # Uitsluitingen uit de opdracht
        ("Document Controller", "excluded_non_finance"),
        ("Quality Controller", "excluded_non_finance"),
        ("Inventory Controller", "excluded_non_finance"),
        ("Warranty Controller", "excluded_non_finance"),
        ("Production Controller", "excluded_non_finance"),
        ("Cost Engineer", "excluded_non_finance"),
        ("Air Traffic Controller", "excluded_non_finance"),
        ("Voorraadcontroller", "excluded_non_finance"),
        ("Kwaliteitscontroleur", "excluded_non_finance"),
        ("IT-Controller", "excluded_non_finance"),
        ("Accountmanager Binnendienst", "excluded_non_finance"),
        ("Magazijnmedewerker", "excluded_non_finance"),
        # Vormvarianten
        ("Financial Controller | Amsterdam", "financial_control"),
        ("Financial Controller (m/v) fulltime", "financial_control"),
        ("Financial Controller a.i.", "financial_control"),
    ]
    fout = 0
    print(f"{'titel':42} {'verwacht':26} {'gekregen':26} {'conf':7} ok")
    print("-" * 112)
    for titel, verwacht in cases:
        r = classify_title(titel, rules)
        ok = r["function_family"] == verwacht
        if not ok:
            fout += 1
        vlag = "" if not r["review_flag"] else " [review]"
        print(f"{titel[:41]:42} {verwacht:26} {r['function_family']:26} "
              f"{str(r['classification_confidence'])[:6]:7} {'ja' if ok else 'NEE'}{vlag}")
    print("-" * 112)
    print(f"{len(cases) - fout}/{len(cases)} volgens verwachting, {fout} afwijkend")
    return 1 if fout else 0


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--in", dest="inpad")
    p.add_argument("--out", dest="uitpad")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    rules = load_rules()
    if a.selftest:
        sys.exit(selftest(rules))
    if not (a.inpad and a.uitpad):
        p.error("geef --in en --out, of gebruik --selftest")
    run_file(a.inpad, a.uitpad, rules)


if __name__ == "__main__":
    main()
