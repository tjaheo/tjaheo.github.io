export const fmtDate = (t) =>
  new Date(t).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

export function fmtDuration(ms) {
  const m = Math.max(0, Math.round(ms / 60000));
  const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
  return [d && `${d} hari`, h && `${h} jam`, (mm || (!d && !h)) && `${mm} menit`].filter(Boolean).join(" ");
}

export const hoursText = (h) => (h % 24 === 0 && h >= 24 ? `${h / 24} hari` : `${h} jam`);
