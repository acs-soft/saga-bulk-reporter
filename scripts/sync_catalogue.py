r"""Copy each report's catalogue paragraph from the app's manual into index.html (#1653).

The long text of a report card (<p class="report-card__long">) is the first paragraph of the
report's manual page, docs/manual/rapoarte/<key>.md in acs-soft/saga-bulk-reporter-app. A card
names its page with data-report="<key>". The app's ReportPagesTests keep that paragraph plain
(no links, no bold, 80-400 characters), so it is copied as text, HTML-escaped.

Usage (from this repo's root):
    python scripts/sync_catalogue.py <app-checkout>/docs/manual/rapoarte          rewrite index.html
    python scripts/sync_catalogue.py <app-checkout>/docs/manual/rapoarte --check  exit 1 if stale

Run it on the tag day, from the app's tagged commit, so the site describes the version it offers.
A card without data-report (the „Vă lipsește un raport?” card) is left alone, and so is a page
with no card (the two documents, OP D112 and confirmări de sold). A card whose page does not
exist stops the script.
"""
import html
import os
import re
import sys

CARD = re.compile(
    r'(<div class="report-card" data-report="(?P<key>[^"]+)">.*?<p class="report-card__long">)'
    r'(?P<text>.*?)(</p>)',
    re.S)


def first_paragraph(path):
    lines = open(path, encoding="utf-8").read().splitlines()
    i = 0
    while i < len(lines) and not lines[i].startswith("# "):
        i += 1
    i += 1
    while i < len(lines) and not lines[i].strip():
        i += 1
    para = []
    while i < len(lines) and lines[i].strip():
        para.append(lines[i].strip())
        i += 1
    if not para or para[0].startswith(("#", "-", "<!--", "!", ">")):
        raise SystemExit(f"{path}: the first block after the title is not a paragraph")
    return " ".join(para)


def main(argv):
    if len(argv) < 2:
        raise SystemExit(__doc__)
    folder, check = argv[1], "--check" in argv[2:]
    index = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "index.html")
    raw = open(index, "rb").read().decode("utf-8")

    seen, changed = [], []

    def replace(m):
        key = m.group("key")
        inner = m.group(0)[len('<div class="report-card"'):]
        if '<div class="report-card"' in inner or '<div class="report-card ' in inner:
            raise SystemExit(f"card data-report=\"{key}\" has no report-card__long paragraph")
        page = os.path.join(folder, key + ".md")
        if not os.path.isfile(page):
            raise SystemExit(f"card data-report=\"{key}\": no page {page}")
        text = html.escape(first_paragraph(page), quote=False)
        seen.append(key)
        if text != m.group("text"):
            changed.append(key)
        return m.group(1) + text + m.group(4)

    out = CARD.sub(replace, raw)
    if len(seen) != len(set(seen)):
        raise SystemExit("two cards name the same page: " + ", ".join(k for k in seen if seen.count(k) > 1))

    if check:
        print(f"{len(seen)} cards, {len(changed)} out of date" + (": " + ", ".join(changed) if changed else ""))
        return 1 if changed else 0
    open(index, "wb").write(out.encode("utf-8"))
    print(f"{len(seen)} cards, {len(changed)} rewritten")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
