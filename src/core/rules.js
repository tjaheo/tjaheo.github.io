// Aturan skill tree: biaya, syarat tier, island, rank (Ascension Shard).
import { state } from "../state.js";
import { SKILLS } from "../data/skills/index.js";
import { CATEGORIES } from "../data/categories.js";
import { TIER_COST, TIER_REQUIRE, ISLAND_ORDER, MAX_RANK, UPGRADE_POINTS } from "../data/tiers.js";
import { pointsForLevel } from "./level.js";

export const cost = (s) => s.points ?? TIER_COST[s.tier] ?? 1;

// --- Rank ---
export const rankOf = (s) => (s.upgrade && state.selected.has(s.name) ? state.ranks[s.name] ?? 1 : state.selected.has(s.name) ? 1 : 0);
export const upgradeCost = (tier) => ({ points: UPGRADE_POINTS[tier] ?? 0, shards: tier });
const extraPoints = (s) => (s.upgrade ? upgradeCost(s.tier).points * (rankOf(s) - 1) : 0);
const extraShards = (s) => (s.upgrade ? upgradeCost(s.tier).shards * (rankOf(s) - 1) : 0);

const chosen = (c) => (SKILLS[c] || []).filter((s) => state.selected.has(s.name));

// Poin untuk syarat tier: hanya poin dasar (upgrade rank tidak dihitung, sama seperti game).
export const spent = (c, maxTier = 99) => chosen(c).filter((s) => s.tier <= maxTier).reduce((n, s) => n + cost(s), 0);
// Poin terpakai sesungguhnya (dasar + upgrade rank).
export const usedPoints = (c) => chosen(c).reduce((n, s) => n + cost(s) + extraPoints(s), 0);
export const totalPoints = () => CATEGORIES.reduce((n, c) => n + usedPoints(c), 0);
export const available = () => pointsForLevel(Math.max(0, state.level));
export const shardsUsed = () => CATEGORIES.reduce((n, c) => n + chosen(c).reduce((m, s) => m + extraShards(s), 0), 0);

export const need = (c, t) => (TIER_REQUIRE[c] || TIER_REQUIRE.default)[t] ?? 0;
export const unlocked = (c, t) => t <= 1 || spent(c, t - 1) >= need(c, t);
export const validCat = (c) => (SKILLS[c] || []).every((s) => !state.selected.has(s.name) || unlocked(c, s.tier));

export const islandOk = (s) => {
  const { island } = state;
  if (!island || !s.island) return true;
  const have = ISLAND_ORDER.indexOf(island);
  return have < 0 || have >= ISLAND_ORDER.indexOf(s.island);
};

// Alasan rank tidak bisa dinaikkan (null = bisa). Aturan sama dengan game:
// butuh tier tree terbuka (min(3, tier + rank sekarang)), skill point, dan Ascension Shard.
export function rankUpProblem(cat, s) {
  const rank = rankOf(s);
  if (!s.upgrade || rank < 1) return "Pilih skill ini dulu sebelum di-upgrade.";
  if (rank >= MAX_RANK) return `${s.name} sudah di rank maksimum.`;
  const tierNeeded = Math.min(3, s.tier + rank);
  if (!unlocked(cat, tierNeeded)) return `Rank ${rank + 1} butuh Tier ${tierNeeded} di tree ${cat} terbuka.`;
  const up = upgradeCost(s.tier);
  if (totalPoints() + up.points > available()) return `Skill Points tidak cukup (butuh ${up.points}, sisa ${available() - totalPoints()}).`;
  if (state.shards !== null && shardsUsed() + up.shards > state.shards) return `Ascension Shard tidak cukup (butuh ${up.shards}, sisa ${state.shards - shardsUsed()}).`;
  return null;
}

// Pasang rank dari data farm (bumpkin.skills: nilai = rank). Mengembalikan Shard yang sudah terpakai.
export function applyRanks(skills) {
  state.ranks = {};
  Object.values(SKILLS).flat().forEach((s) => {
    const v = Math.floor(Number(skills?.[s.name] ?? 0));
    if (s.upgrade && state.selected.has(s.name)) state.ranks[s.name] = Math.max(1, Math.min(MAX_RANK, v || 1));
  });
  return shardsUsed();
}
