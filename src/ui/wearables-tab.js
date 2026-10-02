import { WEARABLES } from "../data/wearables.js";
import { wearableOwned, wearableEquipped, hasFarm } from "../core/ownership.js";
import { renderItems } from "./items-tab.js";

export function renderWearables(panel, render) {
  renderItems(panel, render, {
    id: "Wearables",
    items: WEARABLES,
    notes: (i) => {
      if (!hasFarm()) return [];
      const own = wearableOwned(i.name);
      if (!own) return ["Belum dimiliki."];
      return [`Dimiliki x${own}${wearableEquipped(i.name) ? " - sedang dipakai" : ""}`];
    },
  });
}
