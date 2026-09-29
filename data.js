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

// Total skill point yang dimiliki pada level tertentu.
// PLACEHOLDER: ganti dengan aturan game, misalnya tabel atau rumus.
function pointsForLevel(level) {
  return level;
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
];
