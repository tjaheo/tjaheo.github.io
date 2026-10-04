// Menyimpan input kalkulator (mode, plot, jumlah seed per crop, dll.) di localStorage.
import { state } from "../state.js";
import { loadJson, saveJson } from "../utils/storage.js";

const KEY = "calc";
const SAVED = ["mode", "restock", "plots", "fert", "warehouse", "allSeasons", "seeds", "fee", "p2p"];

export function loadCalc() {
  const saved = loadJson(KEY) || {};
  SAVED.forEach((k) => { if (saved[k] !== undefined) state.calc[k] = saved[k]; });
}

export function saveCalc() {
  saveJson(KEY, Object.fromEntries(SAVED.map((k) => [k, state.calc[k]])));
}
