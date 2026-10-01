import { state } from "../state.js";
import { $, el } from "../utils/dom.js";
import { TABS } from "../config.js";

export function renderTabs(render) {
  const box = $("tabs");
  box.textContent = "";
  TABS.forEach((t) => {
    const b = el("button", "tab", t);
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", t === state.tab);
    b.onclick = () => { state.tab = t; render(); };
    box.append(b);
  });
}
