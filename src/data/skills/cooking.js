// Skill tree: Cooking
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Fast Feasts", tier: 1, points: 1, island: "basic", effect: "x0.9 Firepit and Kitchen cooking time", upgrade: {"kind":"timeReduction","ranks":[0.1,0.15,0.2]} },
  { name: "Nom Nom", tier: 1, points: 1, island: "basic", effect: "+10% Food deliveries revenue", upgrade: {"kind":"coinBonus","ranks":[0.1,0.3,0.5]} },
  { name: "Munching Mastery", tier: 1, points: 1, island: "basic", effect: "+5% Bumpkin XP", upgrade: {"kind":"xpBonus","ranks":[0.05,0.075,0.1]} },
  { name: "Swift Sizzle", tier: 1, points: 1, island: "basic", effect: "x0.6 Fire Pit cooking time with oil", upgrade: {"kind":"timeReduction","ranks":[0.4,0.45,0.5]} },
  { name: "Frosted Cakes", tier: 2, points: 2, island: "basic", effect: "x0.9 Cakes cooking time", upgrade: {"kind":"timeReduction","ranks":[0.1,0.2,0.3]} },
  { name: "Juicy Boost", tier: 2, points: 2, island: "basic", effect: "+10% Bumpkin XP from drinks", upgrade: {"kind":"xpBonus","ranks":[0.1,0.2,0.3]} },
  { name: "Turbo Fry", tier: 2, points: 2, island: "basic", effect: "x0.5 Kitchen cooking time with oil", upgrade: {"kind":"timeReduction","ranks":[0.5,0.55,0.6]} },
  { name: "Drive-Through Deli", tier: 2, points: 2, island: "basic", effect: "+15% Bumpkin XP from Deli", upgrade: {"kind":"xpBonus","ranks":[0.15,0.2,0.25]} },
  { name: "Instant Gratification", tier: 3, points: 3, island: "basic", effect: "Ability to make all meals currently cooking ready to be eaten", upgrade: {"kind":"cooldown","ranks":[345600000,302400000,259200000]} },
  { name: "Double Nom", tier: 3, points: 3, island: "basic", effect: "+1 food from cooking; 2x ingredients required for cooking", upgrade: {"kind":"doubleNom","food":[1,2,3],"ingredients":[2,3,4]} },
  { name: "Fiery Jackpot", tier: 3, points: 3, island: "basic", effect: "+20% Chance of +1 food from Firepit", upgrade: {"kind":"chance","ranks":[20,35,50]} },
  { name: "Fry Frenzy", tier: 3, points: 3, island: "basic", effect: "x0.4 Deli cooking time with oil", upgrade: {"kind":"timeReduction","ranks":[0.6,0.65,0.7]} },
];
