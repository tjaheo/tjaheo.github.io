// Satu-satunya tempat state aplikasi disimpan.
export const state = {
  tab: "Skills",
  cat: "Mining",
  active: null,      // skill yang sedang diketuk
  shards: null,      // Ascension Shard milik farm
  island: null,      // tipe island farm
  locked: false,     // mode baca (tidak bisa ubah pilihan)
  level: 0,          // level Bumpkin
  legacyOwned: new Set(),
  selected: new Set(),
};
