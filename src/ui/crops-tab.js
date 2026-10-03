// Tab Crops: kalkulator keuntungan crop plot memakai semua pilihan (skill, collectible, wearable, bud, buff).
import { state } from "../state.js";
import { el } from "../utils/dom.js";
import { fmtSeconds, fmtNum } from "../utils/format.js";
import { SEASONS } from "../data/settings.js";
import { FERTILISERS, buildContext, calcCrop, availableCrops } from "../core/crop-calc.js";
import { hasFarm } from "../core/ownership.js";

const MODES = {
  seed: "Per seed (1 plot, 1 panen)",
  cycle: "Per siklus (semua plot, 1 panen)",
  day: "Per hari/minggu (tanam ulang terus)",
};

const farmPlots = () => Object.keys(state.farm?.crops || {}).length || 1;

function field(label, control) {
  const wrap = el("label", "field");
  wrap.append(el("span", "", label));
  wrap.append(control);
  return wrap;
}

function select(options, value, onChange) {
  const s = el("select");
  options.forEach(([k, v]) => { const o = el("option", "", v); o.value = k; o.selected = k === value; s.append(o); });
  s.onchange = () => onChange(s.value);
  return s;
}

function controls(panel, render) {
  const c = state.calc;
  const bar = el("div", "bud-form");
  bar.append(field("Mode", select(Object.entries(MODES), c.mode, (v) => { c.mode = v; render(); })));
  if (c.mode === "day") bar.append(field("Periode", select([["day", "Per hari"], ["week", "Per minggu"]], c.period, (v) => { c.period = v; render(); })));
  bar.append(field("Pupuk", select([["", "Tanpa pupuk"], ...FERTILISERS.map((f) => [f, f])], c.fert, (v) => { c.fert = v; render(); })));
  if (c.mode !== "seed") {
    const plots = el("input");
    plots.type = "number"; plots.min = "1"; plots.inputMode = "numeric";
    plots.value = c.plots ?? farmPlots();
    plots.onchange = () => { c.plots = Math.max(1, Math.floor(Number(plots.value)) || 1); render(); };
    bar.append(field("Jumlah plot", plots));
  }
  panel.append(bar);

  const all = el("label", "check");
  const box = el("input");
  box.type = "checkbox"; box.checked = c.allSeasons;
  box.onchange = () => { c.allSeasons = box.checked; render(); };
  all.append(box, el("span", "", "Tampilkan crop semua musim"));
  panel.append(all);
}

function info(panel) {
  const season = state.settings?.season;
  const n = (k) => (state.picked?.[k]?.size ?? 0);
  const msgs = [
    `Boost aktif: ${state.selected.size} skill, ${n("Collectibles")} collectible, ${n("Wearables")} wearable, ${n("Temporary Buffs")} buff sementara, ${state.buds.filter((b) => b.placed).length} bud.`,
    season ? `Musim: ${SEASONS[season]}${state.settings.event ? `, event: ${state.settings.event}` : ""}.` : "Musim belum dipilih (atur di sidebar untuk memfilter crop dan boost musiman).",
  ];
  if (!hasFarm()) msgs.push("Farm belum disinkron: boost diambil dari pilihan manual di tab lain.");
  msgs.forEach((t) => panel.append(el("p", "hint", t)));
}

function metrics(r, mode) {
  const c = state.calc;
  const plots = c.plots ?? farmPlots();
  const cycles = 86400 / r.seconds;
  if (mode === "seed") return [fmtNum(r.amount, 3), fmtNum(r.profit)];
  if (mode === "cycle") return [fmtNum(r.amount * plots, 2), fmtNum(r.profit * plots)];
  const f = c.period === "week" ? 7 : 1;
  return [fmtNum(r.amount * plots * cycles * f, 1), fmtNum(r.perDay * plots * f)];
}

function sortKey(r, mode) { return mode === "day" ? r.perDay : r.profit; }

function detail(r) {
  const d = el("div", "detail");
  const block = (title, base, lines) => {
    d.append(el("div", "best-group", title));
    d.append(el("div", "note", base));
    lines.forEach((l) => d.append(el("div", "fx fx-info", `${l.name}: ${l.text}`)));
    if (!lines.length) d.append(el("div", "note", "Tidak ada boost aktif."));
  };
  block("Waktu tumbuh", `Dasar ${fmtSeconds(r.crop.seconds)}, hasil ${fmtSeconds(r.seconds)}`, r.timeLines);
  block("Hasil per panen (rata-rata)", "Dasar 1", r.yieldLines);
  d.append(el("div", "note", `Hasil ${fmtNum(r.amount, 4)} x harga jual ${fmtNum(r.crop.sellPrice, 4)} = ${fmtNum(r.revenue, 4)} coins; biaya seed ${fmtNum(r.crop.seedPrice, 4)}; profit ${fmtNum(r.profit, 4)} coins per panen per plot.`));
  return d;
}

function table(panel, render) {
  const c = state.calc;
  const ctx = buildContext();
  const rows = availableCrops({ allSeasons: c.allSeasons }).map((x) => calcCrop(x, ctx)).sort((a, b) => sortKey(b, c.mode) - sortKey(a, c.mode));
  if (!rows.length) return panel.append(el("p", "empty", "Tidak ada crop untuk musim ini."));

  const heads = {
    seed: ["Hasil", "Profit"],
    cycle: ["Hasil total", "Profit total"],
    day: [`Hasil/${c.period === "week" ? "minggu" : "hari"}`, `Profit/${c.period === "week" ? "minggu" : "hari"}`],
  }[c.mode];
  const tbl = el("table", "calc");
  const hr = el("tr");
  ["Crop", "Waktu", ...heads].forEach((h) => hr.append(el("th", "", h)));
  const thead = el("thead");
  thead.append(hr);
  tbl.append(thead);
  const body = el("tbody");
  rows.forEach((r, i) => {
    const tr = el("tr", c.open === r.crop.name ? "open" : "");
    tr.tabIndex = 0;
    const toggle = () => { c.open = c.open === r.crop.name ? null : r.crop.name; render(); };
    tr.onclick = toggle;
    tr.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };
    const [a, b] = metrics(r, c.mode);
    [`${i + 1}. ${r.crop.name}`, fmtSeconds(r.seconds), a, b].forEach((t) => tr.append(el("td", "", t)));
    body.append(tr);
    if (c.open === r.crop.name) {
      const dr = el("tr", "detail-row");
      const td = el("td"); td.colSpan = 4; td.append(detail(r)); dr.append(td);
      body.append(dr);
    }
  });
  tbl.append(body);
  const wrap = el("div", "table-wrap");
  wrap.append(tbl);
  panel.append(wrap);
  panel.append(el("p", "hint", "Ketuk baris untuk melihat rincian boost. Profit = nilai jual - biaya seed (coins, tanpa diskon seed)."));
  panel.append(el("p", "hint", "Belum dimodelkan: boost AOE berbasis posisi (Scary Mike, Laurie, Sir Goldensnout, dll.), Bee Swarm, dan guardian cuaca. Mode hari/minggu mengasumsikan tanam ulang tepat saat siap."));
}

export function renderCrops(panel, render) {
  panel.append(el("h2", "", "Kalkulator Crops"));
  controls(panel, render);
  info(panel);
  table(panel, render);
}
