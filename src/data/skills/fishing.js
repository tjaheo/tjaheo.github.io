// Skill tree: Fishing
// Format: { name, tier, points, island, effect, icon? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Fisherman's 5 Fold", tier: 1, points: 1, island: "basic", effect: "+5 daily fishing reels" },
  { name: "Fishy Chance", tier: 1, points: 1, island: "basic", effect: "10% chance of +1 basic fish" },
  { name: "Fishy Roll", tier: 1, points: 1, island: "basic", effect: "10% chance of +1 advanced fish" },
  { name: "Reel Deal", tier: 1, points: 1, island: "basic", effect: "x0.5 rod coin cost" },
  { name: "Fisherman's 10 Fold", tier: 2, points: 2, island: "basic", effect: "+10 daily fishing reels" },
  { name: "Fishy Fortune", tier: 2, points: 2, island: "basic", effect: "+100% coins from Corale's deliveries" },
  { name: "Big Catch", tier: 2, points: 2, island: "basic", effect: "Increase bar for catching game", disabled: true },
  { name: "Fishy Gamble", tier: 2, points: 2, island: "basic", effect: "20% chance of +1 expert fish" },
  { name: "Frenzied Fish", tier: 3, points: 3, island: "basic", effect: "During fish frenzy, +1 fish and 50% chance of +1 fish" },
  { name: "More With Less", tier: 3, points: 3, island: "basic", effect: "+10 daily fishing reels" },
  { name: "Fishy Feast", tier: 3, points: 3, island: "basic", effect: "+20% Bumpkin XP from Fish" },
];
