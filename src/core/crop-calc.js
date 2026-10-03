// Kalkulator crop plot. Port dari game (Sunflower Land):
//   waktu tumbuh: getCropTime + getCropPlotTime (events/landExpansion/plant.ts)
//   hasil panen : getMultiplicativeCropYield + getCropYieldAmount (events/landExpansion/harvest.ts)
// Memakai jalur game TANPA flag SPEED_BOOSTS (flag beta): boost kecepatan mengurangi waktu di awal.
//
// Tidak dimodelkan (bergantung posisi/kondisi acak di farm): AOE (Scary Mike, Laurie, Sir Goldensnout,
// Queen Cornelia, Gnome-Cobalt-Clementine, Basic/Chonky Scarecrow), Bee Swarm, dan guardian cuaca.
import { state } from "../state.js";
import { SKILLS } from "../data/skills/index.js";
import { CROPS } from "../data/crops.js";
import { MAX_RANK } from "../data/tiers.js";
import { budSpeed, budYieldFor } from "./buds.js";

const SKILL_LIST = Object.values(SKILLS).flat();
const upgradeOf = (name) => SKILL_LIST.find((s) => s.name === name && s.upgrade)?.upgrade;
const floor4 = (x) => Math.floor(x * 1e4 + 1e-9) / 1e4;
const FACTION_QUIVER = { bumpkins: "Bumpkin Quiver", goblins: "Goblin Quiver", nightshades: "Nightshade Quiver", sunflorians: "Sunflorian Quiver" };

// Pupuk yang bisa dipilih di kalkulator.
export const FERTILISERS = ["Sprout Mix", "Rapid Root", "Sproutroot Surprise"];

// Konteks: apa yang aktif (dari pilihan di semua tab + pengaturan farm).
export function buildContext(s = state) {
  const picked = (k) => s.picked?.[k] ?? new Set();
  const col = picked("Collectibles"), wear = picked("Wearables"), tmp = picked("Temporary Buffs");
  return {
    rank: (n) => (s.selected.has(n) ? Math.min(MAX_RANK, s.ranks[n] ?? 1) : 0),
    has: (n) => col.has(n),
    wears: (n) => wear.has(n),
    temp: (n) => tmp.has(n),
    legacy: (n) => s.legacyOwned.has(n),
    season: s.settings?.season || null,
    event: s.settings?.event || null,
    faction: s.farm?.faction?.name ?? null,
    buds: s.buds ?? [],
    fert: s.calc?.fert || "",
  };
}

const rankValue = (c, name, key = "ranks") => {
  const r = c.rank(name);
  return r ? upgradeOf(name)?.[key]?.[r - 1] : undefined;
};

// Boost khusus satu crop: [crop, "c"=collectible | "w"=wearable, item, nilai]
const TIME_BY_CROP = [
  ["Parsnip", "c", "Mysterious Parsnip", 0.5], ["Carrot", "w", "Carrot Amulet", 0.8], ["Cabbage", "c", "Cabbage Girl", 0.5],
  ["Eggplant", "c", "Obie", 0.75], ["Corn", "c", "Kernaldo", 0.75], ["Pepper", "w", "Red Pepper Onesie", 0.75],
  ["Broccoli", "w", "Broccoli Hat", 0.5], ["Zucchini", "c", "Giant Zucchini", 0.5], ["Turnip", "c", "Giant Turnip", 0.5],
];
const YIELD_MUL_BY_CROP = [
  ["Cauliflower", "c", "Golden Cauliflower", 2], ["Carrot", "c", "Easter Bunny", 1.2], ["Pumpkin", "c", "Victoria Sisters", 1.2],
  ["Parsnip", "w", "Parsnip", 1.2], ["Beetroot", "w", "Beetroot Amulet", 1.2], ["Sunflower", "w", "Sunflower Amulet", 1.1],
];
const YIELD_ADD_BY_CROP = [
  ["Eggplant", "c", "Purple Trail", 0.2], ["Eggplant", "c", "Maximus", 1], ["Eggplant", "w", "Eggplant Onesie", 0.1],
  ["Artichoke", "c", "Giant Artichoke", 2], ["Yam", "c", "Giant Yam", 0.5], ["Soybean", "w", "Tofu Mask", 0.1],
  ["Corn", "w", "Corn Onesie", 0.1], ["Corn", "w", "Corn Silk Hair", 2], ["Wheat", "w", "Sickle", 2],
  ["Barley", "c", "Sheaf of Plenty", 2], ["Kale", "c", "Giant Kale", 2], ["Corn", "c", "Poppy", 0.1],
  ["Pumpkin", "c", "Freya Fox", 0.5], ["Carrot", "c", "Lab Grown Carrot", 0.2], ["Pumpkin", "c", "Lab Grown Pumpkin", 0.3],
  ["Radish", "c", "Lab Grown Radish", 0.4], ["Soybean", "c", "Soybliss", 1], ["Onion", "c", "Giant Onion", 3],
  ["Carrot", "c", "Pablo The Bunny", 0.1], ["Kale", "c", "Foliant", 0.2],
];
// Boost acak: nilai = peluang (%) x tambahan -> rata-rata hasil.
const YIELD_CHANCE_BY_CROP = [
  ["Potato", "Peeled Potato", 20, 1], ["Potato", "Potent Potato", 10 / 3, 10],
  ["Sunflower", "Stellar Sunflower", 10 / 3, 10], ["Radish", "Radical Radish", 10 / 3, 10],
];

