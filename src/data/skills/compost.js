// Skill tree: Compost
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Efficient Bin", tier: 1, points: 1, island: "basic", effect: "+5 Sprout Mix", upgrade: {"kind":"additiveYield","ranks":[5,7,9]} },
  { name: "Turbo Charged", tier: 1, points: 1, island: "basic", effect: "+5 Fruitful Blend", upgrade: {"kind":"additiveYield","ranks":[5,7,9]} },
  { name: "Wormy Treat", tier: 1, points: 1, island: "basic", effect: "+1 Worm", upgrade: {"kind":"additiveYield","ranks":[1,2,3]} },
  { name: "Feathery Business", tier: 1, points: 1, island: "basic", effect: "Use feathers instead of eggs to boost composters; 2x feathers to boost composters", upgrade: {"kind":"costMultiplier","ranks":[2,1.5,1]} },
  { name: "Sprout Surge", tier: 1, points: 1, island: "basic", effect: "Put Sprout Mix on all plots" },
  { name: "Blend-tastic", tier: 1, points: 1, island: "basic", effect: "Put Fruitful Blend on all plots" },
  { name: "Premium Worms", tier: 2, points: 2, island: "basic", effect: "+10 Rapid Root", upgrade: {"kind":"additiveYield","ranks":[10,15,20]} },
  { name: "Fruitful Bounty", tier: 2, points: 2, island: "basic", effect: "Double Fruitful Blend's Effect", upgrade: {"kind":"multiplier","ranks":[2,3,4]} },
  { name: "Swift Decomposer", tier: 2, points: 2, island: "basic", effect: "x0.9 compost time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.875,0.85]} },
  { name: "Composting Bonanza", tier: 2, points: 2, island: "basic", effect: "Speed up composters by an additional hour when boosting; 2x resources to boost composters", upgrade: {"kind":"flatTimeBonus","ranks":[3600000,5400000,7200000]} },
  { name: "Root Rocket", tier: 2, points: 2, island: "basic", effect: "Put Rapid Root on all plots" },
  { name: "Composting Overhaul", tier: 3, points: 3, island: "basic", effect: "+2 Worms", upgrade: {"kind":"additiveYield","ranks":[2,5,8]} },
  { name: "Composting Revamp", tier: 3, points: 3, island: "basic", effect: "+5 fertilisers; -2 Worms", upgrade: {"kind":"yieldWithDebuff","buff":[5,8,10],"debuff":[2,3,4]} },
];
