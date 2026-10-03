// Perhitungan boost Bud (port dari getBudYieldBoosts.ts): aura x (type + stem), Bud terbaik per resource.
import { state } from "../state.js";
import { RESOURCES } from "../data/resources.js";
import { AURA_MULTIPLIER, TYPE_RULES, STEM_RULES } from "../data/buds.js";

const matches = (m, r) =>
  (!m.kind || m.kind.includes(r.kind)) && (!m.tier || m.tier === r.tier) && (!m.names || m.names.includes(r.name));

export const auraOf = (bud) => AURA_MULTIPLIER[bud.aura] ?? 1;

const traitBoost = (rules, trait, r) =>
  rules.filter((x) => x.trait === trait && matches(x.match, r)).reduce((n, x) => n + x.boost, 0);

export const budBoost = (bud, r) =>
  Number((auraOf(bud) * (traitBoost(TYPE_RULES, bud.type, r) + traitBoost(STEM_RULES, bud.stem, r))).toFixed(4));

// Boost terbaik tiap resource dari Bud yang dipasang: [{ resource, kind, boost, bud }] (hanya boost > 0).
export function bestBoosts(buds = state.buds) {
  const placed = buds.filter((b) => b.placed);
  const out = [];
  RESOURCES.forEach((r) => {
    let best = null;
    placed.forEach((b) => {
      const v = budBoost(b, r);
      if (v > 0 && (!best || v > best.boost)) best = { resource: r.name, kind: r.kind, boost: v, bud: b };
    });
    if (best) out.push(best);
  });
  return out;
}

// Teks efek satu Bud (type dan stem yang berlaku, sudah dikali aura).
export function budLines(bud) {
  const aura = auraOf(bud);
  const pct = (v) => `${Math.round(v * aura * 10000) / 100}%`;
  const lines = [];
  TYPE_RULES.filter((x) => x.trait === bud.type).forEach((x) => lines.push([`Type ${x.trait}: +${pct(x.boost)} ${x.label}`, "success"]));
  STEM_RULES.filter((x) => x.trait === bud.stem).forEach((x) => lines.push([`Stem ${x.trait}: +${pct(x.boost)} ${x.label}`, "success"]));
  return lines.length ? lines : [["Tidak ada boost dari type/stem Bud ini.", "info"]];
}

// Bud dari data farm: { id, type, stem, aura, placed }.
export const budsFromFarm = (farmBuds) =>
  Object.entries(farmBuds || {}).map(([id, b]) => ({ id: `#${id}`, type: b.type, stem: b.stem, aura: b.aura, placed: !!b.coordinates }));
