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
    start = re.search(r"export const " + name + r"\b", ts).start()   # \b: hindari cocok ke NAME_SEEDS dst.
    a = re.compile(r"> = \{").search(ts, start).end() - 1
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

def helper_fertilisers(ts, dic):
    """Pupuk di getFertiliserBuffLabels (Sprout Mix dst.): ambil efek dasar (label pertama) tiap cabang."""
    start = ts.index("export function getFertiliserBuffLabels")
    h = ts[start:ts.index("\n}\n", start)]
    marks = list(re.finditer(r'if \(fertiliser === "([^"]+)"\) \{', h))
    out = []
    for i, m in enumerate(marks):
        seg = h[m.end():marks[i + 1].start() if i + 1 < len(marks) else len(h)]
        ef = effects(seg, dic)[:1]
        if ef:
            out.append({"name": m.group(1), "effects": ef})
    # Cabang terakhir tanpa `if` sendiri: cari nama di tipe FertiliserBuffLabelName, cocokkan lewat kunci kamus.
    t = ts[ts.index("type FertiliserBuffLabelName"):start]
    for name in re.findall(r'"([^"]+)"', t):
        if name in {o["name"] for o in out}:
            continue
        slug = name.lower().replace(" ", ".")
        for keys, kind in labels(h):
            if any(slug in k for k in keys):
                base = min(keys, key=len)
                if base in dic and "{{" not in dic[base]:
                    out.append({"name": name, "effects": [[dic[base], kind]]})
                break
    return out

def write_resources():
    """Daftar resource + kategori (dipakai aturan boost Bud). Kategori crop: dari harvestSeconds, sama seperti isBasicCrop/isAdvancedCrop di game."""
    crops_ts, fruits_ts, animals_ts = (get("features/game/types/" + f) for f in ("crops.ts", "fruits.ts", "animals.ts"))

    def hs(ts, name):
        out = {}
        for e in entries(block(ts, name)):
            m = re.search(r"harvestSeconds:\s*([\d\s*+()]+)", e["body"])
            out[e["name"]] = eval(m.group(1)) if m else None
        return out

    crops = hs(crops_ts, "CROPS")
    basic_max, adv_min = crops["Pumpkin"], crops["Eggplant"]
    rows = []
    for n, sec in crops.items():
        tier = "basic" if sec <= basic_max else "advanced" if sec >= adv_min else "medium"
        rows.append({"name": n, "kind": "crop", "tier": tier})
    rows += [{"name": e["name"], "kind": "gh-crop"} for e in entries(block(crops_ts, "GREENHOUSE_CROPS"))]
    for tbl in ("PATCH_FRUIT", "GREENHOUSE_FRUIT"):
        rows += [{"name": e["name"], "kind": "fruit"} for e in entries(block(fruits_ts, tbl))]
    rows += [{"name": n, "kind": "mineral"} for n in ("Stone", "Iron", "Gold")]
    rows += [{"name": "Wood", "kind": "wood"}, {"name": "Wild Mushroom", "kind": "mushroom"}, {"name": "Magic Mushroom", "kind": "mushroom"}]
    drops = block(animals_ts, "ANIMAL_RESOURCE_DROP")
    for n in dict.fromkeys(re.findall(r"\b(Egg|Feather|Milk|Leather|Wool|Merino Wool)\b", drops)):
        rows.append({"name": n, "kind": "animal"})
    seen, uniq = set(), []
    for r in rows:
        if (r["name"], r["kind"]) not in seen:
            seen.add((r["name"], r["kind"])); uniq.append(r)
    with open(os.path.join(OUT, "resources.js"), "w", encoding="utf8") as f:
        f.write("// Daftar resource + kategori untuk aturan boost Bud.\n// DIHASILKAN oleh tools/update_item_data.py - jangan edit manual.\n")
        f.write("// kind: crop (plot; tier basic|medium|advanced), gh-crop, fruit, mineral, wood, mushroom, animal\n")
        f.write("export const RESOURCES = [\n" + js_items(uniq) + "\n];\n")
    print(f"resources={len(uniq)}")

