// Daftar item dengan pencarian, filter kepemilikan, dan (opsional) filter grup.
// Dipakai oleh tab Collectibles, Wearables, dan Temporary Buffs.
import { state } from "../state.js";
import { el } from "../utils/dom.js";
import { hasFarm } from "../core/ownership.js";

const FILTERS = [["all", "Semua"], ["owned", "Dimiliki"], ["missing", "Belum dimiliki"]];

function view(id) {
  return (state.view[id] ??= { q: "", f: "all", g: "Semua" });
}

/**
 * opts: {
 *   id, items: [{ name, group?, effects: [[teks, tipe]] }],
 *   owned(item) -> jumlah (dipakai filter),
 *   badges(item) -> [teks], notes(item) -> [teks],
 * }
 */
export function renderItems(panel, render, opts) {
  const v = view(opts.id);
  const farm = hasFarm();
  if (!farm && v.f !== "all") v.f = "all";

  const bar = el("div", "toolbar");
  const search = el("input");
  search.type = "search";
  search.placeholder = "Cari item...";
  search.value = v.q;
  search.setAttribute("aria-label", "Cari item");
  bar.append(search);
  panel.append(bar);

  const filters = el("div", "chips tight");
  FILTERS.forEach(([key, label]) => {
    const b = el("button", "chip", label);
    b.setAttribute("aria-pressed", v.f === key);
    b.disabled = key !== "all" && !farm;
    b.title = b.disabled ? "Sinkronkan farm lewat sidebar dulu" : "";
    b.onclick = () => { v.f = key; render(); };
    filters.append(b);
  });
  panel.append(filters);

  const groups = [...new Set(opts.items.map((i) => i.group).filter(Boolean))];
  if (groups.length) {
    const row = el("div", "chips tight");
    ["Semua", ...groups].forEach((g) => {
      const b = el("button", "chip", g);
      b.setAttribute("aria-pressed", v.g === g);
      b.onclick = () => { v.g = g; render(); };
      row.append(b);
    });
    panel.append(row);
  }

  const count = el("p", "count");
  const list = el("div", "items");
  panel.append(count, list);

  const fill = () => {
    const q = v.q.trim().toLowerCase();
    const rows = opts.items.filter((i) =>
      (v.g === "Semua" || i.group === v.g)
      && (v.f === "all" || (v.f === "owned") === (opts.owned(i) > 0))
      && (!q || i.name.toLowerCase().includes(q) || i.effects.some(([t]) => t.toLowerCase().includes(q))));
    count.textContent = `${rows.length} item`;
    list.textContent = "";
    if (!rows.length) list.append(el("p", "empty", "Tidak ada item yang cocok."));
    rows.forEach((i) => list.append(card(i, opts, farm)));
  };
  search.oninput = () => { v.q = search.value; fill(); };
  fill();
}

function card(item, opts, farm) {
  const own = farm ? opts.owned(item) : 0;
  const c = el("article", "item" + (farm && own > 0 ? " owned" : ""));
  const head = el("div", "item-head");
  head.append(el("strong", "", item.name));
  const tags = el("span", "tags");
  if (farm && own > 0) tags.append(el("span", "tag", `x${own}`));
  (farm ? opts.badges?.(item) ?? [] : []).forEach((t) => tags.append(el("span", "tag alt", t)));
  head.append(tags);
  c.append(head);
  item.effects.forEach(([text, kind]) => c.append(el("div", `fx fx-${kind}`, text)));
  (opts.notes?.(item) ?? []).forEach((t) => c.append(el("div", "note", t)));
  return c;
}
