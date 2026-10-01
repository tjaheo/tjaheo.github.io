import { LEVEL_XP } from "../data/level-xp.js";

// Total skill point pada level tertentu: 1 poin per level (docs resmi),
// termasuk level setelah Ascension. "level" = total level Bumpkin.
export const pointsForLevel = (level) => level;

// XP total satu band Ascension (level 151-200 dst.).
export function bandXp(a) {
  return Math.round(50e6 * Math.pow(1.45, a - 1) / 5e6) * 5e6;
}

// Total level Bumpkin dari XP. "asc" = farm.island.ascensionLevel (0 jika belum ascend).
// Hasilnya sama dengan getTotalBumpkinLevel di kode game.
export function totalLevel(xp, asc = 0) {
  if (asc < 1) {
    let lv = 1;
    for (let i = 0; i < LEVEL_XP.length; i++) if (xp >= LEVEL_XP[i]) lv = i + 1;
    return lv;
  }
  let base = LEVEL_XP[LEVEL_XP.length - 1];
  for (let b = 1; b < asc; b++) base += bandXp(b);
  let within = 0;
  if (xp >= base) {
    if (xp >= base + bandXp(asc)) within = 50;
    else {
      let start = base; within = 1;
      for (let n = 1; n < 49; n++) {
        const next = start + bandXp(asc) * (1 + 0.03 * n) / 85.75;
        if (xp >= next) { within = n + 1; start = next; } else break;
      }
    }
  }
  return 150 + (asc - 1) * 50 + within;
}
