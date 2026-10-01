// Skill tree: Greenhouse
// Format: { name, tier, points, island, effect, icon? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Glass Room", tier: 1, points: 1, island: "desert", effect: "+0.1 Greenhouse produce yield" },
  { name: "Seedy Business", tier: 1, points: 1, island: "desert", effect: "x0.85 Greenhouse seeds cost" },
  { name: "Rice and Shine", tier: 1, points: 1, island: "desert", effect: "x0.95 growth time for greenhouse produce" },
  { name: "Victoria's Secretary", tier: 1, points: 1, island: "desert", effect: "+50% Coins from Victoria's deliveries" },
  { name: "Olive Express", tier: 2, points: 2, island: "desert", effect: "x0.9 Olive growth time" },
  { name: "Rice Rocket", tier: 2, points: 2, island: "desert", effect: "x0.9 Rice growth time" },
  { name: "Vine Velocity", tier: 2, points: 2, island: "desert", effect: "x0.9 Grape growth time" },
  { name: "Seeded Bounty", tier: 2, points: 2, island: "desert", effect: "+0.5 Greenhouse produce yield; +1 Greenhouse seed to plant" },
  { name: "Greenhouse Guru", tier: 3, points: 3, island: "desert", effect: "Ability to make all greenhouse produce currently growing ready to be harvested" },
  { name: "Greenhouse Gamble", tier: 3, points: 3, island: "desert", effect: "30% chance of +1 greenhouse produce" },
  { name: "Slick Saver", tier: 3, points: 3, island: "desert", effect: "-1 Oil to grow greenhouse produce" },
  { name: "Greasy Plants", tier: 3, points: 3, island: "desert", effect: "+1 Greenhouse produce yield; +100% Oil consumption in greenhouse" },
];
