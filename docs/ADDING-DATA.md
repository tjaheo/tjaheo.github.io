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
