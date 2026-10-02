import { el } from "../utils/dom.js";
import { AURA_MULTIPLIER, TYPE_BOOSTS, STEM_BOOSTS } from "../data/buds.js";
import { budsList, hasFarm } from "../core/ownership.js";

const pct = (v) => `${Math.round(v * 10000) / 100}%`;

// Boost satu Bud: aura x boost type / stem (hanya aturan yang cocok dengan trait Bud).
function budEffects(bud) {
  const aura = AURA_MULTIPLIER[bud.aura] ?? 1;
  const lines = [];
  TYPE_BOOSTS.filter((r) => r.type === bud.type).forEach((r) => lines.push([`Type ${r.type}: +${pct(r.boost * aura)} ${r.target}`, "success"]));
  STEM_BOOSTS.filter((r) => r.stem === bud.stem).forEach((r) => lines.push([`Stem ${r.stem}: +${pct(r.boost * aura)} ${r.target}`, "success"]));
  if (!lines.length) lines.push(["Tidak ada boost dari type/stem Bud ini.", "info"]);
  return lines;
}

function renderOwned(panel) {
  panel.append(el("h3", "", "Bud milikmu"));
  if (!hasFarm()) return panel.append(el("p", "empty", "Sinkronkan farm lewat sidebar untuk melihat Bud."));
  const buds = budsList();
  if (!buds.length) return panel.append(el("p", "empty", "Belum ada Bud di farm ini."));
  const box = el("div", "items");
  buds.forEach(([id, b]) => {
    const placed = !!b.coordinates;
    const c = el("article", "item" + (placed ? " owned" : ""));
    const head = el("div", "item-head");
    head.append(el("strong", "", `Bud #${id}`));
    const tags = el("span", "tags");
    tags.append(el("span", "tag alt", placed ? "Terpasang" : "Belum dipasang"));
    head.append(tags);
    c.append(head);
    c.append(el("div", "note", `${b.type} - ${b.stem} - Aura ${b.aura} (x${AURA_MULTIPLIER[b.aura] ?? 1}) - ${b.colour} - ${b.ears}`));
    budEffects(b).forEach(([t, k]) => c.append(el("div", `fx fx-${k}`, t)));
    box.append(c);
  });
  panel.append(box);
}

function rules(title, rows) {
  const d = el("details", "rules");
  d.append(el("summary", "", title));
  const ul = el("ul", "list");
  rows.forEach((t) => ul.append(el("li", "", t)));
  d.append(ul);
  return d;
}

export function renderBuds(panel) {
  renderOwned(panel);
  panel.append(el("h3", "", "Aturan boost Bud"));
  panel.append(el("p", "empty", "Boost resource = pengali aura x (boost type + boost stem). Hanya Bud yang dipasang berlaku, dan hanya Bud terbaik per resource yang dipakai."));
  panel.append(rules("Pengali Aura", Object.entries(AURA_MULTIPLIER).map(([a, m]) => `${a}: x${m}`)));
  panel.append(rules("Boost Type", TYPE_BOOSTS.map((r) => `${r.type}: +${pct(r.boost)} ${r.target}`)));
  panel.append(rules("Boost Stem", STEM_BOOSTS.map((r) => `${r.stem}: +${pct(r.boost)} ${r.target}`)));
}
