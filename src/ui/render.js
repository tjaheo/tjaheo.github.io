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
import { renderCalculator } from "./calculator.js";

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
  const calc = state.page === "calc";
  // Halaman Calculator berdiri sendiri: tab dan statistik Combo Maker disembunyikan.
  $("tabs").hidden = calc;
  $("statRow").hidden = calc;
  $("navCombo").setAttribute("aria-current", String(!calc));
  $("navCalc").setAttribute("aria-current", String(calc));
  renderTabs(render);
  renderStats();
  const panel = $("panel");
  panel.textContent = "";
  panel.classList.toggle("calc-page", calc);
  if (calc) return renderCalculator(panel, render);
  const draw = RENDERERS[state.tab];
  if (draw) draw(panel, render);
  else panel.append(el("p", "empty", `Tab ${state.tab} belum diisi.`));
}
