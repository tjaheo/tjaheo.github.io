// data.js - EDIT FILE INI saat ada update dari Sunflower Land.
// Halaman (index.html) tidak perlu diubah.

const WORKER = "https://sfl.tjaheo89.workers.dev"; // alamat Worker kamu

// Syarat membuka tier: total poin yang sudah dipakai di tree yang sama
// pada tier DI BAWAHNYA. Tier 2 butuh 2 poin dari tier 1.
// Tier 3 butuh total 5 poin dari tier 1 dan 2.
const TIER_REQUIRE = { 1: 0, 2: 2, 3: 5 };

// Biaya default mengambil skill menurut tier.
// PLACEHOLDER: cek di game. Bisa ditimpa per skill dengan field "points".
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
// { name: "Nama persis di game", tier: 1, points: 1 (opsional), effect: "Deskripsi", icon: "url gambar (opsional)" }
// "name" harus sama persis dengan nama di data farm agar tersinkron otomatis.
// CATATAN: tier dan effect di bawah masih PLACEHOLDER. Cek dan isi sesuai game.
const SKILLS = {
  "Minerals": [
    { name: "Frugal Miner",       tier: 1, effect: "" },
    { name: "More Picks",         tier: 1, effect: "" },
    { name: "Rocky Favor",        tier: 1, effect: "" },
    { name: "Speed Miner",        tier: 2, effect: "" },
    { name: "Rock'N'Roll",        tier: 2, effect: "" },
    { name: "Fire Kissed",        tier: 2, effect: "" },
    { name: "Forge-Ward Profits", tier: 3, effect: "" },
    { name: "Golden Touch",       tier: 3, effect: "" },
    { name: "Midas Rush",         tier: 3, effect: "" },
  ],
  // Tambah kategori lain dengan format yang sama.
};

// Catatan perubahan yang tampil di tab "Updates Made"
const UPDATES = [
  { date: "2026-09-30", note: "Versi awal: layout skill tree, kategori Minerals." },
  { date: "2026-09-30", note: "Tambah level Bumpkin, batas skill point, dan syarat tier." },
  { date: "2026-09-30", note: "Level Bumpkin dihitung otomatis dari XP farm." },
];
