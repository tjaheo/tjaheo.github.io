// data.js - EDIT FILE INI saat ada update dari Sunflower Land.
// Halaman (index.html) tidak perlu diubah.

const WORKER = "https://sfl.tjaheo89.workers.dev"; // alamat Worker kamu

// Poin yang dibutuhkan untuk membuka tiap tier (sesuaikan dengan game)
const TIER_UNLOCK = { 1: 0, 2: 3, 3: 7 };

const CATEGORIES = [
  "Crops", "Fruit Patch", "Greenhouse", "Trees", "Minerals", "Animals",
  "Machinery", "Fishing", "Cooking", "Compost", "Bees & Flowers", "Aging", "Legacy",
];

// Format satu skill:
// { name: "Nama persis di game", tier: 1, points: 1, effect: "Deskripsi efek", icon: "url gambar (opsional)" }
// "name" harus sama persis dengan nama di data farm agar tersinkron otomatis.
// CATATAN: tier dan effect di bawah masih PLACEHOLDER. Cek dan isi sesuai game.
const SKILLS = {
  "Minerals": [
    { name: "Frugal Miner",       tier: 1, points: 1, effect: "" },
    { name: "More Picks",         tier: 1, points: 1, effect: "" },
    { name: "Rocky Favor",        tier: 1, points: 1, effect: "" },
    { name: "Speed Miner",        tier: 2, points: 1, effect: "" },
    { name: "Rock'N'Roll",        tier: 2, points: 1, effect: "" },
    { name: "Fire Kissed",        tier: 2, points: 1, effect: "" },
    { name: "Forge-Ward Profits", tier: 3, points: 1, effect: "" },
    { name: "Golden Touch",       tier: 3, points: 1, effect: "" },
    { name: "Midas Rush",         tier: 3, points: 1, effect: "" },
  ],
  // Tambah kategori lain dengan format yang sama, contoh:
  // "Crops": [ { name: "...", tier: 1, points: 1, effect: "..." } ],
};

// Catatan perubahan yang tampil di tab "Updates Made"
const UPDATES = [
  { date: "2026-09-30", note: "Versi awal: layout skill tree, kategori Minerals." },
];
