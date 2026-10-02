// Skill tree: Trees
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Lumberjack's Extra", tier: 1, points: 1, island: "basic", effect: "+0.1 wood yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Tree Charge", tier: 1, points: 1, island: "basic", effect: "x0.9 tree growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.875,0.85]} },
  { name: "More Axes", tier: 1, points: 1, island: "basic", effect: "+50 axe stock", upgrade: {"kind":"stockBonus","ranks":{"Axe":[50,100,150]}} },
  { name: "Insta-Chop", tier: 1, points: 1, island: "basic", effect: "1 Tap Trees" },
  { name: "Tough Tree", tier: 2, points: 2, island: "basic", effect: "1/10 chance of x3 wood yield", upgrade: {"kind":"chance","ranks":[10,20,30]} },
  { name: "Feller's Discount", tier: 2, points: 2, island: "basic", effect: "x0.8 axe coin cost", upgrade: {"kind":"costMultiplier","ranks":[0.8,0.75,0.7]} },
  { name: "Money Tree", tier: 2, points: 2, island: "basic", effect: "1% chance of finding 200 Coins when chopping trees", upgrade: {"kind":"chance","ranks":[1,2,3]} },
  { name: "Tree Turnaround", tier: 3, points: 3, island: "basic", effect: "15% chance for trees to grow instantly", upgrade: {"kind":"chance","ranks":[15,25,35]} },
  { name: "Tree Blitz", tier: 3, points: 3, island: "basic", effect: "Ability to make all trees instantly grow", upgrade: {"kind":"cooldown","ranks":[86400000,64800000,43200000]} },
];
