#!/usr/bin/env python3
"""Menghasilkan src/data/{collectibles,wearables,temporary}.js dari kode game Sunflower Land.

Sumber (GitHub sunflower-land/sunflower-land, branch main):
  collectibleItemBuffs.ts, bumpkinItemBuffs.ts, collectibleBuilt.ts, pets.ts, kamus bahasa Inggris.
Jalankan ulang setiap ada update item:  python3 tools/update_item_data.py
"""
import json, os, re, urllib.request

RAW = "https://raw.githubusercontent.com/sunflower-land/sunflower-land/main/src/"
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data")

def get(path):
    with urllib.request.urlopen(RAW + path, timeout=60) as r:
        return r.read().decode("utf8")

def block(ts, name):
    """Isi objek `export const NAME ... > = { ... }`."""
    a = re.compile(r"> = \{").search(ts, ts.index("export const " + name)).end() - 1
    depth = 0
    for b in range(a, len(ts)):
        depth += (ts[b] == "{") - (ts[b] == "}")
        if depth == 0:
            return ts[a + 1:b]

KEY = re.compile(r'^  ("([^"]+)"|([A-Za-z0-9_$]+)): ')

def entries(src):
    items, cat, cur = [], None, None
    for ln in src.split("\n"):
        c = re.match(r"^  // (.+)$", ln)
        if c:
            cat = c.group(1).strip()
            continue
        k = KEY.match(ln)
        if k:
            cur = {"name": k.group(2) or k.group(3), "cat": cat, "body": ""}
            items.append(cur)
        if cur is not None:
            cur["body"] += ln + "\n"
    return items

def labels(body):
    for m in re.finditer(r"shortDescription:", body):
        seg = body[m.end():]
        e = re.search(r'labelType:\s*"(\w+)"', seg)
        if e:
            yield re.findall(r'translate\(\s*"([^"]+)"', seg[:e.start()]), e.group(1)

SKIP_HELPERS = {"getFertiliserBuffLabels"}   # hasilnya bergantung argumen (jenis pupuk)

def with_helpers(body, ts):
    """Sertakan isi fungsi pembantu yang di-spread (mis. ...getTotemBuffLabels(game))."""
    extra = ""
    for fn in re.findall(r"\.\.\.(\w+)\(", body):
        if fn in SKIP_HELPERS:
            continue
        m = re.search(r"(?:const|function) " + fn + r"\b", ts)
        if m:
            ends = [i for i in (ts.find("\n};", m.end()), ts.find("\n}\n", m.end())) if i > 0]
            extra += ts[m.start():min(ends)] + "\n"
    return body + extra

def effects(body, dic, hours=None, ts=""):
    out = []
    for keys, kind in labels(with_helpers(body, ts)):
        if not keys:
            continue
        # Varian (mis. ".skill" / ".speed"): pakai kunci dasar yang paling pendek.
        base = min(keys, key=len) if all(k.startswith(min(keys, key=len)) for k in keys) else keys[-1]
        txt = dic.get(base)
        if txt is None:
            continue
        if "{{time}}" in txt and hours:
            txt = txt.replace("{{time}}", f"{hours:g}")
        if "{{" in txt:          # nilai dinamis (bergantung skill/state): lewati
            continue
        if [txt, kind] not in out:
            out.append([txt, kind])
    out.sort(key=lambda e: e[0].startswith("Lasts for"))   # durasi di baris terakhir
    return out

def js_items(rows):
    return ",\n".join("  " + json.dumps(r, ensure_ascii=False) for r in rows)

def main():
    dic = json.loads(get("lib/i18n/dictionaries/dictionary.json"))
    col, wear = get("features/game/types/collectibleItemBuffs.ts"), get("features/game/types/bumpkinItemBuffs.ts")
    built, pets = get("features/game/lib/collectibleBuilt.ts"), get("features/game/types/pets.ts")

    # Durasi item sementara (jam), dari EXPIRY_COOLDOWNS.
    shrines = re.findall(r'^  "([^"]+Shrine)": \{', pets[pets.index("export const PET_SHRINES"):], re.M)
    hours = {n: 7 * 24 for n in shrines}
    start = built.index("EXPIRY_COOLDOWNS: Record")
    table = built[start:built.index("\n};", start)]   # hanya tabel produksi (bukan yang dikunci flag)
    for n, expr in re.findall(r'^  "([^"]+)": ([\d* ]+) \* 60 \* 60 \* 1000', table, re.M):
        hours[n] = eval(expr)
    hours.update({"Legendary Shrine": 24, "Obsidian Shrine": 14 * 24, "Trading Shrine": 30 * 24})

    collectibles = []
    for it in entries(block(col, "COLLECTIBLE_BUFF_LABELS")):
        ef = effects(it["body"], dic, hours.get(it["name"]), col)
        if ef:
            # "Bull Run" di kode game hanya penanda untuk sisa item (bukan kategori sebenarnya).
            grp = it["cat"] if it["cat"] not in (None, "Bull Run", "All items go above this line") else "Other"
            if it["name"] in hours:
                grp = "Temporary"
            collectibles.append({"name": it["name"], "group": grp, "effects": ef})

    wearables = []
    for src in (block(wear, "BUMPKIN_ITEM_BUFF_LABELS"), block(wear, "SPECIAL_ITEM_LABELS")):
        for it in entries(src):
            ef = effects(it["body"], dic, None, wear)
            if ef and it["name"] not in {w["name"] for w in wearables}:
                wearables.append({"name": it["name"], "effects": ef})

    names = {c["name"] for c in collectibles}
    temp = [{"name": n, "hours": h} for n, h in hours.items() if n in names]

    def write(fn, head, const, rows):
        with open(os.path.join(OUT, fn), "w", encoding="utf8") as f:
            f.write(f"// {head}\n// DIHASILKAN oleh tools/update_item_data.py - jangan edit manual.\n")
            f.write(f"export const {const} = [\n{js_items(rows)}\n];\n")

    write("collectibles.js", "Boost collectible. Format: { name, group, effects: [[teks, tipe], ...] }", "COLLECTIBLES", collectibles)
    write("wearables.js", "Boost wearable. Format: { name, effects: [[teks, tipe], ...] }", "WEARABLES", wearables)
    write("temporary.js", "Item sementara (durasi dalam jam), dari EXPIRY_COOLDOWNS. Efeknya ada di collectibles.js.", "TEMPORARY_ITEMS", temp)
    print(f"collectibles={len(collectibles)} wearables={len(wearables)} temporary={len(temp)}")

main()
