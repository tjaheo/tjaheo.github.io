// Satu-satunya tempat state aplikasi disimpan.
export const state = {
  tab: "Skills",
  cat: "Mining",
  active: null,      // skill yang sedang diketuk
  shards: null,      // total Ascension Shard yang bisa dipakai (null = belum sinkron, tanpa batas)
  island: null,      // island aktif (dari pengaturan; null = belum dipilih)
  settings: null,    // pengaturan farm (lihat core/settings.js)
  asc: null,         // info level Ascension dari farm ({ ascension, level, ready, ... })
  locked: false,     // mode baca (tidak bisa ubah pilihan)
  level: 0,          // total level Bumpkin
  legacyOwned: new Set(),
  selected: new Set(),
  farm: null,        // data farm hasil sinkron (untuk kepemilikan item)
  view: {},          // pencarian/grup per tab item
  picked: {},        // item terpilih per tab (Set nama)
  itemActive: {},    // item yang sedang dilihat efeknya per tab
  buds: [],          // Bud: { id, type, stem, aura, placed }
  calc: { mode: "day", period: "day", fert: "", plots: null, allSeasons: false, open: null }, // kalkulator crops
  ranks: {},         // nama skill -> rank 1..3 (hanya skill yang bisa di-upgrade)
};
