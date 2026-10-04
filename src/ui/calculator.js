// Halaman Calculator (terpisah dari Combo Maker). Tata letak mengikuti sflhub:
// tab atas (Crops / CM / Fruits / GH, Minerals, Animals) dan sub-tab (Crops, Crop Machine, Fruits, Greenhouse).
// Kalkulator memakai boost yang dipilih di halaman Combo Maker.
import { state } from "../state.js";
import { el } from "../utils/dom.js";
import { renderCropsCalc } from "./crops-calc.js";

const GROUPS = [["crops", "Crops / CM / Fruits / GH"], ["minerals", "Minerals"], ["animals", "Animals"]];
const SUBS = [["crops", "Crops"], ["cm", "Crop Machine"], ["fruits", "Fruits"], ["gh", "Greenhouse"]];

function soon(box, name) {
  box.append(el("p", "empty", `Kalkulator ${name} belum tersedia di versi ini. Nantinya memakai pilihan boost yang sama dari Combo Maker.`));
}

export function renderCalculator(panel, render) {
  const c = state.calc;
  const tabs = el("div", "tabs");
  tabs.setAttribute("role", "tablist");
  GROUPS.forEach(([key, label]) => {
    const b = el("button", "tab", label);
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", key === c.group);
    b.onclick = () => { c.group = key; render(); };
    tabs.append(b);
  });
  panel.append(tabs);

  const box = el("div", "calc-box");
  panel.append(box);
  if (c.group !== "crops") return soon(box, GROUPS.find(([k]) => k === c.group)[1]);

  const subs = el("div", "chips");
  SUBS.forEach(([key, label]) => {
    const b = el("button", "chip", label);
    b.setAttribute("aria-pressed", key === c.sub);
    b.onclick = () => { c.sub = key; render(); };
    subs.append(b);
  });
  box.append(subs);
  if (c.sub === "crops") renderCropsCalc(box, render);
  else soon(box, SUBS.find(([k]) => k === c.sub)[1]);
}
