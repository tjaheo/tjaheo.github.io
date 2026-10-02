import { WEARABLES } from "../data/wearables.js";
import { wearableOwned, wearableEquipped } from "../core/ownership.js";
import { renderItems } from "./items-tab.js";

export function renderWearables(panel, render) {
  renderItems(panel, render, {
    id: "Wearables",
    items: WEARABLES,
    owned: (i) => wearableOwned(i.name),
    badges: (i) => (wearableEquipped(i.name) ? ["Dipakai"] : []),
  });
}
