// Membaca kepemilikan item dari data farm (state.farm). Semua fungsi aman saat farm belum disinkron.
import { state } from "../state.js";
import { COLLECTIBLES } from "../data/collectibles.js";
import { WEARABLES } from "../data/wearables.js";
import { TEMP_ITEMS } from "./catalog.js";

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


// Jendela buff yang sedang berlaku untuk item sementara: { start, end } atau null.
export function activeWindow(item, now = Date.now()) {
  if (item.buff) {
    const b = farmBuff(item.name);
    return b && b.startedAt + b.durationMS > now ? { start: b.startedAt, end: b.startedAt + b.durationMS } : null;
  }
  const w = boostWindows(item.name).find((x) => x.from <= now && now < x.to);
  return w ? { start: w.from, end: w.to } : null;
}

// Jendela buff terakhir (aktif atau sudah berakhir).
export function lastWindow(item) {
  if (item.buff) {
    const b = farmBuff(item.name);
    return b ? { start: b.startedAt, end: b.startedAt + b.durationMS } : null;
  }
  const w = boostWindows(item.name).reduce((a, x) => (!a || x.to > a.to ? x : a), null);
  return w ? { start: w.from, end: w.to } : null;
}

// Setelah sinkron farm: item yang dimiliki otomatis terpilih (Temporary: yang dimiliki atau sedang aktif).
export function syncPicks() {
  state.picked = {
    Collectibles: new Set(COLLECTIBLES.filter((i) => collectibleOwned(i.name) > 0).map((i) => i.name)),
    Wearables: new Set(WEARABLES.filter((i) => wearableOwned(i.name) > 0).map((i) => i.name)),
    "Temporary Buffs": new Set(TEMP_ITEMS.filter((i) => (i.buff ? activeWindow(i) : collectibleOwned(i.name) > 0)).map((i) => i.name)),
  };
  state.itemActive = {};
}
