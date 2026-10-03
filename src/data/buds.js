// Aturan boost Bud. Sumber: features/game/lib/getBudYieldBoosts.ts (Sunflower Land).
// Boost per resource = pengali aura x (boost type + boost stem). Hanya Bud yang DIPASANG
// berlaku, dan untuk tiap resource hanya Bud terbaik yang dipakai.
//
// match: kriteria resource (lihat resources.js): kind (daftar), tier (crop plot), names (daftar nama).
export const AURA_MULTIPLIER = { "No Aura": 1, Basic: 1.05, Green: 1.2, Rare: 2, Mythical: 5 };

export const TYPES = ["Plaza", "Woodlands", "Cave", "Sea", "Castle", "Port", "Retreat", "Saphiro", "Snow", "Beach"];

export const STEMS = [
  "3 Leaf Clover", "Fish Hat", "Diamond Gem", "Gold Gem", "Miner Hat", "Carrot Head", "Basic Leaf", "Sunflower Hat",
  "Ruby Gem", "Mushroom", "Magic Mushroom", "Acorn Hat", "Banana", "Tree Hat", "Egg Head", "Apple Head", "Axe Head",
  "Sunshield Foliage", "Sunflower Headband", "Seashell", "Tender Coral", "Red Bow", "Hibiscus", "Rainbow Horn", "Silver Horn",
];

export const TYPE_RULES = [
  { trait: "Cave", boost: 0.2, label: "Stone, Iron, Gold", match: { kind: ["mineral"] } },
  { trait: "Plaza", boost: 0.3, label: "Basic Crops", match: { kind: ["crop"], tier: "basic" } },
  { trait: "Castle", boost: 0.3, label: "Medium Crops", match: { kind: ["crop"], tier: "medium" } },
  { trait: "Snow", boost: 0.3, label: "Advanced Crops", match: { kind: ["crop"], tier: "advanced" } },
  { trait: "Woodlands", boost: 0.2, label: "Wood", match: { kind: ["wood"] } },
  { trait: "Retreat", boost: 0.2, label: "Animal produce", match: { kind: ["animal"] } },
  { trait: "Beach", boost: 0.2, label: "Fruit", match: { kind: ["fruit"] } },
];

export const STEM_RULES = [
  { trait: "3 Leaf Clover", boost: 0.5, label: "Semua Crops", match: { kind: ["crop", "gh-crop"] } },
  { trait: "Basic Leaf", boost: 0.2, label: "Basic Crops", match: { kind: ["crop"], tier: "basic" } },
  { trait: "Carrot Head", boost: 0.3, label: "Carrot", match: { names: ["Carrot"] } },
  { trait: "Sunflower Hat", boost: 0.5, label: "Sunflower", match: { names: ["Sunflower"] } },
  { trait: "Diamond Gem", boost: 0.2, label: "Stone, Iron, Gold", match: { kind: ["mineral"] } },
  { trait: "Ruby Gem", boost: 0.2, label: "Stone", match: { names: ["Stone"] } },
  { trait: "Miner Hat", boost: 0.2, label: "Iron", match: { names: ["Iron"] } },
  { trait: "Gold Gem", boost: 0.2, label: "Gold", match: { names: ["Gold"] } },
  { trait: "Mushroom", boost: 0.3, label: "Wild Mushroom", match: { names: ["Wild Mushroom"] } },
  { trait: "Magic Mushroom", boost: 0.2, label: "Magic Mushroom", match: { names: ["Magic Mushroom"] } },
  { trait: "Acorn Hat", boost: 0.1, label: "Wood", match: { names: ["Wood"] } },
  { trait: "Tree Hat", boost: 0.2, label: "Wood", match: { names: ["Wood"] } },
  { trait: "Banana", boost: 0.2, label: "Fruit", match: { kind: ["fruit"] } },
  { trait: "Apple Head", boost: 0.2, label: "Fruit", match: { kind: ["fruit"] } },
  { trait: "Egg Head", boost: 0.2, label: "Egg", match: { names: ["Egg"] } },
];
