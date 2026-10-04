# Panduan mengubah data

Semua isi game ada di `src/data/`. Kode di `src/ui` dan `src/core` tidak perlu diubah.

## Mengubah / menambah skill
Buka file kategori di `src/data/skills/`, mis. `mining.js`:

```js
{ name: "Nama persis di game", tier: 1, points: 1, island: "basic", effect: "Deskripsi", icon: "url (opsional)" },
```
- `name` harus sama persis dengan nama di data farm agar tersinkron otomatis.
- `points` opsional (default dari `TIER_COST` di `tiers.js`).
- `island`: `basic` < `spring` < `desert` < `volcano`.
- `passive: true` untuk skill Legacy (tidak memakai poin).
- `upgrade: { kind, ranks }` (opsional) untuk skill yang bisa dinaikkan rank 1-3 dengan Ascension Shard. Nilainya disalin dari `upgrade.effect` di kode game (`bumpkinSkills.ts`). Biaya per rank ada di `src/data/tiers.js` (`UPGRADE_POINTS`, `MAX_RANK`): poin sesuai tier skill (1/3/6) dan Shard sama dengan nomor tier.
- `disabled: true` untuk skill yang dinonaktifkan di game.

## Menambah kategori baru
1. Buat `src/data/skills/nama-baru.js` (`export default [ ... ]`).
2. Import dan daftarkan di `src/data/skills/index.js`.
3. Tambahkan nama di `src/data/categories.js` dan syarat tier di `tiers.js`.

## Menambah catatan update
Tambah baris di `src/data/updates.js`.

## Menambah tab baru
Buat `src/ui/nama-tab.js` yang meng-export fungsi `(panel, render) => {}`, lalu daftarkan di `RENDERERS` pada `src/ui/render.js`.

## Ganti Worker / cache
Edit `src/config.js`.

## Ascension
- Level & XP: `src/core/level.js` (port dari `features/game/lib/level.ts`). Tabel XP level 1-150 ada di `src/data/level-xp.js`; band Ascension dihitung dengan rumus.
- Aturan rank/Shard: `src/core/rules.js` (`rankUpProblem`). Syarat rank berikutnya: tier tree `min(3, tier skill + rank sekarang)` harus terbuka, plus skill point dan Ascension Shard cukup.
- Island Ascension (`swamp`, `spooky`, `crystal`, `galaxy`, `marble`) ada di `ISLAND_ORDER` pada `src/data/tiers.js`.
- Format teks efek per rank: `src/core/rank-text.js`.

## Collectibles, Wearables, Temporary Buffs
Data `src/data/collectibles.js`, `wearables.js`, dan `temporary.js` **dihasilkan otomatis** dari kode game (teks efek dari kamus bahasa Inggris game). Jangan diedit manual. Untuk memperbarui setelah ada item baru:

```bash
python3 tools/update_item_data.py
```
Butuh internet. Pembagian:
- **Collectibles**: hanya boost permanen (item yang dipasang di farm).
- **Temporary Buffs**: item berdurasi (totem, hourglass, shrine), pupuk/consumable (Rapid Root, Sprout Mix, Salt Lick, dll.), dan buff non-item di `src/data/buffs.js` (Power hour).
- Efek yang angkanya bergantung kondisi (dinamis) dilewati supaya tidak salah.

Cara pakai di web: ketuk ikon untuk memilih, ketuk gembok agar ketukan hanya menampilkan efek (pilihan tidak berubah). Setelah sinkron farm, item yang dimiliki otomatis terpilih dan terkunci. Kepemilikan dibaca dari inventory (collectible, pupuk), wardrobe (wearable), `collectibles`/`home.collectibles` (terpasang), serta `boostHistory` dan `buffs` (jendela waktu buff).

## Pengaturan Farm
Panel di sidebar (`src/ui/settings.js`, logika `src/core/settings.js`, pilihan `src/data/settings.js`): island, musim, VIP, event hari ini, harga 1 Gem (USD), dan nilai 1 FLOWER (coins). Disimpan di localStorage. Saat Search, island/musim/VIP/event diisi dari farm (`island.type`, `season.season`, `vip.expiresAt`, `calendar`); angka Gem dan FLOWER diisi manual. Island yang dipilih dipakai untuk mengecek syarat island skill, dan semua kalkulator nanti membaca pengaturan ini.

