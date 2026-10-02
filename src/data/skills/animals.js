// Skill tree: Animals
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Efficient Feeding", tier: 1, points: 1, island: "spring", effect: "x0.95 feed to feed all animals", upgrade: {"kind":"costMultiplier","ranks":[0.95,0.94,0.925]} },
  { name: "Restless Animals", tier: 1, points: 1, island: "spring", effect: "x0.9 Animal sleep time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Fine Fibers", tier: 1, points: 1, island: "spring", effect: "+0.1 Feather, Leather and Merino Wool yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Bountiful Bounties", tier: 1, points: 1, island: "spring", effect: "+50% Coins from Animal Bounties", upgrade: {"kind":"coinBonus","ranks":[0.5,0.75,1]} },
  { name: "Double Bale", tier: 1, points: 1, island: "spring", effect: "Double Bale's Effect", upgrade: {"kind":"multiplier","ranks":[2,2.5,3]} },
  { name: "Bale Economy", tier: 1, points: 1, island: "spring", effect: "Bale affects milk and wool production" },
  { name: "Featherweight", tier: 1, points: 1, island: "spring", effect: "+0.35 Feather yield; -0.1 Leather & Merino Wool yield", upgrade: {"kind":"yieldWithDebuff","buff":[0.35,0.45,0.55],"debuff":[0.1,0.15,0.2]} },
  { name: "Abundant Harvest", tier: 2, points: 2, island: "spring", effect: "+0.2 Egg, Wool and Milk yield", upgrade: {"kind":"additiveYield","ranks":[0.2,0.35,0.5]} },
  { name: "Heartwarming Instruments", tier: 2, points: 2, island: "spring", effect: "+50% Animal XP from Animal Affection tools", upgrade: {"kind":"xpBonus","ranks":[0.5,0.6,0.7]} },
  { name: "Kale Mix", tier: 2, points: 2, island: "spring", effect: "Mixed Grain requires 3 kale to mix instead", upgrade: {"kind":"flatBonus","ranks":[3,2.5,2]} },
  { name: "Alternate Medicine", tier: 2, points: 2, island: "spring", effect: "Barn Delight requires 1 less Lemon and Honey to mix" },
  { name: "Healthy Livestock", tier: 2, points: 2, island: "spring", effect: "x0.5 chance of sickness", upgrade: {"kind":"sicknessWithSpread","sickness":[0.5,0.5,0.5],"spread":[1,0.5,0.01]} },
  { name: "Merino Whisperer", tier: 2, points: 2, island: "spring", effect: "+0.35 Merino Wool yield; -0.1 Leather & Feather yield", upgrade: {"kind":"yieldWithDebuff","buff":[0.35,0.6,0.9],"debuff":[0.1,0.15,0.2]} },
  { name: "Clucky Grazing", tier: 3, points: 3, island: "spring", effect: "x0.75 feed to feed Chickens; +50% feed to feed other animals", upgrade: {"kind":"costWithDebuff","buff":[0.75,0.65,0.5],"debuff":[1.5,1.55,1.65]} },
  { name: "Sheepwise Diet", tier: 3, points: 3, island: "spring", effect: "x0.75 feed to feed Sheep; +50% feed to feed other animals", upgrade: {"kind":"costWithDebuff","buff":[0.75,0.65,0.5],"debuff":[1.5,1.55,1.65]} },
  { name: "Cow-Smart Nutrition", tier: 3, points: 3, island: "spring", effect: "x0.75 feed to feed Cows; +50% feed to feed other animals", upgrade: {"kind":"costWithDebuff","buff":[0.75,0.65,0.5],"debuff":[1.5,1.55,1.65]} },
  { name: "Chonky Feed", tier: 3, points: 3, island: "spring", effect: "2x animal xp from animal feed; +50% feed to feed all animals", upgrade: {"kind":"xpWithFeedDebuff","xp":[2,2.5,3],"feed":[1.5,1.75,2]} },
  { name: "Leathercraft Mastery", tier: 3, points: 3, island: "spring", effect: "+0.35 Leather yield; -0.1 Feather & Merino Wool yield", upgrade: {"kind":"yieldWithDebuff","buff":[0.35,0.6,0.8],"debuff":[0.1,0.15,0.2]} },
  { name: "Barnyard Rouse", tier: 3, points: 3, island: "spring", effect: "Instantly wakes up all animals", upgrade: {"kind":"cooldown","ranks":[432000000,345600000,302400000]} },
];
