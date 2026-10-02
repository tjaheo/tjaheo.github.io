// Skill tree: Mining
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Rock'N'Roll", tier: 1, points: 1, island: "basic", effect: "+0.1 Stone Yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Iron Bumpkin", tier: 1, points: 1, island: "basic", effect: "+0.1 Iron Yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Speed Miner", tier: 1, points: 1, island: "basic", effect: "x0.8 Stone recovery time", upgrade: {"kind":"growthMultiplier","ranks":[0.8,0.75,0.7]} },
  { name: "Tap Prospector", tier: 1, points: 1, island: "basic", effect: "1 tap small mineral nodes" },
  { name: "Forge-Ward Profits", tier: 1, points: 1, island: "basic", effect: "+20% Blacksmith deliveries revenue", upgrade: {"kind":"coinBonus","ranks":[0.2,0.3,0.4]} },
  { name: "Iron Hustle", tier: 2, points: 2, island: "basic", effect: "x0.7 Iron recovery time", upgrade: {"kind":"growthMultiplier","ranks":[0.7,0.65,0.6]} },
  { name: "Frugal Miner", tier: 2, points: 2, island: "basic", effect: "x0.8 all pickaxes coin cost", upgrade: {"kind":"costMultiplier","ranks":[0.8,0.7,0.6]} },
  { name: "Rocky Favor", tier: 2, points: 2, island: "basic", effect: "+1 Stone yield; -0.5 Iron yield", upgrade: {"kind":"yieldWithDebuff","buff":[1,1.4,1.8],"debuff":[0.5,0.6,0.7]} },
  { name: "Fire Kissed", tier: 2, points: 2, island: "basic", effect: "+1 Crimstone yield on 5th consecutive mine", upgrade: {"kind":"additiveYield","ranks":[1,1.35,1.75]} },
  { name: "Midas Sprint", tier: 2, points: 2, island: "basic", effect: "x0.9 Gold recovery time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.875,0.85]} },
  { name: "Ferrous Favor", tier: 3, points: 3, island: "basic", effect: "+1 Iron yield; -0.5 Stone yield", upgrade: {"kind":"yieldWithDebuff","buff":[1,1.5,2],"debuff":[0.5,0.6,0.7]} },
  { name: "Golden Touch", tier: 3, points: 3, island: "basic", effect: "+0.5 Gold Yield", upgrade: {"kind":"additiveYield","ranks":[0.5,0.75,1]} },
  { name: "More Picks", tier: 3, points: 3, island: "basic", effect: "Increased stock: +70 Pickaxe, +20 Stone Pickaxe, +7 Iron Pickaxe, +2 Gold Pickaxe", upgrade: {"kind":"stockBonus","ranks":{"Pickaxe":[70,140,280],"Stone Pickaxe":[20,40,80],"Iron Pickaxe":[7,14,28],"Gold Pickaxe":[2,4,8]}} },
  { name: "Fireside Alchemist", tier: 3, points: 3, island: "basic", effect: "x0.85 Crimstone recovery time", upgrade: {"kind":"growthMultiplier","ranks":[0.85,0.75,0.6]} },
  { name: "Midas Rush", tier: 3, points: 3, island: "basic", effect: "x0.8 Gold recovery time", upgrade: {"kind":"growthMultiplier","ranks":[0.8,0.75,0.7]} },
];
