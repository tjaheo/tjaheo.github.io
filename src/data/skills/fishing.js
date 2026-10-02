// Skill tree: Fishing
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Fisherman's 5 Fold", tier: 1, points: 1, island: "basic", effect: "+5 daily fishing reels", upgrade: {"kind":"dailyLimit","ranks":[5,7,10]} },
  { name: "Fishy Chance", tier: 1, points: 1, island: "basic", effect: "10% chance of +1 basic fish", upgrade: {"kind":"chance","ranks":[10,12.5,15]} },
  { name: "Fishy Roll", tier: 1, points: 1, island: "basic", effect: "10% chance of +1 advanced fish", upgrade: {"kind":"chance","ranks":[10,12.5,15]} },
  { name: "Reel Deal", tier: 1, points: 1, island: "basic", effect: "x0.5 rod coin cost", upgrade: {"kind":"costMultiplier","ranks":[0.5,0.45,0.4]} },
  { name: "Fisherman's 10 Fold", tier: 2, points: 2, island: "basic", effect: "+10 daily fishing reels", upgrade: {"kind":"dailyLimit","ranks":[10,18,25]} },
  { name: "Fishy Fortune", tier: 2, points: 2, island: "basic", effect: "+100% coins from Corale's deliveries", upgrade: {"kind":"coinBonus","ranks":[1,1.25,1.5]} },
  { name: "Big Catch", tier: 2, points: 2, island: "basic", effect: "Increase bar for catching game", disabled: true },
  { name: "Fishy Gamble", tier: 2, points: 2, island: "basic", effect: "20% chance of +1 expert fish", upgrade: {"kind":"chance","ranks":[20,25,30]} },
  { name: "Frenzied Fish", tier: 3, points: 3, island: "basic", effect: "During fish frenzy, +1 fish and 50% chance of +1 fish", upgrade: {"kind":"frenziedFish","flat":[1,2,3],"crit":[50,50,0]} },
  { name: "More With Less", tier: 3, points: 3, island: "basic", effect: "+10 daily fishing reels", upgrade: {"kind":"dailyLimit","ranks":[10,25,50]} },
  { name: "Fishy Feast", tier: 3, points: 3, island: "basic", effect: "+20% Bumpkin XP from Fish", upgrade: {"kind":"xpBonus","ranks":[0.2,0.3,0.4]} },
];