## Buds
Tab Buds = Bud Builder: tambah Bud (type, stem, aura), pasang/cabut, dan lihat boost terbaik per resource. Setelah Search, Bud dari farm masuk otomatis. Aturan di `src/data/buds.js` (manual, dari `getBudYieldBoosts.ts`): pengali aura, `TYPE_RULES`, `STEM_RULES` (kriteria `match` mengacu ke `src/data/resources.js`). Perhitungan di `src/core/buds.js`. `resources.js` dihasilkan oleh `tools/update_item_data.py` (kategori crop basic/medium/advanced dari waktu panen, sama seperti game). Buff non-item (mis. Power hour) ada di `src/data/buffs.js`.


## Kalkulator (halaman Calculator)
Halaman terpisah dari Combo Maker (tombol Combo Maker / Calculator di atas; alamat `#/calculator`). Tata letak mengikuti sflhub: tab atas (Crops / CM / Fruits / GH, Minerals, Animals), sub-tab (Crops, Crop Machine, Fruits, Greenhouse), kontrol, kartu ringkasan, dan tabel. Saat ini baru **Crops** yang tersedia; tab lain menampilkan "belum tersedia".

- **UI:** `src/ui/calculator.js` (tab), `src/ui/crops-calc.js` (kontrol, kartu, tabel). Gaya: `assets/css/calculator.css`.
- **Input tersimpan** di localStorage (`src/core/calc-store.js`): mode, restock, plot, pupuk, Warehouse, jumlah seed per crop, harga P2P, fee.
- **Mode hitung:** Per Seed (angka = jumlah seed), Per Cycle (angka = jumlah siklus; tiap siklus menanam semua plot), Per Stock (angka = jumlah stok toko; stok x1,2 jika punya Warehouse).
- **Rencana & ringkasan** (`src/core/crop-plan.js`): siklus = ceil(seed / plot); waktu baris = siklus x waktu tumbuh; Total Time = jumlah waktu semua baris; restock = seed / stok per restock (rata-rata); 1 restock = 20 Gems; biaya restock (coins) = 20 Gems x (USD per Gem) / (USD per FLOWER) x (coins per FLOWER); kartu 24h = x (86400 / Total Time), mingguan = x7.
- **Betty vs P2P:** Betty = harga jual coins di game. P2P = harga pasar (FLOWER) yang Anda isi per crop, dikurangi fee. Best Selling Option membandingkan profit Betty (dalam FLOWER) dan profit P2P. Harga P2P tidak diambil otomatis.
- **Paket Gems** (`GEM_PACKS` di `src/data/settings.js`) diambil dari sflhub, bukan dari kode game. Stok seed (`src/data/stock.js`) dan data crop (`src/data/crops.js`) dihasilkan oleh `tools/update_item_data.py`.

### Mesin hitung crop (`src/core/crop-calc.js`)
- Port dari `getCropTime`/`getCropPlotTime` (plant.ts) dan `getMultiplicativeCropYield`/`getCropYieldAmount` (harvest.ts). Urutan sama dengan game: hasil dikali dulu, lalu ditambah, lalu event (Insect Plague x0.5, Bountiful Harvest +1); hasil dibulatkan ke bawah 4 desimal.
- **Menambah/mengubah boost:** edit tabel di awal file (`TIME_BY_CROP`, `YIELD_MUL_BY_CROP`, `YIELD_ADD_BY_CROP`, `YIELD_CHANCE_BY_CROP`) atau fungsi `growthTime` / `harvestYield`. Nilai rank skill dibaca dari `upgrade` di `src/data/skills/`.
- **Sumber boost:** pilihan di Combo Maker (skill + rank, collectible, wearable, Bud, buff sementara), pupuk (dropdown kalkulator), musim/event (sidebar). Setelah Search yang otomatis terpilih = collectible terpasang, wearable dipakai, buff aktif.
- Boost berpeluang (Green Amulet, Peeled/Potent Potato, Stellar Sunflower, Radical Radish) dihitung sebagai nilai harapan. Memakai jalur game tanpa flag beta `SPEED_BOOSTS`.
- **Belum dimodelkan:** AOE berbasis posisi (Scary Mike, Laurie, Sir Goldensnout, Queen Cornelia, Gnome-Cobalt-Clementine, Basic/Chonky Scarecrow), Bee Swarm, guardian cuaca, diskon harga seed, bonus harga jual.
- **Cara memeriksa:** ketuk nama crop di tabel untuk rincian tiap boost, lalu bandingkan dengan angka di game.
