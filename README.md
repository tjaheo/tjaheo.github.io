# SFL Skill Tree

Kalkulator skill tree Sunflower Land (untuk penggunaan pribadi). Dihosting di GitHub Pages: <https://tjaheo.github.io>

Farm ID: `582579771799538`

## Struktur folder

```
.
├── index.html              # Kerangka halaman (tanpa logika/CSS inline)
├── assets/
│   ├── css/                # variables.css (warna) · base.css · layout.css · components.css · items.css · sidebar.css
│   └── icons/              # lock.png, unlock.png
├── src/
│   ├── main.js             # Titik masuk: event, sinkron farm
│   ├── config.js           # URL Worker, lama cache, daftar tab
│   ├── state.js            # State aplikasi
│   ├── core/               # Logika murni: level.js (XP, Ascension), rules.js (poin, tier, island, rank), rank-text.js
│   ├── services/           # farm-api.js: fetch ke Worker + cache
│   ├── ui/                 # Render: sidebar, tabs, stats, skills-tab, items-tab (daftar item), settings (sidebar), header (gembok), collectibles/wearables/buds/temporary-tab, updates-tab, render.js
│   ├── utils/              # dom.js, storage.js
│   └── data/               # DATA saja (yang paling sering diedit)
│       ├── skills/         # Satu file per skill tree + index.js
│       ├── categories.js   # Urutan kategori
│       ├── tiers.js        # Syarat tier, biaya, urutan island
│       ├── level-xp.js     # Tabel XP per level
│       └── updates.js      # Isi tab "Updates Made"
├── tools/update_item_data.py  # Perbarui data collectible/wearable dari kode game
└── docs/ADDING-DATA.md     # Panduan menambah/mengubah data
```

## Menjalankan lokal

Memakai ES Modules, jadi harus lewat server (bukan buka file langsung):

```bash
python3 -m http.server 8000   # lalu buka http://localhost:8000
```

## Deploy

Push ke branch `main`; GitHub Pages menyajikan root repo.
