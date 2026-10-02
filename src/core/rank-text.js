// Teks efek per rank untuk skill yang bisa di-upgrade (data dari upgrade.effect di game).
const n = (v) => String(Math.round(v * 1000) / 1000);
const pct = (v) => n(v * 100) + "%";
const dur = (ms) => {
  const m = Math.round(ms / 60000);
  return m >= 60 ? n(m / 60) + " jam" : m + " mnt";
};

// Hanya jenis efek yang artinya jelas; sisanya ditampilkan sebagai angka mentah.
const SIMPLE = {
  growthMultiplier: (v) => `x${n(v)} waktu tumbuh`,
  additiveYield: (v) => `+${n(v)} hasil`,
  coinBonus: (v) => `+${pct(v)} koin`,
  xpBonus: (v) => `+${pct(v)} XP`,
  timeReduction: (v) => `-${pct(v)} waktu`,
  oilReduction: (v) => `-${pct(v)} oil`,
  costMultiplier: (v) => `x${n(v)} biaya`,
  multiplier: (v) => `x${n(v)}`,
  flatBonus: (v) => `+${n(v)}`,
  dailyLimit: (v) => `+${n(v)} batas harian`,
  cooldown: (v) => `cooldown ${dur(v)}`,
  flatTimeBonus: (v) => `-${dur(v)}`,
  chance: (v) => `peluang ${n(v)}%`,
};

export function rankLines(up) {
  return [0, 1, 2].map((i) => Object.entries(up).filter(([k]) => k !== "kind").map(([k, val]) => {
    if (k === "ranks" && !Array.isArray(val)) // stockBonus: { Item: [r1, r2, r3] }
      return Object.entries(val).map(([name, a]) => `${name} +${n(a[i])}`).join(", ");
    const v = Array.isArray(val) ? val[i] : val;
    if (k === "ranks" && typeof v === "number" && SIMPLE[up.kind]) return SIMPLE[up.kind](v);
    const txt = typeof v === "object" ? JSON.stringify(v) : n(v);
    return `${k === "ranks" ? up.kind : k}: ${txt}`;
  }).join("; "));
}
