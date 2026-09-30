// data.js - EDIT FILE INI saat ada update dari Sunflower Land.
// Halaman (index.html) tidak perlu diubah.

const WORKER = "https://sfl.tjaheo89.workers.dev"; // alamat Worker kamu

// Syarat membuka tier, BEDA di tiap tree (dari kode game). Nilainya total poin
// yang sudah dipakai di tree itu pada tier di bawahnya: tier 2 = poin tier 1,
// tier 3 = poin tier 1 + 2. Poin skill tier 3 tidak dihitung.
// Nama tree mengikuti CATEGORIES di bawah ("Minerals" = tree "Mining" di game).
const TIER_REQUIRE = {
  "Crops":          { 1: 0, 2: 3, 3: 7 },
  "Minerals":       { 1: 0, 2: 3, 3: 7 },
  "Compost":        { 1: 0, 2: 3, 3: 7 },
  "Aging":          { 1: 0, 2: 3, 3: 7 },
  "Animals":        { 1: 0, 2: 4, 3: 8 },
  "Trees":          { 1: 0, 2: 2, 3: 5 },
  "Fishing":        { 1: 0, 2: 2, 3: 5 },
  "Cooking":        { 1: 0, 2: 2, 3: 5 },
  "Fruit Patch":    { 1: 0, 2: 2, 3: 5 },
  "Bees & Flowers": { 1: 0, 2: 2, 3: 5 },
  "Greenhouse":     { 1: 0, 2: 2, 3: 5 },
  "Machinery":      { 1: 0, 2: 2, 3: 5 },
  "default":        { 1: 0, 2: 2, 3: 5 }, // untuk tree yang tidak tercantum
};

// Biaya default mengambil skill menurut tier.
// Sesuai game: tier 1 = 1, tier 2 = 2, tier 3 = 3. Bisa ditimpa per skill dengan field "points".
const TIER_COST = { 1: 1, 2: 2, 3: 3 };

// Total skill point pada level tertentu: 1 poin per level (docs resmi),
// termasuk level setelah Ascension. "level" = total level Bumpkin.
function pointsForLevel(level) {
  return level;
}

// XP minimum untuk level 1..150 (dari kode game, features/game/lib/level.ts).
// Jika game mengubah tabelnya, perbarui array ini.
const LEVEL_XP = [0, 2, 22, 205, 555, 1155, 2155, 3405, 5405, 7905, 10905, 14405, 18405, 22905, 27905, 33655, 40155, 47405, 55405, 64155, 73905, 84655, 96405, 109155, 122905, 137405, 152905, 169405, 186905, 205405, 225405, 246905, 269905, 294405, 320405, 348405, 378405, 410405, 444405, 480405, 518905, 559905, 603405, 649405, 697905, 749405, 803905, 861405, 921905, 985405, 1053905, 1127405, 1205905, 1289405, 1377905, 1476405, 1584905, 1703405, 1831905, 1970405, 2128905, 2287405, 2485905, 2704405, 2942905, 3221405, 3539905, 3898405, 4296905, 4735405, 5233905, 5743905, 6263905, 6793905, 7333905, 7883905, 8443905, 9013905, 9593905, 10183905, 10783905, 11393905, 12013905, 12643905, 13283905, 13933905, 14593905, 15263905, 15943905, 16633905, 17333905, 18043905, 18763905, 19493905, 20233905, 20983905, 21743905, 22513905, 23293905, 24083905, 24893905, 25723905, 26573905, 27443905, 28333905, 29243905, 30173905, 31123905, 32093905, 33083905, 34093905, 35123905, 36173905, 37243905, 38333905, 39443905, 40573905, 41723905, 42893905, 44083905, 45293905, 46523905, 47773905, 49043905, 50333905, 51653905, 53003905, 54383905, 55793905, 57233905, 58708905, 60218905, 61763905, 63343905, 64958905, 66613905, 68308905, 70043905, 71818905, 73633905, 75493905, 77398905, 79348905, 81343905, 83383905, 85473905, 87613905, 89803905, 92043905, 94333905];

// XP total satu band Ascension (level 151-200 dst.).
function bandXp(a) {
  return Math.round(50e6 * Math.pow(1.45, a - 1) / 5e6) * 5e6;
}

