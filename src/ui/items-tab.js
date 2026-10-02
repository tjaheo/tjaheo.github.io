// Grid item yang bisa dipilih (gaya tab Skills): ketuk ikon = pilih/lepas, lihat efek di panel bawah.
// Gembok (state.locked) mencegah pilihan berubah saat hanya ingin melihat efek.
// Dipakai tab Collectibles, Wearables, dan Temporary Buffs.
import { state } from "../state.js";
import { el, initials } from "../utils/dom.js";
import { renderLockHeader } from "./header.js";

const pickedOf = (id) => (state.picked[id] ??= new Set());
const viewOf = (id) => (state.view[id] ??= { q: "", g: "Semua" });

/**
 * o: {
 *   id,                                  nama tab (kunci state)
 *   items: [{ name, group?, effects }],  effects: [[teks, tipe], ...]
 *   notes(item) -> [teks]                info tambahan di panel detail
 * }
 */
export function renderItems(panel, render, o) {
  const picked = pickedOf(o.id);
  const v = viewOf(o.id);

  renderLockHeader(panel, render, {
    title: `${o.id}: ${picked.size} dipilih`,
    onClear: () => { picked.clear(); state.itemActive[o.id] = null; },
  });

  const search = el("input");
  search.type = "search";
  search.placeholder = "Cari item atau efek...";
  search.value = v.q;
  search.setAttribute("aria-label", "Cari item");
  panel.append(search);

  const groups = [...new Set(o.items.map((i) => i.group).filter(Boolean))];
  const chips = el("div", "chips");
  ["Semua", "Terpilih", ...groups].forEach((g) => {
    const b = el("button", "chip", g);
    b.setAttribute("aria-pressed", v.g === g);
    b.onclick = () => { v.g = g; render(); };
    chips.append(b);
  });
  panel.append(chips);

  const grid = el("div");
  panel.append(grid);
  const detail = el("div", "detail");
  panel.append(detail);
  const summary = el("div");
  panel.append(summary);

  const tile = (i) => {
    const b = el("button", "skill", initials(i.name));
    b.title = i.name;
    b.setAttribute("aria-label", i.name);
    b.setAttribute("aria-pressed", picked.has(i.name));
    b.onclick = () => {
      state.itemActive[o.id] = i;
      if (!state.locked) picked.has(i.name) ? picked.delete(i.name) : picked.add(i.name);
      render();
    };
    return b;
  };

  const fillGrid = () => {
    const q = v.q.trim().toLowerCase();
    const rows = o.items.filter((i) =>
      (v.g === "Semua" || (v.g === "Terpilih" ? picked.has(i.name) : i.group === v.g))
      && (!q || i.name.toLowerCase().includes(q) || i.effects.some(([t]) => t.toLowerCase().includes(q))));
    grid.textContent = "";
    if (!rows.length) {
      grid.append(el("p", "empty", v.g === "Terpilih" ? "Belum ada item yang dipilih." : "Tidak ada item yang cocok."));
      return;
    }
    const sections = groups.length && (v.g === "Semua" || v.g === "Terpilih") ? groups : [null];
    sections.forEach((g) => {
      const part = g ? rows.filter((i) => i.group === g) : rows;
      if (!part.length) return;
      if (g) grid.append(el("h3", "", g));
      const row = el("div", "tier");
      part.forEach((i) => row.append(tile(i)));
      grid.append(row);
    });
  };
  search.oninput = () => { v.q = search.value; fillGrid(); };
  fillGrid();

  // Panel efek item yang diketuk.
  const a = state.itemActive[o.id];
  if (!a) {
    detail.textContent = state.locked
      ? "Terkunci: ketuk item untuk melihat efeknya (pilihan tidak berubah)."
      : "Ketuk item untuk memilih dan melihat efeknya.";
  } else {
    detail.append(el("div", "", `${a.name}${picked.has(a.name) ? " (dipilih)" : ""}${a.group ? ` - ${a.group}` : ""}`));
    a.effects.forEach(([text, kind]) => detail.append(el("div", `fx fx-${kind}`, text)));
    (o.notes?.(a) ?? []).forEach((t) => detail.append(el("div", "note", t)));
  }

  // Ringkasan efek semua item terpilih.
  const chosen = o.items.filter((i) => picked.has(i.name));
  if (chosen.length) {
    const d = el("details", "rules");
    d.append(el("summary", "", `Ringkasan efek terpilih (${chosen.length})`));
    chosen.forEach((i) => {
      const r = el("div", "sum-row");
      r.append(el("strong", "", i.name));
      i.effects.forEach(([text, kind]) => r.append(el("div", `fx fx-${kind}`, text)));
      d.append(r);
    });
    summary.append(d);
  }
}
