// Skill tree: Crops
// Format: { name, tier, points, island, effect, icon? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Green Thumb", tier: 1, points: 1, island: "basic", effect: "x0.95 plot crop growth time" },
  { name: "Young Farmer", tier: 1, points: 1, island: "basic", effect: "+0.1 Basic Crop yield" },
  { name: "Experienced Farmer", tier: 1, points: 1, island: "basic", effect: "+0.1 Medium Crop yield" },
  { name: "Old Farmer", tier: 1, points: 1, island: "basic", effect: "+0.1 Advanced Crop yield" },
  { name: "Chonky Scarecrow", tier: 1, points: 1, island: "basic", effect: "Increases Basic Scarecrow's area of effect (AOE) to a 7x7 area; Additional x0.9 basic crop growth time" },
  { name: "Betty's Friend", tier: 1, points: 1, island: "basic", effect: "Betty Coin delivery revenue increased by 30%" },
  { name: "Strong Roots", tier: 2, points: 2, island: "basic", effect: "x0.9 Advanced crop growth time" },
  { name: "Coin Swindler", tier: 2, points: 2, island: "basic", effect: "+10% coins when selling plot crops at the Market" },
  { name: "Golden Sunflower", tier: 2, points: 2, island: "basic", effect: "1/700 chance for 0.35 gold when harvesting sunflowers (excluding Crop Machine)" },
  { name: "Horror Mike", tier: 2, points: 2, island: "basic", effect: "Increases Scary Mike's area of effect (AOE) to a 7x7 area; Additional +0.1 medium crop yield" },
  { name: "Laurie's Gains", tier: 2, points: 2, island: "basic", effect: "Increases Laurie the Chuckle Crow's area of effect (AOE) to a 7x7 area; Additional +0.1 advanced crop yield" },
  { name: "Instant Growth", tier: 3, points: 3, island: "basic", effect: "Grants the ability to instantly harvest all currently growing crops in plots" },
  { name: "Acre Farm", tier: 3, points: 3, island: "basic", effect: "+1 Advanced crop yield; -0.5 Basic and Medium crop yield" },
  { name: "Hectare Farm", tier: 3, points: 3, island: "basic", effect: "+1 Basic and Medium crop yield; -0.5 Advanced crop yield" },
];
