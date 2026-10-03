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
