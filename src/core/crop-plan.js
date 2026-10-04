// Rencana hitung kalkulator crops (tata letak seperti sflhub): tiap crop punya jumlah seed/siklus/stok
// yang diisi pengguna; hasilnya dijumlahkan menjadi ringkasan (waktu, restock, profit 24 jam, mingguan).
//
// Asumsi (lihat "How does this table work?" di halaman):
//  - plot dipakai bergantian: siklus = ceil(seed / jumlah plot); waktu baris = siklus x waktu tumbuh.
//  - Total Time = jumlah waktu semua baris (crop ditanam berurutan).
//  - Restock = stok seed yang dipakai / stok per restock (rata-rata, pecahan); 1 restock = 20 Gems.
//  - Biaya restock (coins) = 20 Gems x (USD per Gem) / (USD per FLOWER) x (coins per FLOWER).
import { SEED_STOCK } from "../data/stock.js";
import { GEM_PACKS } from "../data/settings.js";

export const RESTOCK_GEMS = 20; // BB_TO_GEM_RATIO di game

export function usdPerGem(s) {
  const p = GEM_PACKS.find((x) => String(x.gems) === String(s.gemPack));
  return p ? p.usd / p.gems : null;
}

// Biaya satu restock dalam coins; null bila paket Gems / harga FLOWER belum diisi.
export function restockCoins(s) {
  const g = usdPerGem(s), fu = Number(s.flowerUsd), fc = Number(s.flowerCoins);
  return g && fu > 0 && fc > 0 ? (RESTOCK_GEMS * g / fu) * fc : null;
}

export const toFlower = (coins, s) => (Number(s.flowerCoins) > 0 ? coins / Number(s.flowerCoins) : null);

// Stok seed per restock (Warehouse +20%, dibulatkan ke atas seperti di game).
export function stockOf(crop, warehouse) {
  const base = SEED_STOCK[crop.seed];
  return base == null ? 0 : warehouse ? Math.ceil(Number((base * 1.2).toFixed(6))) : base;
}

// Satu baris tabel. r = hasil calcCrop; o = { mode, input, plots, warehouse, deduct, restockCoins, flowerCoins, p2p, fee }
export function planRow(r, o) {
  const stock = stockOf(r.crop, o.warehouse);
  const input = Math.max(0, Number(o.input) || 0);
  const seeds = o.mode === "cycle" ? input * o.plots : o.mode === "stock" ? input * stock : input;
  const cycles = seeds > 0 ? Math.ceil(seeds / o.plots) : 0;
  const seconds = cycles * r.seconds;
  const crops = seeds * r.amount;
  const seedCost = seeds * r.crop.seedPrice;
  const restocks = stock > 0 ? seeds / stock : 0;
  const restockCost = restocks * (o.restockCoins ?? 0);
  const revenue = crops * r.crop.sellPrice;                       // dijual ke Betty (coins)
  const profit = revenue - seedCost - (o.deduct ? restockCost : 0);
  const hourly = seconds > 0 ? profit / (seconds / 3600) : 0;

  // P2P (FLOWER): perlu harga P2P per crop dan nilai FLOWER (coins)
  const fc = Number(o.flowerCoins);
  const p2pNet = o.p2p > 0 ? o.p2p * (1 - (Number(o.fee) || 0) / 100) : null;
  const p2pProfit = p2pNet != null && fc > 0
    ? crops * p2pNet - (seedCost + (o.deduct ? restockCost : 0)) / fc : null;
  const p2pHourly = p2pProfit != null && seconds > 0 ? p2pProfit / (seconds / 3600) : p2pProfit != null ? 0 : null;
  const bettyFlower = fc > 0 ? profit / fc : null;
  const best = p2pProfit != null && bettyFlower != null && p2pProfit > bettyFlower ? "p2p" : "betty";
  return { stock, seeds, cycles, seconds, crops, seedCost, restocks, restockCost, revenue, profit, hourly, p2pNet, p2pProfit, p2pHourly, best };
}

// Ringkasan dari semua baris.
export function summarize(rows, s) {
  const sum = (k) => rows.reduce((n, r) => n + r[k], 0);
  const time = sum("seconds");
  const f = time > 0 ? 86400 / time : 0;
  const restocks = sum("restocks");
  const costAll = sum("restockCost");
  const profit = sum("profit");
  return {
    time, restocks, gems: restocks * RESTOCK_GEMS, restockCost: costAll, profit,
    restocks24: restocks * f, gems24: restocks * RESTOCK_GEMS * f, restockCost24: costAll * f,
    profit24: profit * f, weekly: profit * f * 7, flowerCoins: Number(s.flowerCoins) || 0,
  };
}
