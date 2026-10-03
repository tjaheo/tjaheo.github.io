// Tab Buds: tambah Bud (type, stem, aura), lihat boost tiap Bud dan boost terbaik per resource.
// Gembok (state.locked) menyembunyikan form dan mencegah perubahan, sama seperti tab lain.
import { state } from "../state.js";
import { el } from "../utils/dom.js";
import { TYPES, STEMS, AURA_MULTIPLIER, TYPE_RULES, STEM_RULES } from "../data/buds.js";
import { auraOf, budLines, bestBoosts } from "../core/buds.js";
import { renderLockHeader } from "./header.js";

const pct = (v) => `${Math.round(v * 10000) / 100}%`;
const KIND_LABEL = { crop: "Crops", "gh-crop": "Greenhouse", fruit: "Fruit", mineral: "Mineral", wood: "Wood", mushroom: "Mushroom", animal: "Animal produce" };

function select(label, options, value, onChange) {
  const wrap = el("label", "field");
  wrap.append(el("span", "", label));
  const s = el("select");
  options.forEach((o) => { const op = el("option", "", o); op.value = o; op.selected = o === value; s.append(op); });
  s.onchange = () => onChange(s.value);
  wrap.append(s);
  return wrap;
}

function renderForm(panel, render) {
  const f = (state.budForm ??= { type: TYPES[0], stem: STEMS[0], aura: "No Aura" });
  const form = el("div", "bud-form");
  form.append(
    select("Type", TYPES, f.type, (v) => { f.type = v; }),
    select("Stem", STEMS, f.stem, (v) => { f.stem = v; }),
    select("Aura", Object.keys(AURA_MULTIPLIER), f.aura, (v) => { f.aura = v; }),
  );
  const add = el("button", "go", "Tambah Bud");
  add.onclick = () => {
    state.budSeq = (state.budSeq ?? 0) + 1;
    state.buds.push({ id: `Rencana ${state.budSeq}`, type: f.type, stem: f.stem, aura: f.aura, placed: true });
    render();
  };
  form.append(add);
  panel.append(form);
}

function renderList(panel, render) {
  if (!state.buds.length) {
    return panel.append(el("p", "empty", state.locked ? "Belum ada Bud. Buka kunci (gembok) untuk menambah Bud." : "Belum ada Bud. Pilih type, stem, dan aura lalu tekan Tambah Bud."));
  }
  const box = el("div", "items");
  state.buds.forEach((b, i) => {
    const c = el("article", "item" + (b.placed ? " owned" : ""));
    const head = el("div", "item-head");
    head.append(el("strong", "", `Bud ${b.id}`));
    const tags = el("span", "tags");
    tags.append(el("span", "tag alt", b.placed ? "Terpasang" : "Belum dipasang"));
    head.append(tags);
    c.append(head);
    c.append(el("div", "note", `${b.type} - ${b.stem} - Aura ${b.aura} (x${auraOf(b)})`));
    budLines(b).forEach(([t, k]) => c.append(el("div", `fx fx-${k}`, t)));
    if (!state.locked) {
      const row = el("div", "actions");
      const place = el("button", "step", b.placed ? "Cabut" : "Pasang");
      place.onclick = () => { b.placed = !b.placed; render(); };
      const del = el("button", "step", "Hapus");
      del.onclick = () => { state.buds.splice(i, 1); render(); };
      row.append(place, del);
      c.append(row);
    }
    box.append(c);
  });
  panel.append(box);
}

function renderBest(panel) {
  panel.append(el("h3", "", "Boost terbaik per resource"));
  const best = bestBoosts();
  if (!best.length) return panel.append(el("p", "empty", "Belum ada boost. Hanya Bud yang terpasang dan cocok dengan resource yang memberi boost."));
  const d = el("div", "best");
  Object.keys(KIND_LABEL).forEach((k) => {
    const rows = best.filter((r) => r.kind === k);
    if (!rows.length) return;
    d.append(el("div", "best-group", KIND_LABEL[k]));
    rows.forEach((r) => d.append(el("div", "fx fx-success", `${r.resource}: +${pct(r.boost)} (Bud ${r.bud.id})`)));
  });
  panel.append(d);
}

function rules(title, rows) {
  const d = el("details", "rules");
  d.append(el("summary", "", title));
  const ul = el("ul", "list");
  rows.forEach((t) => ul.append(el("li", "", t)));
  d.append(ul);
  return d;
}

export function renderBuds(panel, render) {
  renderLockHeader(panel, render, { title: `Buds: ${state.buds.length}`, clearLabel: "Clear Buds", onClear: () => { state.buds = []; } });
  if (!state.locked) renderForm(panel, render);
  renderList(panel, render);
  renderBest(panel);
  panel.append(el("h3", "", "Aturan boost Bud"));
  panel.append(el("p", "empty", "Boost resource = pengali aura x (boost type + boost stem). Hanya Bud yang dipasang berlaku, dan hanya Bud terbaik per resource yang dipakai."));
  panel.append(rules("Pengali Aura", Object.entries(AURA_MULTIPLIER).map(([a, m]) => `${a}: x${m}`)));
  panel.append(rules("Boost Type", TYPE_RULES.map((r) => `${r.trait}: +${pct(r.boost)} ${r.label}`)));
  panel.append(rules("Boost Stem", STEM_RULES.map((r) => `${r.trait}: +${pct(r.boost)} ${r.label}`)));
}
