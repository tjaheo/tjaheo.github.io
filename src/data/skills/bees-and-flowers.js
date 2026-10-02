// Skill tree: Bees & Flowers
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Sweet Bonus", tier: 1, points: 1, island: "spring", effect: "+0.1 Honey per hive", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Hyper Bees", tier: 1, points: 1, island: "spring", effect: "+0.1 Honey production speed", upgrade: {"kind":"productionRate","ranks":[0.1,0.15,0.2]} },
  { name: "Blooming Boost", tier: 1, points: 1, island: "spring", effect: "x0.9 Flower growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.875,0.85]} },
  { name: "Flower Sale", tier: 1, points: 1, island: "spring", effect: "x0.8 Flower Seeds cost", upgrade: {"kind":"costMultiplier","ranks":[0.8,0.75,0.7]} },
  { name: "Buzzworthy Treats", tier: 2, points: 2, island: "spring", effect: "+10% Bumpkin XP from Honey Foods", upgrade: {"kind":"xpBonus","ranks":[0.1,0.2,0.3]} },
  { name: "Blossom Bonding", tier: 2, points: 2, island: "spring", effect: "+2 relationship points for gifting flowers", upgrade: {"kind":"flatBonus","ranks":[2,3,4]} },
  { name: "Pollen Power Up", tier: 2, points: 2, island: "spring", effect: "Additional +0.1 crop yield after pollination (total +0.3)", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Petalled Perk", tier: 2, points: 2, island: "spring", effect: "10% chance of +1 Flower", upgrade: {"kind":"chance","ranks":[10,17.5,25]} },
  { name: "Bee Collective", tier: 3, points: 3, island: "spring", effect: "+20% Bee Swarm chance", upgrade: {"kind":"chance","ranks":[20,27.5,35]} },
  { name: "Flower Power", tier: 3, points: 3, island: "spring", effect: "x0.8 Flower growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.8,0.7,0.6]} },
  { name: "Flowery Abode", tier: 3, points: 3, island: "spring", effect: "+0.5 Honey production speed; +50% Flower growth time", upgrade: {"kind":"rateWithGrowthDebuff","rate":[0.5,0.75,1],"growth":[1.5,1.6,1.7]} },
  { name: "Petal Blessed", tier: 3, points: 3, island: "spring", effect: "Ability to make all flowers currently growing ready to be harvested", upgrade: {"kind":"cooldown","ranks":[345600000,302400000,259200000]} },
];