const own = (c, type, item) => (type === "c" ? c.has(item) : c.wears(item));
const inSeason = (crop, c, season) => c.season === season && crop.seasons.includes(season);

// Waktu tumbuh (detik) setelah semua boost: { seconds, lines: [{ name, text }] }.
export function growthTime(crop, c) {
  const mults = [];
  const add = (name, m, note) => mults.push({ name, m, note });

  if (c.legacy("Seed Specialist")) add("Seed Specialist", 0.9);
  const scare = ["Kuebiko", "Scarecrow", "Nancy"].find((n) => c.has(n));
  if (scare) add(scare, 0.85);
  if (c.has("Lunar Calendar")) add("Lunar Calendar", 0.9);
  const totem = ["Super Totem", "Time Warp Totem"].find((n) => c.temp(n));
  if (totem) add(totem, 0.5);
  if (c.temp("Harvest Hourglass")) add("Harvest Hourglass", 0.75);
  const strong = rankValue(c, "Strong Roots");
  if (strong && crop.tier === "advanced") add(`Strong Roots (rank ${c.rank("Strong Roots")})`, strong);
  const sp = budSpeed(c.buds);
  if (sp) add(`Bud ${sp.bud.id}`, sp.mult);

  if (inSeason(crop, c, "summer") && c.wears("Solflare Aegis")) add("Solflare Aegis", 0.5);
  if (inSeason(crop, c, "autumn") && c.wears("Autumn's Embrace")) add("Autumn's Embrace", 0.5);
  const gt = rankValue(c, "Green Thumb");
  if (gt) add(`Green Thumb (rank ${c.rank("Green Thumb")})`, gt);
  if (c.temp("Sparrow Shrine")) add("Sparrow Shrine", 0.75);
  if (c.temp("Power hour")) add("Power hour", 0.5);
  TIME_BY_CROP.filter(([n, t, item]) => n === crop.name && own(c, t, item)).forEach(([, , item, m]) => add(item, m));
  if (c.fert === "Rapid Root" || c.fert === "Sproutroot Surprise") add(c.fert, 0.5);
  if (c.event === "sunshower") add("Sunshower", 0.5);

  const seconds = mults.reduce((t, x) => t * x.m, crop.seconds);
  return { seconds, lines: mults.map((x) => ({ name: x.name, text: `x${x.m}` })) };
}

