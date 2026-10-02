// Tab Temporary Buffs: buff sementara (Power hour) dan item berdurasi (totem, hourglass, shrine).
import { state } from "../state.js";
import { el } from "../utils/dom.js";
import { fmtDate, fmtDuration, hoursText } from "../utils/format.js";
import { BUFFS } from "../data/buffs.js";
import { COLLECTIBLES } from "../data/collectibles.js";
import { TEMPORARY_ITEMS } from "../data/temporary.js";
import { boostWindows, collectibleOwned, farmBuff, hasFarm } from "../core/ownership.js";
import { renderItems } from "./items-tab.js";

const byName = new Map(COLLECTIBLES.map((c) => [c.name, c]));
const ITEMS = [
  ...BUFFS.map((b) => ({ ...b, buff: true })),
  ...TEMPORARY_ITEMS.map((t) => ({ name: t.name, hours: t.hours, effects: byName.get(t.name).effects })),
];

// Jendela aktif sekarang untuk satu item: { start, end } atau null.
function activeWindow(item, now) {
  if (item.buff) {
    const b = farmBuff(item.name);
    return b && b.startedAt + b.durationMS > now ? { start: b.startedAt, end: b.startedAt + b.durationMS } : null;
  }
  const w = boostWindows(item.name).find((x) => x.from <= now && now < x.to);
  return w ? { start: w.from, end: w.to } : null;
}

function lastWindow(item) {
  if (item.buff) {
    const b = farmBuff(item.name);
    return b ? { start: b.startedAt, end: b.startedAt + b.durationMS } : null;
  }
  const all = boostWindows(item.name);
  const w = all.reduce((a, x) => (!a || x.to > a.to ? x : a), null);
  return w ? { start: w.from, end: w.to } : null;
}

function renderActive(panel, now) {
  panel.append(el("h3", "", "Aktif sekarang"));
  if (!hasFarm()) return panel.append(el("p", "empty", "Sinkronkan farm lewat sidebar untuk melihat buff yang sedang aktif."));
  const active = ITEMS.map((i) => [i, activeWindow(i, now)]).filter(([, w]) => w);
  if (!active.length) return panel.append(el("p", "empty", "Tidak ada buff sementara yang aktif."));
  const box = el("div", "items");
  active.forEach(([i, w]) => {
    const c = el("article", "item owned");
    c.append(el("strong", "", i.name));
    i.effects.forEach(([t, k]) => c.append(el("div", `fx fx-${k}`, t)));
    c.append(el("div", "note", `Sisa ${fmtDuration(w.end - now)} (berakhir ${fmtDate(w.end)})`));
    box.append(c);
  });
  panel.append(box);
}

export function renderTemporary(panel, render) {
  const now = Date.now();
  renderActive(panel, now);
  panel.append(el("h3", "", "Semua buff dan item sementara"));
  renderItems(panel, render, {
    id: "Temporary Buffs",
    items: ITEMS,
    owned: (i) => (i.buff ? (farmBuff(i.name) ? 1 : 0) : collectibleOwned(i.name)),
    badges: () => [],
    notes: (i) => {
      const notes = [];
      if (i.hours && !i.effects.some(([t]) => t.startsWith("Lasts for"))) notes.push(`Durasi: ${hoursText(i.hours)}`);
      const w = hasFarm() ? lastWindow(i) : null;
      if (w) notes.push(`Terakhir aktif: ${fmtDate(w.start)} - ${fmtDate(w.end)}`);
      return notes;
    },
  });
}
