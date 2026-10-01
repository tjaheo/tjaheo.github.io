import { el } from "../utils/dom.js";
import { UPDATES } from "../data/updates.js";

export function renderUpdates(panel) {
  const ul = el("ul", "list");
  UPDATES.forEach((u) => ul.append(el("li", "", `${u.date}: ${u.note}`)));
  panel.append(ul);
}