// Total level Bumpkin dari XP. "asc" = farm.island.ascensionLevel (0 jika belum ascend).
// Hasilnya sama dengan getTotalBumpkinLevel di kode game.
function totalLevel(xp, asc = 0) {
  if (asc < 1) {
    let lv = 1;
    for (let i = 0; i < LEVEL_XP.length; i++) if (xp >= LEVEL_XP[i]) lv = i + 1;
    return lv;
  }
  let base = LEVEL_XP[LEVEL_XP.length - 1];
  for (let b = 1; b < asc; b++) base += bandXp(b);
  let within = 0;
  if (xp >= base) {
    if (xp >= base + bandXp(asc)) within = 50;
    else {
      let start = base; within = 1;
      for (let n = 1; n < 49; n++) {
        const next = start + bandXp(asc) * (1 + 0.03 * n) / 85.75;
        if (xp >= next) { within = n + 1; start = next; } else break;
      }
    }
  }
  return 150 + (asc - 1) * 50 + within;
}

const CATEGORIES = [
  "Crops", "Fruit Patch", "Greenhouse", "Trees", "Minerals", "Animals",
  "Machinery", "Fishing", "Cooking", "Compost", "Bees & Flowers", "Aging", "Legacy",
];

// Format satu skill:
// { name: "Nama persis di game", tier: 1, points: 1, island: "basic", effect: "Deskripsi", icon: "url gambar (opsional)" }
// "name" harus sama persis dengan nama di data farm agar tersinkron otomatis.
// "island": island minimum yang dibutuhkan (lihat ISLAND_ORDER). "points" menimpa TIER_COST.
// Skill dengan passive: true tidak memakai poin dan tidak bisa dipilih.
// Semua data di bawah diambil dari kode game (tree "Mining" di game = "Minerals" di sini).
// Efek = rank 1; upgrade belum dicakup.
const ISLAND_ORDER = ["basic", "spring", "desert", "volcano"];

