import { state } from "../state.js";
import { $, el } from "../utils/dom.js";
import { renderTabs } from "./tabs.js";
import { renderStats } from "./stats.js";
import { renderSkills } from "./skills-tab.js";
import { renderUpdates } from "./updates-tab.js";
import { renderCollectibles } from "./collectibles-tab.js";
import { renderWearables } from "./wearables-tab.js";
import { renderBuds } from "./buds-tab.js";
import { renderTemporary } from "./temporary-tab.js";

// Daftar renderer per tab. Tab baru: tambahkan di sini.
const RENDERERS = {
  "Skills": renderSkills,
  "Collectibles": renderCollectibles,
  "Wearables": renderWearables,
  "Buds": renderBuds,
  "Temporary Buffs": renderTemporary,
  "Updates Made": renderUpdates,
};

export function render() {
  renderTabs(render);
  renderStats();
  const panel = $("panel");
  panel.textContent = "";
  const draw = RENDERERS[state.tab];
  if (draw) draw(panel, render);
  else panel.append(el("p", "empty", `Tab ${state.tab} belum diisi.`));
}
