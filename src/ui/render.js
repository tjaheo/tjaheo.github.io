import { state } from "../state.js";
import { $, el } from "../utils/dom.js";
import { renderTabs } from "./tabs.js";
import { renderStats } from "./stats.js";
import { renderSkills } from "./skills-tab.js";
import { renderUpdates } from "./updates-tab.js";

// Daftar renderer per tab. Tab baru: tambahkan di sini.
const RENDERERS = {
  "Skills": renderSkills,
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
