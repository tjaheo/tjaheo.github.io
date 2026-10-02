import { COLLECTIBLES } from "../data/collectibles.js";
import { collectibleOwned, collectiblePlaced, hasFarm } from "../core/ownership.js";
import { renderItems } from "./items-tab.js";

// Hanya boost permanen. Pupuk/consumable dan item berdurasi ada di tab Temporary Buffs.
export function renderCollectibles(panel, render) {
  renderItems(panel, render, {
    id: "Collectibles",
    items: COLLECTIBLES,
    notes: (i) => {
      if (!hasFarm()) return [];
      const own = collectibleOwned(i.name);
      if (!own) return ["Belum dimiliki."];
      const placed = collectiblePlaced(i.name);
      return [`Dimiliki x${own} - ${placed ? `terpasang ${placed}` : "belum dipasang (boost tidak aktif)"}`];
    },
  });
}
