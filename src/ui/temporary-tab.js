// Tab Temporary Buffs: buff sementara (Power hour), item berdurasi (totem, hourglass, shrine),
// dan pupuk/consumable (Rapid Root dst.).
import { el } from "../utils/dom.js";
import { fmtDate, fmtDuration, hoursText } from "../utils/format.js";
import { TEMP_ITEMS } from "../core/catalog.js";
import { activeWindow, lastWindow, collectibleOwned, hasFarm } from "../core/ownership.js";
import { renderItems } from "./items-tab.js";

function renderActive(panel, now) {
  panel.append(el("h3", "", "Aktif sekarang"));
  if (!hasFarm()) return panel.append(el("p", "empty", "Sinkronkan farm lewat sidebar untuk melihat buff yang sedang aktif."));
  const active = TEMP_ITEMS.map((i) => [i, activeWindow(i, now)]).filter(([, w]) => w);
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
  renderActive(panel, Date.now());
  renderItems(panel, render, {
    id: "Temporary Buffs",
    items: TEMP_ITEMS,
    notes: (i) => {
      const notes = [];
      if (i.hours && !i.effects.some(([t]) => t.startsWith("Lasts for"))) notes.push(`Durasi: ${hoursText(i.hours)}`);
      if (hasFarm()) {
        if (!i.buff) {
          const own = collectibleOwned(i.name);
          notes.push(own ? `Dimiliki x${own}` : "Belum dimiliki.");
        }
        const w = lastWindow(i);
        if (w) notes.push(`Terakhir aktif: ${fmtDate(w.start)} - ${fmtDate(w.end)}`);
      }
      return notes;
    },
  });
}
