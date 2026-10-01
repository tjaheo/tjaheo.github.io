// Aturan skill tree: biaya, syarat tier, syarat island, poin.
import { state } from "../state.js";
import { SKILLS } from "../data/skills/index.js";
import { CATEGORIES } from "../data/categories.js";
import { TIER_COST, TIER_REQUIRE, ISLAND_ORDER } from "../data/tiers.js";
import { pointsForLevel } from "./level.js";

export const cost = (s) => s.points ?? TIER_COST[s.tier] ?? 1;

export const spent = (c, maxTier = 99) => (SKILLS[c] || [])
  .filter((s) => state.selected.has(s.name) && s.tier <= maxTier)
  .reduce((n, s) => n + cost(s), 0);

export const totalPoints = () => CATEGORIES.reduce((n, c) => n + spent(c), 0);
export const available = () => pointsForLevel(Math.max(0, state.level));

export const need = (c, t) => (TIER_REQUIRE[c] || TIER_REQUIRE.default)[t] ?? 0;
export const unlocked = (c, t) => t <= 1 || spent(c, t - 1) >= need(c, t);
export const validCat = (c) =>
  (SKILLS[c] || []).every((s) => !state.selected.has(s.name) || unlocked(c, s.tier));

export const islandOk = (s) => {
  const { island } = state;
  if (!island || !s.island) return true;
  const have = ISLAND_ORDER.indexOf(island);
  return have < 0 || have >= ISLAND_ORDER.indexOf(s.island);
};
