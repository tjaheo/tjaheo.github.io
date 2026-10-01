// Mengambil data farm lewat Cloudflare Worker + cache lokal.
import { WORKER, CACHE_TTL } from "../config.js";
import { loadJson, saveJson, save } from "../utils/storage.js";

const cacheKey = (id) => "farm:" + id;

export function readCache(id) {
  const c = loadJson(cacheKey(id));
  return c && c.farm && Date.now() - c.t < CACHE_TTL ? c.farm : null;
}

export async function fetchFarm(id) {
  const res = await fetch(`${WORKER}/?id=${encodeURIComponent(id)}`);
  if (res.status === 429) throw new Error("Terlalu banyak permintaan. Tunggu 1-2 menit lalu coba lagi.");
  if (!res.ok) throw new Error(`Gagal memuat (status ${res.status}).`);
  const { farm } = await res.json();
  saveJson(cacheKey(id), { t: Date.now(), farm });
  save("farmId", id);
  return farm;
}
