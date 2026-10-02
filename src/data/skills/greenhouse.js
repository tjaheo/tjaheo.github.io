// Skill tree: Greenhouse
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Glass Room", tier: 1, points: 1, island: "desert", effect: "+0.1 Greenhouse produce yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Seedy Business", tier: 1, points: 1, island: "desert", effect: "x0.85 Greenhouse seeds cost", upgrade: {"kind":"costMultiplier","ranks":[0.85,0.8,0.75]} },
  { name: "Rice and Shine", tier: 1, points: 1, island: "desert", effect: "x0.95 growth time for greenhouse produce", upgrade: {"kind":"growthMultiplier","ranks":[0.95,0.94,0.925]} },
  { name: "Victoria's Secretary", tier: 1, points: 1, island: "desert", effect: "+50% Coins from Victoria's deliveries", upgrade: {"kind":"coinBonus","ranks":[0.5,0.75,1]} },
  { name: "Olive Express", tier: 2, points: 2, island: "desert", effect: "x0.9 Olive growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Rice Rocket", tier: 2, points: 2, island: "desert", effect: "x0.9 Rice growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Vine Velocity", tier: 2, points: 2, island: "desert", effect: "x0.9 Grape growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Seeded Bounty", tier: 2, points: 2, island: "desert", effect: "+0.5 Greenhouse produce yield; +1 Greenhouse seed to plant", upgrade: {"kind":"additiveYield","ranks":[0.5,0.75,1]} },
  { name: "Greenhouse Guru", tier: 3, points: 3, island: "desert", effect: "Ability to make all greenhouse produce currently growing ready to be harvested", upgrade: {"kind":"cooldown","ranks":[345600000,302400000,259200000]} },
  { name: "Greenhouse Gamble", tier: 3, points: 3, island: "desert", effect: "30% chance of +1 greenhouse produce", upgrade: {"kind":"chance","ranks":[30,40,50]} },
  { name: "Slick Saver", tier: 3, points: 3, island: "desert", effect: "-1 Oil to grow greenhouse produce", upgrade: {"kind":"flatReduction","ranks":[1,1.5,2]} },
  { name: "Greasy Plants", tier: 3, points: 3, island: "desert", effect: "+1 Greenhouse produce yield; +100% Oil consumption in greenhouse", upgrade: {"kind":"yieldWithOilDebuff","yield":[1,1.5,2],"oilMultiplier":[2,3,4]} },
];
