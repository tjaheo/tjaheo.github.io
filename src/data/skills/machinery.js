// Skill tree: Machinery
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Crop Extension Module I", tier: 1, points: 1, island: "desert", effect: "Allow Rhubarb and Zucchini seeds to be used in crop machine" },
  { name: "Crop Processor Unit", tier: 1, points: 1, island: "desert", effect: "x0.95 Crop Machine growth time; +10% Oil consumption in Crop Machine", upgrade: {"kind":"growthWithOilDebuff","growth":[0.95,0.9,0.85],"oilPenalty":[0.1,0.15,0.2]} },
  { name: "Oil Gadget", tier: 1, points: 1, island: "desert", effect: "x0.9 Oil consumption in Crop Machine", upgrade: {"kind":"oilReduction","ranks":[0.1,0.15,0.2]} },
  { name: "Oil Extraction", tier: 1, points: 1, island: "desert", effect: "+1 Oil when collecting from reserves", upgrade: {"kind":"additiveYield","ranks":[1,1.5,2]} },
  { name: "Leak-Proof Tank", tier: 1, points: 1, island: "desert", effect: "Triple oil tank capacity in crop machine", upgrade: {"kind":"multiplier","ranks":[3,4,5]} },
  { name: "Crop Extension Module II", tier: 2, points: 2, island: "desert", effect: "Allow Carrot and Cabbage seeds to be used in crop machine" },
  { name: "Crop Extension Module III", tier: 2, points: 2, island: "desert", effect: "Allow Yam and Broccoli seeds to be used in crop machine" },
  { name: "Rapid Rig", tier: 2, points: 2, island: "desert", effect: "x0.8 Crop Machine growth time; +40% Oil consumption in Crop Machine", upgrade: {"kind":"growthWithOilDebuff","growth":[0.8,0.7,0.6],"oilPenalty":[0.4,0.5,0.6]} },
  { name: "Oil Be Back", tier: 2, points: 2, island: "desert", effect: "x0.8 Oil refill time", upgrade: {"kind":"growthMultiplier","ranks":[0.8,0.7,0.6]} },
  { name: "Oil Rig", tier: 2, points: 2, island: "desert", effect: "Oil Drill requires 20 Wool instead of Leather to craft", upgrade: {"kind":"flatBonus","ranks":[20,15,10]} },
  { name: "Field Expansion Module", tier: 3, points: 3, island: "desert", effect: "+5 packs added to machine queue system", upgrade: {"kind":"flatBonus","ranks":[5,7,10]} },
  { name: "Field Extension Module", tier: 3, points: 3, island: "desert", effect: "+5 plots added to machine", upgrade: {"kind":"flatBonus","ranks":[5,7,10]} },
  { name: "Efficiency Extension Module", tier: 3, points: 3, island: "desert", effect: "x0.7 Oil consumption in Crop Machine", upgrade: {"kind":"oilReduction","ranks":[0.3,0.4,0.5]} },
  { name: "Grease Lightning", tier: 3, points: 3, island: "desert", effect: "Ability to make empty oil wells instantly refill", upgrade: {"kind":"cooldown","ranks":[345600000,302400000,259200000]} },
];
