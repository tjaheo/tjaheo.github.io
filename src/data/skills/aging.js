// Skill tree: Aging
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Cheap Rakes", tier: 1, points: 1, island: "basic", effect: "x0.8 salt rake coin cost", upgrade: {"kind":"costMultiplier","ranks":[0.8,0.7,0.6]} },
  { name: "Speedy Aging", tier: 1, points: 1, island: "basic", effect: "x0.9 Fish Aging time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Salty Seas", tier: 1, points: 1, island: "basic", effect: "x0.9 salt charge replenishment time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Wide Rakes", tier: 1, points: 1, island: "basic", effect: "+2 Salt per harvest", upgrade: {"kind":"additiveYield","ranks":[2,3,4]} },
  { name: "Bacalhau", tier: 1, points: 1, island: "basic", effect: "+1 Bait yield from fermentation rack", upgrade: {"kind":"additiveYield","ranks":[1,2,3]} },
  { name: "Fish Smoking", tier: 2, points: 2, island: "basic", effect: "Doubled chance Aged Fish becomes Prime Aged", upgrade: {"kind":"multiplier","ranks":[2,3,4]} },
  { name: "Refiner", tier: 2, points: 2, island: "basic", effect: "15% chance of +1 Refined Salt when making Refined Salt", upgrade: {"kind":"chance","ranks":[15,25,35]} },
  { name: "Sea Blessed", tier: 2, points: 2, island: "basic", effect: "5% chance to restore 1 charge to 4 Salt Nodes on harvest", upgrade: {"kind":"chance","ranks":[5,6.5,8]} },
  { name: "Ager", tier: 3, points: 3, island: "basic", effect: "2× output from Aging Shed Racks; 2× Aging Shed inputs (ingredients, fish & salt)", upgrade: {"kind":"multiplier","ranks":[2,3,4]} },
  { name: "Salt Surge", tier: 3, points: 3, island: "basic", effect: "Recharge all Salt Nodes to max", upgrade: {"kind":"cooldown","ranks":[259200000,216000000,172800000]} },
];
