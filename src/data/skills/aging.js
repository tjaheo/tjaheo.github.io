// Skill tree: Aging
// Format: { name, tier, points, island, effect, icon? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Cheap Rakes", tier: 1, points: 1, island: "basic", effect: "x0.8 salt rake coin cost" },
  { name: "Speedy Aging", tier: 1, points: 1, island: "basic", effect: "x0.9 Fish Aging time" },
  { name: "Salty Seas", tier: 1, points: 1, island: "basic", effect: "x0.9 salt charge replenishment time" },
  { name: "Wide Rakes", tier: 1, points: 1, island: "basic", effect: "+2 Salt per harvest" },
  { name: "Bacalhau", tier: 1, points: 1, island: "basic", effect: "+1 Bait yield from fermentation rack" },
  { name: "Fish Smoking", tier: 2, points: 2, island: "basic", effect: "Doubled chance Aged Fish becomes Prime Aged" },
  { name: "Refiner", tier: 2, points: 2, island: "basic", effect: "15% chance of +1 Refined Salt when making Refined Salt" },
  { name: "Sea Blessed", tier: 2, points: 2, island: "basic", effect: "5% chance to restore 1 charge to 4 Salt Nodes on harvest" },
  { name: "Ager", tier: 3, points: 3, island: "basic", effect: "2× output from Aging Shed Racks; 2× Aging Shed inputs (ingredients, fish & salt)" },
  { name: "Salt Surge", tier: 3, points: 3, island: "basic", effect: "Recharge all Salt Nodes to max" },
];
