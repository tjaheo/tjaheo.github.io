import { COLLECTIBLES } from "../data/collectibles.js";
import { collectibleOwned, collectiblePlaced } from "../core/ownership.js";
import { renderItems } from "./items-tab.js";

export function renderCollectibles(panel, render) {
  renderItems(panel, render, {
    id: "Collectibles",
    items: COLLECTIBLES,
    owned: (i) => collectibleOwned(i.name),
    badges: (i) => {
      const placed = collectiblePlaced(i.name);
      return collectibleOwned(i.name) > 0 ? [placed ? `Terpasang ${placed}` : "Belum dipasang"] : [];
    },
  });
}
