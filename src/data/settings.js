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

export const DEFAULT_SETTINGS = {
  island: "",        // "" = belum dipilih (syarat island skill tidak dicek)
  season: "",
  vip: false,
  event: "",         // "" = tidak ada event
  gemUsd: "",        // harga 1 Gem dalam USD (opsional, untuk biaya restock)
  flowerCoins: "",   // nilai 1 FLOWER dalam coins (opsional)
};
