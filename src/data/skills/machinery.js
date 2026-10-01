// Skill tree: Machinery
// Format: { name, tier, points, island, effect, icon? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Crop Extension Module I", tier: 1, points: 1, island: "desert", effect: "Allow Rhubarb and Zucchini seeds to be used in crop machine" },
  { name: "Crop Processor Unit", tier: 1, points: 1, island: "desert", effect: "x0.95 Crop Machine growth time; +10% Oil consumption in Crop Machine" },
  { name: "Oil Gadget", tier: 1, points: 1, island: "desert", effect: "x0.9 Oil consumption in Crop Machine" },
  { name: "Oil Extraction", tier: 1, points: 1, island: "desert", effect: "+1 Oil when collecting from reserves" },
  { name: "Leak-Proof Tank", tier: 1, points: 1, island: "desert", effect: "Triple oil tank capacity in crop machine" },
  { name: "Crop Extension Module II", tier: 2, points: 2, island: "desert", effect: "Allow Carrot and Cabbage seeds to be used in crop machine" },
  { name: "Crop Extension Module III", tier: 2, points: 2, island: "desert", effect: "Allow Yam and Broccoli seeds to be used in crop machine" },
  { name: "Rapid Rig", tier: 2, points: 2, island: "desert", effect: "x0.8 Crop Machine growth time; +40% Oil consumption in Crop Machine" },
  { name: "Oil Be Back", tier: 2, points: 2, island: "desert", effect: "x0.8 Oil refill time" },
  { name: "Oil Rig", tier: 2, points: 2, island: "desert", effect: "Oil Drill requires 20 Wool instead of Leather to craft" },
  { name: "Field Expansion Module", tier: 3, points: 3, island: "desert", effect: "+5 packs added to machine queue system" },
  { name: "Field Extension Module", tier: 3, points: 3, island: "desert", effect: "+5 plots added to machine" },
  { name: "Efficiency Extension Module", tier: 3, points: 3, island: "desert", effect: "x0.7 Oil consumption in Crop Machine" },
  { name: "Grease Lightning", tier: 3, points: 3, island: "desert", effect: "Ability to make empty oil wells instantly refill" },
];