// Hasil per panen (rata-rata) setelah semua boost: { amount, lines: [{ name, text }] }.
export function harvestYield(crop, c) {
  const lines = [];
  let mul = 1;
  const times = (name, f, note) => { mul *= f; lines.push({ name, text: `x${Number(f.toFixed(4))}${note ? ` (${note})` : ""}` }); };

  if (c.wears("Green Amulet")) times("Green Amulet", 1.9, "rata-rata: peluang 10% hasil x10");
  YIELD_MUL_BY_CROP.filter(([n, t, item]) => n === crop.name && own(c, t, item)).forEach(([, , item, f]) => times(item, f));
  const farmer = ["Kuebiko", "Scarecrow"].find((n) => c.has(n));
  if (farmer) times(farmer, 1.2);
  if (c.legacy("Coder")) times("Coder", 1.2);

  let amount = mul;
  const plus = (name, v, note) => { amount += v; lines.push({ name, text: `${v < 0 ? "-" : "+"}${Math.abs(Number(v.toFixed(4)))}${note ? ` (${note})` : ""}` }); };

  if (c.temp("Power hour")) plus("Power hour", 0.2);
  YIELD_CHANCE_BY_CROP.filter(([n, item]) => n === crop.name && c.has(item))
    .forEach(([, item, chance, bonus]) => plus(item, (chance / 100) * bonus, `rata-rata: peluang ${Number(chance.toFixed(2))}% +${bonus}`));
  if (crop.name === "Cabbage") {
    if (c.has("Cabbage Boy")) {
      plus("Cabbage Boy", 0.25);
      if (c.has("Cabbage Girl")) plus("Cabbage Girl", 0.25);
    } else if (c.has("Karkinos")) plus("Karkinos", 0.1);
  }
  YIELD_ADD_BY_CROP.filter(([n, t, item]) => n === crop.name && own(c, t, item)).forEach(([, , item, v]) => plus(item, v));

  if (c.fert === "Sprout Mix" || c.fert === "Sproutroot Surprise") {
    plus(c.fert, 0.2);
    if (c.has("Knowledge Crab")) plus("Knowledge Crab", 0.2);
  }
  if (inSeason(crop, c, "spring") && c.wears("Blossom Ward")) plus("Blossom Ward", 1);
  if (inSeason(crop, c, "winter") && c.wears("Frozen Heart")) plus("Frozen Heart", 1);
  if (c.wears("Infernal Pitchfork")) plus("Infernal Pitchfork", 3);
  if (c.temp("Legendary Shrine")) plus("Legendary Shrine", 1);
  const quiver = c.faction ? FACTION_QUIVER[c.faction] : null;
  const wearsQuiver = quiver ? c.wears(quiver) : Object.values(FACTION_QUIVER).some((q) => c.wears(q));
  if (wearsQuiver) plus(quiver || "Quiver faksi", 0.25);
  const bud = budYieldFor(crop.name, c.buds);
  if (bud) plus(`Bud ${bud.bud.id}`, bud.boost);
  if (crop.overnight && c.has("Hoot")) plus("Hoot", 0.5);

  // Skill (rank dari pilihan di tab Skills)
  const tierSkill = { basic: "Young Farmer", medium: "Experienced Farmer", advanced: "Old Farmer" }[crop.tier];
  const tv = rankValue(c, tierSkill);
  if (tv) plus(`${tierSkill} (rank ${c.rank(tierSkill)})`, tv);
  const acre = c.rank("Acre Farm"), hect = c.rank("Hectare Farm");
  if (acre) {
    const u = upgradeOf("Acre Farm");
    crop.tier === "advanced" ? plus(`Acre Farm (rank ${acre})`, u.buff[acre - 1]) : plus(`Acre Farm (rank ${acre})`, -u.debuff[acre - 1]);
  }
  if (hect) {
    const u = upgradeOf("Hectare Farm");
    crop.tier === "advanced" ? plus(`Hectare Farm (rank ${hect})`, -u.debuff[hect - 1]) : plus(`Hectare Farm (rank ${hect})`, u.buff[hect - 1]);
  }

  // Event kalender (urutan sama dengan game: wabah dulu, lalu bonus)
  if (c.event === "insectPlague") { amount *= 0.5; lines.push({ name: "Insect Plague", text: "x0.5" }); }
  if (c.event === "bountifulHarvest") plus("Bountiful Harvest", 1);

  return { amount: floor4(amount), lines };
}

// Hasil lengkap satu crop. Biaya seed dalam coins; profit = nilai jual - biaya seed (per panen per plot).
export function calcCrop(crop, c = buildContext(), opts = {}) {
  const t = growthTime(crop, c);
  const y = harvestYield(crop, c);
  const revenue = y.amount * crop.sellPrice;
  const profit = revenue - crop.seedPrice;
  const perDay = (86400 / t.seconds) * profit;     // asumsi tanam ulang tepat saat siap
  return { crop, seconds: t.seconds, timeLines: t.lines, amount: y.amount, yieldLines: y.lines, revenue, profit, perDay };
}

// Crop yang bisa ditanam sekarang: bukan event, sesuai musim (jika dipilih), dan level cukup (jika diketahui).
export function availableCrops({ allSeasons = false } = {}) {
  const season = state.settings?.season;
  return CROPS.filter((x) => x.seasons.length && (allSeasons || !season || x.seasons.includes(season)));
}
