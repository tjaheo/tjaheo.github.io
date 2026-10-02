// Satu-satunya tempat state aplikasi disimpan.
export const state = {
  tab: "Skills",
  cat: "Mining",
  active: null,      // skill yang sedang diketuk
  shards: null,      // total Ascension Shard yang bisa dipakai (null = belum sinkron, tanpa batas)
  island: null,      // tipe island farm
  asc: null,         // info level Ascension dari farm ({ ascension, level, ready, ... })
  locked: false,     // mode baca (tidak bisa ubah pilihan)
  level: 0,          // total level Bumpkin
  legacyOwned: new Set(),
  selected: new Set(),
  farm: null,        // data farm hasil sinkron (untuk kepemilikan item)
  view: {},          // filter/pencarian per tab item
  ranks: {},         // nama skill -> rank 1..3 (hanya skill yang bisa di-upgrade)
};
