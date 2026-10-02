// Aturan boost Bud. Sumber: features/game/lib/getBudYieldBoosts.ts (Sunflower Land).
// Boost per resource = pengali aura x (boost type + boost stem). Hanya Bud yang DIPASANG
// (punya koordinat) yang berlaku, dan hanya Bud terbaik per resource yang dipakai.
export const AURA_MULTIPLIER = { "No Aura": 1, Basic: 1.05, Green: 1.2, Rare: 2, Mythical: 5 };

export const TYPE_BOOSTS = [
  { type: "Cave", target: "Stone, Iron, Gold", boost: 0.2 },
  { type: "Plaza", target: "Basic Crops", boost: 0.3 },
  { type: "Castle", target: "Medium Crops", boost: 0.3 },
  { type: "Snow", target: "Advanced Crops", boost: 0.3 },
  { type: "Woodlands", target: "Wood", boost: 0.2 },
  { type: "Retreat", target: "Animal produce", boost: 0.2 },
  { type: "Beach", target: "Fruit", boost: 0.2 },
];

export const STEM_BOOSTS = [
  { stem: "3 Leaf Clover", target: "Semua Crops", boost: 0.5 },
  { stem: "Basic Leaf", target: "Basic Crops", boost: 0.2 },
  { stem: "Carrot Head", target: "Carrot", boost: 0.3 },
  { stem: "Sunflower Hat", target: "Sunflower", boost: 0.5 },
  { stem: "Diamond Gem", target: "Stone, Iron, Gold", boost: 0.2 },
  { stem: "Ruby Gem", target: "Stone", boost: 0.2 },
  { stem: "Miner Hat", target: "Iron", boost: 0.2 },
  { stem: "Gold Gem", target: "Gold", boost: 0.2 },
  { stem: "Mushroom", target: "Wild Mushroom", boost: 0.3 },
  { stem: "Magic Mushroom", target: "Magic Mushroom", boost: 0.2 },
  { stem: "Acorn Hat", target: "Wood", boost: 0.1 },
  { stem: "Tree Hat", target: "Wood", boost: 0.2 },
  { stem: "Banana", target: "Fruit", boost: 0.2 },
  { stem: "Apple Head", target: "Fruit", boost: 0.2 },
  { stem: "Egg Head", target: "Egg", boost: 0.2 },
];
