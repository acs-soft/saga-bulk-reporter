r"""Copy each report's catalogue paragraph from the app's manual into index.html (#1653).

The long text of a report card (<p class="report-card__long">) is the first paragraph of the
report's manual page, docs/manual/rapoarte/<key>.md in acs-soft/saga-bulk-reporter-app. A card
names its page with data-report="<key>". The app's ReportPagesTests keep that paragraph plain
(no links, no bold, 80-400 characters, no dashes, no amounts in lei); this script checks the same
again, because merging this repo publishes at once.

Usage (from this repo's root; the flag may come before or after the folder):
    python scripts/sync_catalogue.py <app-checkout>/docs/manual/rapoarte          rewrite index.html
    python scripts/sync_catalogue.py --check <app-checkout>/docs/manual/rapoarte  exit 1 if stale

Run it on the tag day, from the app's tagged commit, so the site describes the version it offers.

The script stops (exit 2), in either mode, when:
- a report page has no card (the two documents, OP D112 and confirmări de sold, have none);
- a data-report attribute is not on a report card, or a card has no long paragraph;
- two cards name the same page, or a card names a page that does not exist;
- a first paragraph is not plain text (links, bold, code, escapes, tables, comments) or carries a
  dash or an amount in lei.
A card without data-report (the „Format SAGA 3.x” and „Vă lipsește un raport?” cards) is left alone.
"""
import html
import os
import re
import sys

# Pages with no card: documents, not reports (the site's count leaves them out).
DOCUMENTS = {"opD112", "confirmari-sold"}

DIV_TAG = re.compile(r"<div\b([^>]*)>", re.I)
ATTR = re.compile(r'([\w:-]+)\s*=\s*"([^"]*)"')
LONG = re.compile(r'<p\b([^>]*)>(.*?)</p>', re.S | re.I)
DASHES = ("—", "–", "&mdash;", "&ndash;")
PRICE = re.compile(r"\d[\d.,]*\s*(lei|ron)\b", re.I)
# Characters that would mean markup the site would show raw (the app renders or drops them).
NOT_PLAIN = ("\\", "|", "`", "*", "[", "]", "<", ">", "_")


class Stop(Exception):
    pass


def attrs(tag_body):
    return {k.lower(): v for k, v in ATTR.findall(tag_body)}


def classes(a):
    return a.get("class", "").split()


def is_block_start(text, line):
    """The lines that end a paragraph in the app's MarkdownSubset: heading, image, note, list item."""
    if re.match(r"#{1,3} ", text) or text.startswith("![") or text.startswith(">"):
        return True
    return bool(re.match(r" *([-*] |\d{1,3}\. )", line))


def first_paragraph(path):
    text = open(path, encoding="utf-8-sig").read().replace("\r\n", "\n")
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    lines = text.split("\n")
    i = 0
    while i < len(lines) and not re.match(r"# ", lines[i].strip()):
        i += 1
    i += 1
    while i < len(lines) and not lines[i].strip():
        i += 1
    para = []
    while i < len(lines) and lines[i].strip():
        line = lines[i].rstrip()
        if is_block_start(line.strip(), line):
            break
        para.append(line.strip())
        i += 1
    if not para:
        raise Stop(f"{path}: the block after the title is not a paragraph")
    out = " ".join(para)
    bad = [c for c in NOT_PLAIN if c in out]
    if bad:
        raise Stop(f"{path}: the first paragraph is not plain text ({' '.join(bad)})")
    if any(d in out for d in DASHES):
        raise Stop(f"{path}: the first paragraph has a dash; customer copy has none")
    if PRICE.search(out):
        raise Stop(f"{path}: the first paragraph names an amount in lei; the site names no price")
    return out


def cards(raw):
    """(key, start, end of the long text's content, its start) for every report card with data-report."""
    starts = [(m.start(), attrs(m.group(1))) for m in DIV_TAG.finditer(raw)]
    card_starts = [(pos, a) for pos, a in starts if "report-card" in classes(a)]
    found = []
    for n, (pos, a) in enumerate(card_starts):
        if "data-report" not in a:
            continue
        end = card_starts[n + 1][0] if n + 1 < len(card_starts) else len(raw)
        region = raw[pos:end]
        long = next((m for m in LONG.finditer(region) if "report-card__long" in classes(attrs(m.group(1)))), None)
        if long is None:
            raise Stop(f'card data-report="{a["data-report"]}" has no report-card__long paragraph')
        found.append((a["data-report"], pos + long.start(2), pos + long.end(2)))
    tagged = len(re.findall(r"\bdata-report\s*=", raw))
    if tagged != len(found):
        raise Stop(f"{tagged} data-report attributes, {len(found)} on report cards: one is on something else")
    return found


def main(argv):
    flags = [a for a in argv[1:] if a.startswith("--")]
    args = [a for a in argv[1:] if not a.startswith("--")]
    if len(args) != 1 or set(flags) - {"--check"}:
        print(__doc__)
        return 2
    folder, check = args[0], "--check" in flags
    index = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "index.html")
    raw = open(index, "rb").read().decode("utf-8")
    try:
        found = cards(raw)
        keys = [k for k, _, _ in found]
        dupes = sorted({k for k in keys if keys.count(k) > 1})
        if dupes:
            raise Stop("two cards name the same page: " + ", ".join(dupes))
        if not os.path.isdir(folder):
            raise Stop(f"no folder {folder}")
        pages = {f[:-3] for f in os.listdir(folder) if f.endswith(".md")}
        missing_pages = sorted(set(keys) - pages)
        if missing_pages:
            raise Stop("cards name pages that do not exist: " + ", ".join(missing_pages))
        no_card = sorted(pages - set(keys) - DOCUMENTS)
        if no_card:
            raise Stop("report pages with no card on the site: " + ", ".join(no_card))

        changed, out, last = [], [], 0
        for key, start, end in found:
            text = html.escape(first_paragraph(os.path.join(folder, key + ".md")), quote=False)
            if text != raw[start:end]:
                changed.append(key)
            out += [raw[last:start], text]
            last = end
        out.append(raw[last:])
    except Stop as e:
        print("STOP: " + str(e))
        return 2

    if check:
        print(f"{len(found)} cards, {len(changed)} out of date" + (": " + ", ".join(changed) if changed else ""))
        return 1 if changed else 0
    open(index, "wb").write("".join(out).encode("utf-8"))
    print(f"{len(found)} cards, {len(changed)} rewritten")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
