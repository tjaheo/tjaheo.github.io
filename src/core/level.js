import { LEVEL_XP } from "../data/level-xp.js";

// Port dari features/game/lib/level.ts (Sunflower Land).
const PRE_MAX = 150;          // level maksimum sebelum Ascension
const PER_ASC = 50;           // jumlah level per band Ascension
const UPS = PER_ASC - 1;      // 49 kenaikan level per band
const WEIGHT = UPS + 0.03 * ((UPS * PER_ASC) / 2); // 85.75

// Total skill point = total level (1 poin per level, termasuk level band Ascension).
export const pointsForLevel = (level) => level;

// XP total satu band Ascension a (dibulatkan ke 5 juta).
export const bandXp = (a) => Math.round((50e6 * Math.pow(1.45, a - 1)) / 5e6) * 5e6;

// XP untuk naik dari level n ke n+1 dalam band a (n = 1..49).
export const levelXp = (a, n) => (bandXp(a) * (1 + 0.03 * n)) / WEIGHT;

// XP kumulatif saat mencapai awal band Ascension a.
export function baseline(a) {
  let xp = LEVEL_XP[PRE_MAX - 1];
  for (let b = 1; b < a; b++) xp += bandXp(b);
  return xp;
}

// Posisi level pemain. asc = farm.island.ascensionLevel (0 = belum Ascension).
// Hasil: { ascension, level, ready, progress, toNext }
//  - asc 0: level 1..150 dari tabel XP.
//  - asc >= 1: level 0..50 di dalam band; level 50 + ready = siap ascend lagi.
export function ascensionInfo(xp, asc = 0) {
  if (asc < 1) {
    let level = 1;
    for (let i = 0; i < PRE_MAX; i++) if (xp >= LEVEL_XP[i]) level = i + 1;
    const ready = xp >= LEVEL_XP[PRE_MAX - 1];
    if (level >= PRE_MAX) {
      return { ascension: 0, level, ready, progress: xp - LEVEL_XP[PRE_MAX - 1], toNext: LEVEL_XP[PRE_MAX - 1] - LEVEL_XP[PRE_MAX - 2] };
    }
    return { ascension: 0, level, ready, progress: xp - LEVEL_XP[level - 1], toNext: LEVEL_XP[level] - LEVEL_XP[level - 1] };
  }

  const base = baseline(asc);
  if (xp < base) return { ascension: asc, level: 0, ready: false, progress: 0, toNext: base - xp };
  if (xp >= base + bandXp(asc)) {
    const span = levelXp(asc, UPS);
    return { ascension: asc, level: PER_ASC, ready: true, progress: span, toNext: span };
  }
  let level = 1, start = base;
  for (let n = 1; n < UPS; n++) {
    const next = start + levelXp(asc, n);
    if (xp >= next) { level = n + 1; start = next; } else break;
  }
  return { ascension: asc, level, ready: false, progress: xp - start, toNext: levelXp(asc, level) };
}

// Total level Bumpkin (dasar skill point). Setara getTotalBumpkinLevel di game:
// A1 L1 = 151, A1 L50 = 200, A2 L25 = 225.
export function totalLevel(xp, asc = 0) {
  const i = ascensionInfo(xp, asc);
  return asc < 1 ? i.level : PRE_MAX + (asc - 1) * PER_ASC + i.level;
}
