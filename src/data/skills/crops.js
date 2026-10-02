// Skill tree: Crops
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Green Thumb", tier: 1, points: 1, island: "basic", effect: "x0.95 plot crop growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.95,0.94,0.925]} },
  { name: "Young Farmer", tier: 1, points: 1, island: "basic", effect: "+0.1 Basic Crop yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.125,0.15]} },
  { name: "Experienced Farmer", tier: 1, points: 1, island: "basic", effect: "+0.1 Medium Crop yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.125,0.15]} },
  { name: "Old Farmer", tier: 1, points: 1, island: "basic", effect: "+0.1 Advanced Crop yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.125,0.15]} },
  { name: "Chonky Scarecrow", tier: 1, points: 1, island: "basic", effect: "Increases Basic Scarecrow's area of effect (AOE) to a 7x7 area; Additional x0.9 basic crop growth time", upgrade: {"kind":"aoe","ranks":[{"xLeft":3,"xRight":3,"depth":7},{"xLeft":4,"xRight":3,"depth":8},{"xLeft":4,"xRight":4,"depth":9}],"aoeYield":[0,0.05,0.1]} },
  { name: "Betty's Friend", tier: 1, points: 1, island: "basic", effect: "Betty Coin delivery revenue increased by 30%", upgrade: {"kind":"coinBonus","ranks":[0.3,0.45,0.6]} },
  { name: "Strong Roots", tier: 2, points: 2, island: "basic", effect: "x0.9 Advanced crop growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.875,0.85]} },
  { name: "Coin Swindler", tier: 2, points: 2, island: "basic", effect: "+10% coins when selling plot crops at the Market", upgrade: {"kind":"coinBonus","ranks":[0.1,0.2,0.3]} },
  { name: "Golden Sunflower", tier: 2, points: 2, island: "basic", effect: "1/700 chance for 0.35 gold when harvesting sunflowers (excluding Crop Machine)", upgrade: {"kind":"dropChance","ranks":[0.14285714285714285,0.18181818181818182,0.25]} },
  { name: "Horror Mike", tier: 2, points: 2, island: "basic", effect: "Increases Scary Mike's area of effect (AOE) to a 7x7 area; Additional +0.1 medium crop yield", upgrade: {"kind":"aoe","ranks":[{"xLeft":3,"xRight":3,"depth":7},{"xLeft":4,"xRight":3,"depth":8},{"xLeft":4,"xRight":4,"depth":9}],"aoeYield":[0.1,0.15,0.2]} },
  { name: "Laurie's Gains", tier: 2, points: 2, island: "basic", effect: "Increases Laurie the Chuckle Crow's area of effect (AOE) to a 7x7 area; Additional +0.1 advanced crop yield", upgrade: {"kind":"aoe","ranks":[{"xLeft":3,"xRight":3,"depth":7},{"xLeft":4,"xRight":3,"depth":8},{"xLeft":4,"xRight":4,"depth":9}],"aoeYield":[0.1,0.15,0.2]} },
  { name: "Instant Growth", tier: 3, points: 3, island: "basic", effect: "Grants the ability to instantly harvest all currently growing crops in plots", upgrade: {"kind":"cooldown","ranks":[259200000,216000000,172800000]} },
  { name: "Acre Farm", tier: 3, points: 3, island: "basic", effect: "+1 Advanced crop yield; -0.5 Basic and Medium crop yield", upgrade: {"kind":"yieldWithDebuff","buff":[1,1.4,1.8],"debuff":[0.5,0.6,0.7]} },
  { name: "Hectare Farm", tier: 3, points: 3, island: "basic", effect: "+1 Basic and Medium crop yield; -0.5 Advanced crop yield", upgrade: {"kind":"yieldWithDebuff","buff":[1,1.4,1.8],"debuff":[0.5,0.6,0.7]} },
];