def write_crops():
    """Data crop plot untuk kalkulator: harga seed/jual, waktu panen, kategori, musim, level."""
    crops_ts, seeds_ts = get("features/game/types/crops.ts"), get("features/game/types/seeds.ts")
    num = lambda m: eval(m.group(1)) if m else None
    crops = {}
    for e in entries(block(crops_ts, "CROPS")):
        crops[e["name"]] = {"sell": num(re.search(r"sellPrice:\s*([\d.*\s()+]+)", e["body"])),
                            "seconds": num(re.search(r"harvestSeconds:\s*([\d.*\s()+]+)", e["body"]))}
    seeds = {}
    for e in entries(block(crops_ts, "CROP_SEEDS")):
        y = re.search(r'yield:\s*"([^"]+)"', e["body"])
        lv = re.search(r"bumpkinLevel:\s*\{\s*ascension:\s*(\d+),\s*level:\s*(\d+)", e["body"])
        if y:
            seeds[y.group(1)] = {"seed": e["name"], "price": num(re.search(r"price:\s*([\d.*\s()+]+)", e["body"])),
                                 "ascension": int(lv.group(1)) if lv else 0, "level": int(lv.group(2)) if lv else 1}
    season_src = block(seeds_ts, "SEASONAL_SEEDS")
    seasons = {sn: re.findall(r'"([^"]+ Seed)"', re.search(sn + r":\s*\[(.*?)\]", season_src, re.S).group(1))
               for sn in ("spring", "summer", "autumn", "winter")}
    basic_max, adv_min, overnight = crops["Pumpkin"]["seconds"], crops["Eggplant"]["seconds"], crops["Radish"]["seconds"]
    rows = []
    for n, c in crops.items():
        sd = seeds.get(n)
        if not sd:
            continue
        sec = c["seconds"]
        rows.append({"name": n, "seed": sd["seed"], "seedPrice": sd["price"], "sellPrice": c["sell"], "seconds": sec,
                     "tier": "basic" if sec <= basic_max else "advanced" if sec >= adv_min else "medium",
                     "overnight": sec >= overnight, "seasons": [k for k, v in seasons.items() if sd["seed"] in v],
                     "ascension": sd["ascension"], "level": sd["level"]})
    with open(os.path.join(OUT, "crops.js"), "w", encoding="utf8") as f:
        f.write("// Data crop plot (harga dalam coins, waktu dalam detik, tanpa boost).\n// DIHASILKAN oleh tools/update_item_data.py - jangan edit manual.\n")
        f.write("export const CROPS = [\n" + js_items(rows) + "\n];\n")
    print(f"crops={len(rows)}")

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
            collectibles.append({"name": it["name"], "group": grp, "effects": ef})

    wearables = []
    for src in (block(wear, "BUMPKIN_ITEM_BUFF_LABELS"), block(wear, "SPECIAL_ITEM_LABELS")):
        for it in entries(src):
            ef = effects(it["body"], dic, None, wear)
            if ef and it["name"] not in {w["name"] for w in wearables}:
                wearables.append({"name": it["name"], "effects": ef})

    # Collectible permanen vs sementara/sekali pakai.
    #  - Sementara: item berdurasi (totem, hourglass, shrine) dan pupuk/consumable (grup "Fertilisers").
    CONSUMABLE_GROUPS = {"Fertilisers"}
    permanent, temp = [], []
    for c in collectibles:
        if c["name"] in hours:
            temp.append({"name": c["name"], "group": "Shrine" if c["name"].endswith("Shrine") else "Totem & Hourglass",
                         "hours": hours[c["name"]], "effects": c["effects"]})
        elif c["group"] in CONSUMABLE_GROUPS:
            temp.append({"name": c["name"], "group": "Pupuk & Consumable", "effects": c["effects"]})
        else:
            permanent.append(c)
    for f in helper_fertilisers(col, dic):
        temp.append({"name": f["name"], "group": "Pupuk & Consumable", "effects": f["effects"]})
    order = {"Totem & Hourglass": 0, "Shrine": 1, "Pupuk & Consumable": 2}
    temp.sort(key=lambda t: order[t["group"]])
    collectibles = permanent

    def write(fn, head, const, rows):
        with open(os.path.join(OUT, fn), "w", encoding="utf8") as f:
            f.write(f"// {head}\n// DIHASILKAN oleh tools/update_item_data.py - jangan edit manual.\n")
            f.write(f"export const {const} = [\n{js_items(rows)}\n];\n")

    write("collectibles.js", "Boost collectible PERMANEN. Format: { name, group, effects: [[teks, tipe], ...] }", "COLLECTIBLES", collectibles)
    write("wearables.js", "Boost wearable. Format: { name, effects: [[teks, tipe], ...] }", "WEARABLES", wearables)
    write("temporary.js", "Item sementara/sekali pakai (totem, hourglass, shrine, pupuk). Format: { name, group, hours?, effects }", "TEMPORARY_ITEMS", temp)
    write_resources()
    write_crops()
    print(f"collectibles(permanen)={len(collectibles)} wearables={len(wearables)} temporary={len(temp)}")

main()
