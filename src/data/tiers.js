// Syarat membuka tier, BEDA di tiap tree (dari kode game). Nilai = total poin yang sudah
// dipakai di tree itu pada tier di bawahnya. Nama tree sama persis dengan nama di game.
export const TIER_REQUIRE = {
  "Crops": { 1: 0, 2: 3, 3: 7 },
  "Mining": { 1: 0, 2: 3, 3: 7 },
  "Compost": { 1: 0, 2: 3, 3: 7 },
  "Aging": { 1: 0, 2: 3, 3: 7 },
  "Animals": { 1: 0, 2: 4, 3: 8 },
  "Trees": { 1: 0, 2: 2, 3: 5 },
  "Fishing": { 1: 0, 2: 2, 3: 5 },
  "Cooking": { 1: 0, 2: 2, 3: 5 },
  "Fruit Patch": { 1: 0, 2: 2, 3: 5 },
  "Bees & Flowers": { 1: 0, 2: 2, 3: 5 },
  "Greenhouse": { 1: 0, 2: 2, 3: 5 },
  "Machinery": { 1: 0, 2: 2, 3: 5 },
  "default": { 1: 0, 2: 2, 3: 5 },
};

// Biaya default per tier. Bisa ditimpa per skill lewat field "points".
export const TIER_COST = { 1: 1, 2: 2, 3: 3 };

// Island minimum yang dibutuhkan sebuah skill (urut dari terendah).
export const ISLAND_ORDER = ["basic", "spring", "desert", "volcano"];
