export const fmtDate = (t) =>
  new Date(t).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

export function fmtDuration(ms) {
  const m = Math.max(0, Math.round(ms / 60000));
  const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
  return [d && `${d} hari`, h && `${h} jam`, (mm || (!d && !h)) && `${mm} menit`].filter(Boolean).join(" ");
}

export const hoursText = (h) => (h % 24 === 0 && h >= 24 ? `${h / 24} hari` : `${h} jam`);

// Durasi dalam detik -> teks ringkas (detik untuk < 1 menit).
export const fmtSeconds = (sec) => (sec < 60 ? `${Math.round(sec)} dtk` : fmtDuration(sec * 1000));

// Angka dengan pemisah ribuan lokal; desimal secukupnya.
export const fmtNum = (n, max = 2) => Number(n).toLocaleString("id-ID", { maximumFractionDigits: max });

// Detik -> "00d 00:00:00" (gaya sflhub).
export function fmtClock(sec) {
  const t = Math.max(0, Math.round(sec));
  const d = Math.floor(t / 86400), h = Math.floor((t % 86400) / 3600), m = Math.floor((t % 3600) / 60), x = t % 60;
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d)}d ${p(h)}:${p(m)}:${p(x)}`;
}

// Detik -> "hh:mm:ss" (jam bisa lebih dari 24, mis. 48:00:00).
export function fmtHms(sec) {
  const t = Math.max(0, Math.round(sec));
  const p = (n) => String(n).padStart(2, "0");
  return `${p(Math.floor(t / 3600))}:${p(Math.floor((t % 3600) / 60))}:${p(t % 60)}`;
}

// Angka dengan desimal tetap antara min dan max (gaya sflhub: 18,00 / 0,000010).
export const fmtDec = (n, min = 2, max = min) =>
  Number(n).toLocaleString("id-ID", { minimumFractionDigits: min, maximumFractionDigits: max });
