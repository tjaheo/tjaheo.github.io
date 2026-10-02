// Membaca kepemilikan item dari data farm (state.farm). Semua fungsi aman saat farm belum disinkron.
import { state } from "../state.js";

const num = (v) => Number(v ?? 0) || 0;

export const hasFarm = () => !!state.farm;

export const collectibleOwned = (name) => num(state.farm?.inventory?.[name]);

// Jumlah salinan yang terpasang di farm atau home (punya koordinat dan belum dicabut).
export function collectiblePlaced(name) {
  const f = state.farm;
  if (!f) return 0;
  const count = (list) => (list || []).filter((c) => c.coordinates && !c.removedAt).length;
  return count(f.collectibles?.[name]) + count(f.home?.collectibles?.[name]);
}

export const wearableOwned = (name) => num(state.farm?.wardrobe?.[name]);

export const wearableEquipped = (name) =>
  Object.values(state.farm?.bumpkin?.equipped || {}).includes(name);

// Jendela waktu boost dari game (boostHistory) untuk satu item: [{ from, to }].
export const boostWindows = (name) => state.farm?.boostHistory?.[name] ?? [];

// Info buff dari farm.buffs (mis. Power hour): { startedAt, durationMS } atau null.
export const farmBuff = (name) => state.farm?.buffs?.[name] ?? null;

export const budsList = () => Object.entries(state.farm?.buds || {});
