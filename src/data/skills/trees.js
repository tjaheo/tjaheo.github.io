// Skill tree: Trees
// Format: { name, tier, points, island, effect, icon? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Lumberjack's Extra", tier: 1, points: 1, island: "basic", effect: "+0.1 wood yield" },
  { name: "Tree Charge", tier: 1, points: 1, island: "basic", effect: "x0.9 tree growth time" },
  { name: "More Axes", tier: 1, points: 1, island: "basic", effect: "+50 axe stock" },
  { name: "Insta-Chop", tier: 1, points: 1, island: "basic", effect: "1 Tap Trees" },
  { name: "Tough Tree", tier: 2, points: 2, island: "basic", effect: "1/10 chance of x3 wood yield" },
  { name: "Feller's Discount", tier: 2, points: 2, island: "basic", effect: "x0.8 axe coin cost" },
  { name: "Money Tree", tier: 2, points: 2, island: "basic", effect: "1% chance of finding 200 Coins when chopping trees" },
  { name: "Tree Turnaround", tier: 3, points: 3, island: "basic", effect: "15% chance for trees to grow instantly" },
  { name: "Tree Blitz", tier: 3, points: 3, island: "basic", effect: "Ability to make all trees instantly grow" },
];
