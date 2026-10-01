// Skill tree: Legacy
// Format: { name, tier, points, island, effect, icon? }  (lihat docs/ADDING-DATA.md)
// Skill pasif milik beberapa akun, tidak bisa dibuka dengan skill point.
// Status dibaca dari inventory farm (nama item sama dengan nama skill).
export default [
  { name: "Green Thumb", passive: true, effect: "Crops are worth 5% more; Increase mutant crop chance (bentrok dengan Barn Manager)" },
  { name: "Barn Manager", passive: true, effect: "Animals yield 10% more goods; Increase mutant animal chance (bentrok dengan Green Thumb)" },
  { name: "Seed Specialist", passive: true, effect: "Crops take 10% less time to grow; Increase mutant crop chance (butuh Green Thumb) (bentrok dengan Wrangler)" },
  { name: "Wrangler", passive: true, effect: "Animals take 10% less time to produce goods; Increase mutant animal chance (butuh Barn Manager) (bentrok dengan Seed Specialist)" },
  { name: "Lumberjack", passive: true, effect: "Increase wood drops by 10% (bentrok dengan Prospector)" },
  { name: "Prospector", passive: true, effect: "Increase stone drops by 20% (bentrok dengan Lumberjack)" },
  { name: "Logger", passive: true, effect: "Axes last 50% longer (butuh Lumberjack) (bentrok dengan Gold Rush)" },
  { name: "Gold Rush", passive: true, effect: "Increase gold drops by 50% (butuh Prospector) (bentrok dengan Logger)" },
  { name: "Artist", passive: true, effect: "Save 10% on shop & blacksmith tools" },
  { name: "Coder", passive: true, effect: "Crops yield 20% more" },
  { name: "Discord Mod", passive: true, effect: "Yield 35% more wood" },
  { name: "Liquidity Provider", passive: true, effect: "50% reduced FLOWER withdrawal fee" },
  { name: "Warrior", passive: true, effect: "Early access to land expansion" },
];