const SKILLS = {
  "Crops": [
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
  ],
  "Fruit Patch": [
    { name: "Fruitful Fumble", tier: 1, points: 1, island: "spring", effect: "+0.1 Fruit Patch yield" },
    { name: "Fruity Heaven", tier: 1, points: 1, island: "spring", effect: "x0.9 Fruit Patch seeds cost" },
    { name: "Fruity Profit", tier: 1, points: 1, island: "spring", effect: "+50% coins from Tango's deliveries" },
    { name: "Loyal Macaw", tier: 1, points: 1, island: "spring", effect: "Double Macaw's effect" },
    { name: "No Axe No Worries", tier: 1, points: 1, island: "spring", effect: "Chop fruit branches and stems without axes; -1 wood from fruit branches and stems" },
    { name: "Catchup", tier: 2, points: 2, island: "spring", effect: "x0.9 Fruit Patch growth time" },
    { name: "Fruity Woody", tier: 2, points: 2, island: "spring", effect: "+1 wood from fruit branches and stems" },
    { name: "Pear Turbocharge", tier: 2, points: 2, island: "spring", effect: "Double Immortal Pear's effect" },
    { name: "Crime Fruit", tier: 2, points: 2, island: "spring", effect: "+10 Tomato and Lemon seeds stock" },
    { name: "Generous Orchard", tier: 3, points: 3, island: "spring", effect: "20% chance of +1 Fruit Patch yield" },
    { name: "Long Pickings", tier: 3, points: 3, island: "spring", effect: "x0.75 Apple and Banana growth time; +10% growth time for all other fruit patch fruits" },
    { name: "Short Pickings", tier: 3, points: 3, island: "spring", effect: "x0.75 Blueberry and Orange growth time; +10% growth time for all other fruit patch fruits" },
    { name: "Zesty Vibes", tier: 3, points: 3, island: "spring", effect: "+1 Tomato and Lemon yield; -0.25 yield for all other fruit patch fruits" },
  ],
  "Greenhouse": [
    { name: "Glass Room", tier: 1, points: 1, island: "desert", effect: "+0.1 Greenhouse produce yield" },
    { name: "Seedy Business", tier: 1, points: 1, island: "desert", effect: "x0.85 Greenhouse seeds cost" },
    { name: "Rice and Shine", tier: 1, points: 1, island: "desert", effect: "x0.95 growth time for greenhouse produce" },
    { name: "Victoria's Secretary", tier: 1, points: 1, island: "desert", effect: "+50% Coins from Victoria's deliveries" },
    { name: "Olive Express", tier: 2, points: 2, island: "desert", effect: "x0.9 Olive growth time" },
    { name: "Rice Rocket", tier: 2, points: 2, island: "desert", effect: "x0.9 Rice growth time" },
    { name: "Vine Velocity", tier: 2, points: 2, island: "desert", effect: "x0.9 Grape growth time" },
    { name: "Seeded Bounty", tier: 2, points: 2, island: "desert", effect: "+0.5 Greenhouse produce yield; +1 Greenhouse seed to plant" },
    { name: "Greenhouse Guru", tier: 3, points: 3, island: "desert", effect: "Ability to make all greenhouse produce currently growing ready to be harvested" },
    { name: "Greenhouse Gamble", tier: 3, points: 3, island: "desert", effect: "30% chance of +1 greenhouse produce" },
    { name: "Slick Saver", tier: 3, points: 3, island: "desert", effect: "-1 Oil to grow greenhouse produce" },
    { name: "Greasy Plants", tier: 3, points: 3, island: "desert", effect: "+1 Greenhouse produce yield; +100% Oil consumption in greenhouse" },
  ],
  "Trees": [
    { name: "Lumberjack's Extra", tier: 1, points: 1, island: "basic", effect: "+0.1 wood yield" },
    { name: "Tree Charge", tier: 1, points: 1, island: "basic", effect: "x0.9 tree growth time" },
    { name: "More Axes", tier: 1, points: 1, island: "basic", effect: "+50 axe stock" },
    { name: "Insta-Chop", tier: 1, points: 1, island: "basic", effect: "1 Tap Trees" },
    { name: "Tough Tree", tier: 2, points: 2, island: "basic", effect: "1/10 chance of x3 wood yield" },
    { name: "Feller's Discount", tier: 2, points: 2, island: "basic", effect: "x0.8 axe coin cost" },
    { name: "Money Tree", tier: 2, points: 2, island: "basic", effect: "1% chance of finding 200 Coins when chopping trees" },
    { name: "Tree Turnaround", tier: 3, points: 3, island: "basic", effect: "15% chance for trees to grow instantly" },
    { name: "Tree Blitz", tier: 3, points: 3, island: "basic", effect: "Ability to make all trees instantly grow" },
  ],
  "Minerals": [
    { name: "Rock'N'Roll", tier: 1, points: 1, island: "basic", effect: "+0.1 Stone Yield" },
    { name: "Iron Bumpkin", tier: 1, points: 1, island: "basic", effect: "+0.1 Iron Yield" },
    { name: "Speed Miner", tier: 1, points: 1, island: "basic", effect: "x0.8 Stone recovery time" },
    { name: "Tap Prospector", tier: 1, points: 1, island: "basic", effect: "1 tap small mineral nodes" },
    { name: "Forge-Ward Profits", tier: 1, points: 1, island: "basic", effect: "+20% Blacksmith deliveries revenue" },
    { name: "Iron Hustle", tier: 2, points: 2, island: "basic", effect: "x0.7 Iron recovery time" },
    { name: "Frugal Miner", tier: 2, points: 2, island: "basic", effect: "x0.8 all pickaxes coin cost" },
    { name: "Rocky Favor", tier: 2, points: 2, island: "basic", effect: "+1 Stone yield; -0.5 Iron yield" },
    { name: "Fire Kissed", tier: 2, points: 2, island: "basic", effect: "+1 Crimstone yield on 5th consecutive mine" },
    { name: "Midas Sprint", tier: 2, points: 2, island: "basic", effect: "x0.9 Gold recovery time" },
    { name: "Ferrous Favor", tier: 3, points: 3, island: "basic", effect: "+1 Iron yield; -0.5 Stone yield" },
    { name: "Golden Touch", tier: 3, points: 3, island: "basic", effect: "+0.5 Gold Yield" },
    { name: "More Picks", tier: 3, points: 3, island: "basic", effect: "Increased stock: +70 Pickaxe, +20 Stone Pickaxe, +7 Iron Pickaxe, +2 Gold Pickaxe" },
    { name: "Fireside Alchemist", tier: 3, points: 3, island: "basic", effect: "x0.85 Crimstone recovery time" },
    { name: "Midas Rush", tier: 3, points: 3, island: "basic", effect: "x0.8 Gold recovery time" },
  ],
  "Animals": [
    { name: "Efficient Feeding", tier: 1, points: 1, island: "spring", effect: "x0.95 feed to feed all animals" },
    { name: "Restless Animals", tier: 1, points: 1, island: "spring", effect: "x0.9 Animal sleep time" },
    { name: "Fine Fibers", tier: 1, points: 1, island: "spring", effect: "+0.1 Feather, Leather and Merino Wool yield" },
    { name: "Bountiful Bounties", tier: 1, points: 1, island: "spring", effect: "+50% Coins from Animal Bounties" },
    { name: "Double Bale", tier: 1, points: 1, island: "spring", effect: "Double Bale's Effect" },
    { name: "Bale Economy", tier: 1, points: 1, island: "spring", effect: "Bale affects milk and wool production" },
    { name: "Featherweight", tier: 1, points: 1, island: "spring", effect: "+0.35 Feather yield; -0.1 Leather & Merino Wool yield" },
    { name: "Abundant Harvest", tier: 2, points: 2, island: "spring", effect: "+0.2 Egg, Wool and Milk yield" },
    { name: "Heartwarming Instruments", tier: 2, points: 2, island: "spring", effect: "+50% Animal XP from Animal Affection tools" },
    { name: "Kale Mix", tier: 2, points: 2, island: "spring", effect: "Mixed Grain requires 3 kale to mix instead" },
    { name: "Alternate Medicine", tier: 2, points: 2, island: "spring", effect: "Barn Delight requires 1 less Lemon and Honey to mix" },
    { name: "Healthy Livestock", tier: 2, points: 2, island: "spring", effect: "x0.5 chance of sickness" },
    { name: "Merino Whisperer", tier: 2, points: 2, island: "spring", effect: "+0.35 Merino Wool yield; -0.1 Leather & Feather yield" },
    { name: "Clucky Grazing", tier: 3, points: 3, island: "spring", effect: "x0.75 feed to feed Chickens; +50% feed to feed other animals" },
    { name: "Sheepwise Diet", tier: 3, points: 3, island: "spring", effect: "x0.75 feed to feed Sheep; +50% feed to feed other animals" },
    { name: "Cow-Smart Nutrition", tier: 3, points: 3, island: "spring", effect: "x0.75 feed to feed Cows; +50% feed to feed other animals" },
    { name: "Chonky Feed", tier: 3, points: 3, island: "spring", effect: "2x animal xp from animal feed; +50% feed to feed all animals" },
    { name: "Leathercraft Mastery", tier: 3, points: 3, island: "spring", effect: "+0.35 Leather yield; -0.1 Feather & Merino Wool yield" },
    { name: "Barnyard Rouse", tier: 3, points: 3, island: "spring", effect: "Instantly wakes up all animals" },
  ],
  "Machinery": [
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
  ],
  "Fishing": [
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
  ],
  "Cooking": [
    { name: "Fast Feasts", tier: 1, points: 1, island: "basic", effect: "x0.9 Firepit and Kitchen cooking time" },
    { name: "Nom Nom", tier: 1, points: 1, island: "basic", effect: "+10% Food deliveries revenue" },
    { name: "Munching Mastery", tier: 1, points: 1, island: "basic", effect: "+5% Bumpkin XP" },
    { name: "Swift Sizzle", tier: 1, points: 1, island: "basic", effect: "x0.6 Fire Pit cooking time with oil" },
    { name: "Frosted Cakes", tier: 2, points: 2, island: "basic", effect: "x0.9 Cakes cooking time" },
    { name: "Juicy Boost", tier: 2, points: 2, island: "basic", effect: "+10% Bumpkin XP from drinks" },
    { name: "Turbo Fry", tier: 2, points: 2, island: "basic", effect: "x0.5 Kitchen cooking time with oil" },
    { name: "Drive-Through Deli", tier: 2, points: 2, island: "basic", effect: "+15% Bumpkin XP from Deli" },
    { name: "Instant Gratification", tier: 3, points: 3, island: "basic", effect: "Ability to make all meals currently cooking ready to be eaten" },
    { name: "Double Nom", tier: 3, points: 3, island: "basic", effect: "+1 food from cooking; 2x ingredients required for cooking" },
    { name: "Fiery Jackpot", tier: 3, points: 3, island: "basic", effect: "+20% Chance of +1 food from Firepit" },
    { name: "Fry Frenzy", tier: 3, points: 3, island: "basic", effect: "x0.4 Deli cooking time with oil" },
  ],
  "Compost": [
    { name: "Efficient Bin", tier: 1, points: 1, island: "basic", effect: "+5 Sprout Mix" },
    { name: "Turbo Charged", tier: 1, points: 1, island: "basic", effect: "+5 Fruitful Blend" },
    { name: "Wormy Treat", tier: 1, points: 1, island: "basic", effect: "+1 Worm" },
    { name: "Feathery Business", tier: 1, points: 1, island: "basic", effect: "Use feathers instead of eggs to boost composters; 2x feathers to boost composters" },
    { name: "Sprout Surge", tier: 1, points: 1, island: "basic", effect: "Put Sprout Mix on all plots" },
    { name: "Blend-tastic", tier: 1, points: 1, island: "basic", effect: "Put Fruitful Blend on all plots" },
    { name: "Premium Worms", tier: 2, points: 2, island: "basic", effect: "+10 Rapid Root" },
    { name: "Fruitful Bounty", tier: 2, points: 2, island: "basic", effect: "Double Fruitful Blend's Effect" },
    { name: "Swift Decomposer", tier: 2, points: 2, island: "basic", effect: "x0.9 compost time" },
    { name: "Composting Bonanza", tier: 2, points: 2, island: "basic", effect: "Speed up composters by an additional hour when boosting; 2x resources to boost composters" },
    { name: "Root Rocket", tier: 2, points: 2, island: "basic", effect: "Put Rapid Root on all plots" },
    { name: "Composting Overhaul", tier: 3, points: 3, island: "basic", effect: "+2 Worms" },
    { name: "Composting Revamp", tier: 3, points: 3, island: "basic", effect: "+5 fertilisers; -2 Worms" },
  ],
  "Bees & Flowers": [
    { name: "Sweet Bonus", tier: 1, points: 1, island: "spring", effect: "+0.1 Honey per hive" },
    { name: "Hyper Bees", tier: 1, points: 1, island: "spring", effect: "+0.1 Honey production speed" },
    { name: "Blooming Boost", tier: 1, points: 1, island: "spring", effect: "x0.9 Flower growth time" },
    { name: "Flower Sale", tier: 1, points: 1, island: "spring", effect: "x0.8 Flower Seeds cost" },
    { name: "Buzzworthy Treats", tier: 2, points: 2, island: "spring", effect: "+10% Bumpkin XP from Honey Foods" },
    { name: "Blossom Bonding", tier: 2, points: 2, island: "spring", effect: "+2 relationship points for gifting flowers" },
    { name: "Pollen Power Up", tier: 2, points: 2, island: "spring", effect: "Additional +0.1 crop yield after pollination (total +0.3)" },
    { name: "Petalled Perk", tier: 2, points: 2, island: "spring", effect: "10% chance of +1 Flower" },
    { name: "Bee Collective", tier: 3, points: 3, island: "spring", effect: "+20% Bee Swarm chance" },
    { name: "Flower Power", tier: 3, points: 3, island: "spring", effect: "x0.8 Flower growth time" },
    { name: "Flowery Abode", tier: 3, points: 3, island: "spring", effect: "+0.5 Honey production speed; +50% Flower growth time" },
    { name: "Petal Blessed", tier: 3, points: 3, island: "spring", effect: "Ability to make all flowers currently growing ready to be harvested" },
  ],
  "Aging": [
    { name: "Cheap Rakes", tier: 1, points: 1, island: "basic", effect: "x0.8 salt rake coin cost" },
    { name: "Speedy Aging", tier: 1, points: 1, island: "basic", effect: "x0.9 Fish Aging time" },
    { name: "Salty Seas", tier: 1, points: 1, island: "basic", effect: "x0.9 salt charge replenishment time" },
    { name: "Wide Rakes", tier: 1, points: 1, island: "basic", effect: "+2 Salt per harvest" },
    { name: "Bacalhau", tier: 1, points: 1, island: "basic", effect: "+1 Bait yield from fermentation rack" },
    { name: "Fish Smoking", tier: 2, points: 2, island: "basic", effect: "Doubled chance Aged Fish becomes Prime Aged" },
    { name: "Refiner", tier: 2, points: 2, island: "basic", effect: "15% chance of +1 Refined Salt when making Refined Salt" },
    { name: "Sea Blessed", tier: 2, points: 2, island: "basic", effect: "5% chance to restore 1 charge to 4 Salt Nodes on harvest" },
    { name: "Ager", tier: 3, points: 3, island: "basic", effect: "2× output from Aging Shed Racks; 2× Aging Shed inputs (ingredients, fish & salt)" },
    { name: "Salt Surge", tier: 3, points: 3, island: "basic", effect: "Recharge all Salt Nodes to max" },
  ],
  // Legacy: skill pasif milik beberapa akun, tidak bisa dibuka dengan skill point.
  // Status dibaca dari inventory farm (nama item sama dengan nama skill).
  "Legacy": [
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
  ],
};

// Catatan perubahan yang tampil di tab "Updates Made"
const UPDATES = [
  { date: "2026-09-30", note: "Versi awal: layout skill tree, kategori Minerals." },
  { date: "2026-09-30", note: "Tambah level Bumpkin, batas skill point, dan syarat tier." },
  { date: "2026-09-30", note: "Level Bumpkin dihitung otomatis dari XP farm." },
  { date: "2026-09-30", note: "Skill Minerals lengkap (15 skill), biaya, dan syarat tier diambil dari kode game." },
  { date: "2026-09-30", note: "Semua skill tree dan kategori Legacy (pasif) ditambahkan dari kode game." },
];
