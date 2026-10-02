// Skill tree: Fruit Patch
// Format: { name, tier, points, island, effect, icon?, upgrade? }  (lihat docs/ADDING-DATA.md)
export default [
  { name: "Fruitful Fumble", tier: 1, points: 1, island: "spring", effect: "+0.1 Fruit Patch yield", upgrade: {"kind":"additiveYield","ranks":[0.1,0.15,0.2]} },
  { name: "Fruity Heaven", tier: 1, points: 1, island: "spring", effect: "x0.9 Fruit Patch seeds cost", upgrade: {"kind":"costMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Fruity Profit", tier: 1, points: 1, island: "spring", effect: "+50% coins from Tango's deliveries", upgrade: {"kind":"coinBonus","ranks":[0.5,0.75,1]} },
  { name: "Loyal Macaw", tier: 1, points: 1, island: "spring", effect: "Double Macaw's effect", upgrade: {"kind":"additiveYield","ranks":[0.2,0.25,0.3]} },
  { name: "No Axe No Worries", tier: 1, points: 1, island: "spring", effect: "Chop fruit branches and stems without axes; -1 wood from fruit branches and stems", upgrade: {"kind":"flatDebuff","ranks":[1,0.9,0.8]} },
  { name: "Catchup", tier: 2, points: 2, island: "spring", effect: "x0.9 Fruit Patch growth time", upgrade: {"kind":"growthMultiplier","ranks":[0.9,0.85,0.8]} },
  { name: "Fruity Woody", tier: 2, points: 2, island: "spring", effect: "+1 wood from fruit branches and stems", upgrade: {"kind":"additiveYield","ranks":[1,1.25,1.5]} },
  { name: "Pear Turbocharge", tier: 2, points: 2, island: "spring", effect: "Double Immortal Pear's effect", upgrade: {"kind":"multiplier","ranks":[2,3,4]} },
  { name: "Crime Fruit", tier: 2, points: 2, island: "spring", effect: "+10 Tomato and Lemon seeds stock", upgrade: {"kind":"stockBonus","ranks":{"Tomato Seed":[10,25,50],"Lemon Seed":[10,25,50]}} },
  { name: "Generous Orchard", tier: 3, points: 3, island: "spring", effect: "20% chance of +1 Fruit Patch yield", upgrade: {"kind":"chance","ranks":[20,30,50]} },
  { name: "Long Pickings", tier: 3, points: 3, island: "spring", effect: "x0.75 Apple and Banana growth time; +10% growth time for all other fruit patch fruits", upgrade: {"kind":"growthWithDebuff","buff":[0.75,0.65,0.55],"debuff":[1.1,1.125,1.15]} },
  { name: "Short Pickings", tier: 3, points: 3, island: "spring", effect: "x0.75 Blueberry and Orange growth time; +10% growth time for all other fruit patch fruits", upgrade: {"kind":"growthWithDebuff","buff":[0.75,0.65,0.55],"debuff":[1.1,1.125,1.15]} },
  { name: "Zesty Vibes", tier: 3, points: 3, island: "spring", effect: "+1 Tomato and Lemon yield; -0.25 yield for all other fruit patch fruits", upgrade: {"kind":"yieldWithDebuff","buff":[1,1.5,2],"debuff":[0.25,0.4,0.5]} },
];
