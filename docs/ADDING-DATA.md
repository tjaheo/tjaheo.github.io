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
