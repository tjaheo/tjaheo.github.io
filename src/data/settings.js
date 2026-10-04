// Pilihan untuk Pengaturan Farm. Nilai (key) mengikuti nama di data game.
export const ISLANDS = {
  basic: "Basic",
  spring: "Petal Paradise",
  desert: "Desert",
  volcano: "Volcano",
  swamp: "Swamp",
  spooky: "Spooky",
  crystal: "Crystal",
  galaxy: "Galaxy",
  marble: "Marble",
};

export const SEASONS = { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" };

// Event kalender harian (SeasonalEventName di game).
export const EVENTS = {
  tornado: "Tornado",
  tsunami: "Tsunami",
  fullMoon: "Full Moon",
  greatFreeze: "Great Freeze",
  doubleDelivery: "Double Delivery",
  bountifulHarvest: "Bountiful Harvest",
  insectPlague: "Insect Plague",
  sunshower: "Sunshower",
  fishFrenzy: "Fish Frenzy",
};

// Paket Gems (harga USD). Sumber: daftar paket di sflhub.xyz (bukan dari kode game); ubah di sini bila berubah.
export const GEM_PACKS = [
  { gems: 100, usd: 1.03 },
  { gems: 650, usd: 5.19 },
  { gems: 1350, usd: 10.39 },
  { gems: 2800, usd: 20.79 },
  { gems: 15500, usd: 103.99 },
  { gems: 200000, usd: 1039.99 },
];

export const DEFAULT_SETTINGS = {
  island: "",        // "" = belum dipilih (syarat island skill tidak dicek)
  season: "",
  vip: false,
  event: "",         // "" = tidak ada event
  gemPack: "",       // jumlah Gems paket yang dipakai membeli Gems ("" = biaya restock tidak dihitung)
  flowerUsd: "",     // harga 1 FLOWER dalam USD
  flowerCoins: "",   // nilai 1 FLOWER dalam coins
};
