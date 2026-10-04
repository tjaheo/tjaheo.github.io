// Kalkulator Crops: kontrol, kartu ringkasan, dan tabel per crop (tata letak sflhub).
import { state } from "../state.js";
import { el } from "../utils/dom.js";
import { fmtHms, fmtClock, fmtNum, fmtDec, fmtSeconds } from "../utils/format.js";
import { SEASONS } from "../data/settings.js";
import { FERTILISERS, buildContext, calcCrop, availableCrops } from "../core/crop-calc.js";
import { planRow, summarize, restockCoins, toFlower, RESTOCK_GEMS } from "../core/crop-plan.js";
import { saveCalc } from "../core/calc-store.js";
import { setStatus } from "./status.js";

const MODES = [["seed", "Per Seed"], ["cycle", "Per Cycle"], ["stock", "Per Stock"]];
const RESTOCKS = [["deduct", "Deduct cost"], ["keep", "Do not deduct"]];
const INPUT_LABEL = { seed: "Enter Seeds", cycle: "Enter Cycles", stock: "Enter Stocks" };

const farmPlots = () => Object.keys(state.farm?.crops || {}).length || 1;
const farmHasWarehouse = () => !!state.farm?.buildings?.Warehouse?.some((b) => b.readyAt <= Date.now());

const field = (label, control) => { const w = el("label", "field"); w.append(el("span", "", label), control); return w; };
function select(options, value, onChange) {
  const s = el("select");
  options.forEach(([k, v]) => { const o = el("option", "", v); o.value = k; o.selected = k === value; s.append(o); });
  s.onchange = () => onChange(s.value);
  return s;
}
function number(value, onChange, { min = "0", placeholder = "" } = {}) {
  const i = el("input");
  i.type = "number"; i.min = min; i.step = "any"; i.inputMode = "decimal"; i.placeholder = placeholder;
  i.value = value ?? "";
  i.onchange = () => onChange(i.value);
  return i;
}
const commit = (render) => { saveCalc(); render(); };

// Angka coins dan padanan FLOWER (bila nilai FLOWER diisi di sidebar).
const coinsTxt = (n) => `${fmtDec(n, 2, 4)} coins`;
const flowerTxt = (coins) => { const f = toFlower(coins, state.settings); return f == null ? "- FLOWER" : `${fmtDec(f, 6)} FLOWER`; };
const lines = (...t) => { const d = el("div"); t.forEach((x) => d.append(el("div", "", x))); return d; };

function controls(box, render) {
  const c = state.calc;
  const bar = el("div", "bud-form");
  bar.append(
    field("Calculation Mode", select(MODES, c.mode, (v) => { c.mode = v; commit(render); })),
    field("Restock", select(RESTOCKS, c.restock, (v) => { c.restock = v; commit(render); })),
    field("Number of Crop Plots", number(c.plots ?? farmPlots(), (v) => { c.plots = Math.max(1, Math.floor(Number(v)) || 1); commit(render); }, { min: "1" })),
  );
  const save = el("button", "go", "Save");
  save.onclick = () => { saveCalc(); setStatus("Pengaturan kalkulator tersimpan."); };
  const clear = el("button", "go", "Clear Crops");
  clear.onclick = () => { c.seeds = {}; c.p2p = {}; commit(render); };
  bar.append(save, clear);
  box.append(bar);

  const extra = el("div", "bud-form");
  extra.append(field("Pupuk", select([["", "Tanpa pupuk"], ...FERTILISERS.map((f) => [f, f])], c.fert, (v) => { c.fert = v; commit(render); })));
  const wh = el("label", "check");
  const whBox = el("input");
  whBox.type = "checkbox"; whBox.checked = c.warehouse ?? farmHasWarehouse();
  whBox.onchange = () => { c.warehouse = whBox.checked; commit(render); };
  wh.append(whBox, el("span", "", "Punya Warehouse (+20% stok seed)"));
  const all = el("label", "check");
  const allBox = el("input");
  allBox.type = "checkbox"; allBox.checked = c.allSeasons;
  allBox.onchange = () => { c.allSeasons = allBox.checked; commit(render); };
  all.append(allBox, el("span", "", "Crop semua musim"));
  extra.append(wh, all);
  box.append(extra);
}

function info(box, rc) {
  const c = state.calc, s = state.settings;
  const n = (k) => state.picked?.[k]?.size ?? 0;
  const msgs = [
    `Boost aktif: ${state.selected.size} skill, ${n("Collectibles")} collectible, ${n("Wearables")} wearable, ${n("Temporary Buffs")} buff sementara, ${state.buds.filter((b) => b.placed).length} bud. Pilih boost di halaman Combo Maker.`,
    s.season ? `Musim: ${SEASONS[s.season]}${s.event ? `, event: ${s.event}` : ""}.` : "Musim belum dipilih (atur di sidebar untuk memfilter crop dan boost musiman).",
  ];
  if (c.restock === "deduct" && rc == null) msgs.push("Biaya restock belum dihitung: pilih Paket Gems, isi harga FLOWER (USD) dan nilai FLOWER (coins) di sidebar.");
  if (toFlower(1, s) == null) msgs.push("Isi nilai 1 FLOWER (coins) di sidebar untuk menampilkan padanan FLOWER.");
  msgs.forEach((t) => box.append(el("p", "hint", t)));
}

function help(box, render) {
  const c = state.calc;
  const b = el("button", "help-btn", "? How does this table work?");
  b.setAttribute("aria-expanded", String(c.help));
  b.onclick = () => { c.help = !c.help; render(); };
  box.append(b);
  if (!c.help) return;
  const d = el("div", "detail");
  [
    "Isi kolom Enter (jumlah seed, siklus, atau stok sesuai Calculation Mode) untuk tiap crop. Hasil dijumlahkan di kartu ringkasan.",
    "Per Seed: angka = jumlah seed. Per Cycle: angka = jumlah siklus (tiap siklus menanam semua plot). Per Stock: angka = jumlah stok toko (stok x1,2 jika punya Warehouse).",
    "Waktu: siklus = seed / jumlah plot (dibulatkan ke atas); waktu baris = siklus x waktu tumbuh setelah boost. Total Time = jumlah waktu semua baris (crop ditanam berurutan).",
    `Restock: stok seed yang dipakai / stok per restock (rata-rata, bisa pecahan). 1 restock = ${RESTOCK_GEMS} Gems. Biaya = ${RESTOCK_GEMS} Gems x harga Gem (paket) / harga FLOWER (USD) x nilai FLOWER (coins). "Deduct cost" mengurangkannya dari profit.`,
    "Betty: crop dijual ke Betty dengan harga coins (tanpa bonus harga jual). P2P: isi harga pasar P2P (FLOWER) per crop; nilai bersih = harga x (1 - fee). Best Selling Option membandingkan profit Betty (coins / nilai FLOWER) dengan profit P2P.",
    "24h/Weekly: profit total x (24 jam / Total Time); mingguan = x7. Hasil hasil panen memakai nilai harapan (rata-rata) untuk boost berpeluang. Ketuk nama crop untuk rincian boost.",
  ].forEach((t) => d.append(el("p", "", t)));
  box.append(d);
}

function cards(box, sum, rcAvailable) {
  const pair = (coins) => [flowerTxt(coins), coinsTxt(coins)];
  const items = [
    ["Total Time", [fmtClock(sum.time)]],
    "-",
    ["Average Cost of Restocks", pair(sum.restockCost)],
    ["Average Restock", [`${fmtDec(sum.restocks)} restocks`, `${fmtDec(sum.gems)} gems`]],
    ["Combo Profit", pair(sum.profit)],
    "-",
    ["Average Restock in 24h", [`${fmtDec(sum.restocks24)} restocks`, `${fmtDec(sum.gems24)} gems`]],
    ["Restock Cost (24h)", pair(sum.restockCost24)],
    ["Average Profit in 24h", pair(sum.profit24)],
    "-",
    ["Weekly Average Profit", pair(sum.weekly)],
  ];
  const row = el("div", "cards");
  items.forEach((it) => {
    if (it === "-") return row.append(el("span", "card-sep", "-"));
    const card = el("div", "card");
    card.append(el("div", "card-title", it[0]), lines(...it[1]));
    row.append(card);
  });
  box.append(row);
}

function detail(r) {
  const d = el("div", "detail");
  const block = (title, base, ls) => {
    d.append(el("div", "best-group", title), el("div", "note", base));
    ls.forEach((l) => d.append(el("div", "fx fx-info", `${l.name}: ${l.text}`)));
    if (!ls.length) d.append(el("div", "note", "Tidak ada boost aktif."));
  };
  block("Waktu tumbuh", `Dasar ${fmtSeconds(r.crop.seconds)}, hasil ${fmtSeconds(r.seconds)}`, r.timeLines);
  block("Hasil per panen (rata-rata)", "Dasar 1", r.yieldLines);
  return d;
}

function table(box, rows, render) {
  const c = state.calc;
  const head = (label, extra) => { const th = el("th"); th.append(el("div", "", label)); if (extra) th.append(extra); return th; };
  const save = el("button", "go small", "Save");
  save.onclick = () => { saveCalc(); setStatus("Jumlah seed tersimpan."); };
  const fee = el("label", "fee");
  fee.append(el("span", "", "Withdrawal Fee: "), number(c.fee, (v) => { c.fee = Math.min(100, Math.max(0, Number(v) || 0)); commit(render); }, { placeholder: "0" }), el("span", "", "%"));

  const tbl = el("table", "ctable");
  const hr = el("tr");
  [head("Crops", el("div", "sub", "Stock")), head("Seed Cost"), head("Average per Plot", el("div", "sub", "Crop Time")),
    head(INPUT_LABEL[c.mode], save), head("Seeds Used", el("div", "sub", "Total Crops")), head("Total Time"),
    head("Crop Selling Price", el("div", "sub", "at Betty")), head("P2P Market Value", fee), head("Best Selling Option"),
    head("Total Profit", el("div", "sub", "at Betty")), head("Total Profit", el("div", "sub", "P2P Market")), head("Hourly Profit", el("div", "sub", "Betty vs Market"))]
    .forEach((th) => hr.append(th));
  const thead = el("thead"); thead.append(hr); tbl.append(thead);

  const body = el("tbody");
  rows.forEach(({ r, p }) => {
    const name = r.crop.name;
    const tr = el("tr");
    const first = el("td", "first");
    const link = el("button", "link", name);
    link.onclick = () => { c.open = c.open === name ? null : name; render(); };
    first.append(link, el("div", "sub", `Stock ${fmtNum(p.stock, 0)}`));
    tr.append(first);

    const td = (...ch) => { const t = el("td"); ch.forEach((x) => t.append(x)); tr.append(t); return t; };
    td(lines(coinsTxt(r.crop.seedPrice), flowerTxt(r.crop.seedPrice)));
    td(lines(`${fmtDec(r.amount, 2, 4)} crops`, fmtHms(r.seconds)));
    td(number(c.seeds[name], (v) => { c.seeds[name] = v; commit(render); }));
    td(lines(`${fmtDec(p.seeds)} seeds`, `${fmtDec(p.crops)} crops`));
    td(lines(fmtHms(p.seconds)));
    td(lines(coinsTxt(r.crop.sellPrice), flowerTxt(r.crop.sellPrice)));
    const p2p = el("div");
    p2p.append(number(c.p2p[name], (v) => { c.p2p[name] = v; commit(render); }, { placeholder: "FLOWER" }),
      el("div", "sub", p.p2pNet == null ? "- FLOWER" : `${fmtDec(p.p2pNet, 6)} FLOWER`));
    td(p2p);
    td(lines(p.best === "p2p" ? "P2P Market" : "Coins"));
    td(lines(coinsTxt(p.profit), flowerTxt(p.profit)));
    td(lines(p.p2pProfit == null ? "-" : `${fmtDec(p.p2pProfit, 6)} FLOWER`));
    const hourlyB = toFlower(p.hourly, state.settings);
    td(lines(`B -> ${hourlyB == null ? coinsTxt(p.hourly) : fmtDec(hourlyB, 6)}`, `M -> ${p.p2pHourly == null ? "-" : fmtDec(p.p2pHourly, 6)}`));
    body.append(tr);
    if (c.open === name) {
      const dr = el("tr", "detail-row");
      const cell = el("td"); cell.colSpan = 12; cell.append(detail(r)); dr.append(cell);
      body.append(dr);
    }
  });
  tbl.append(body);

  const wrap = el("div", "table-wrap");
  wrap.append(tbl);
  wrap.onscroll = () => { c.scroll = wrap.scrollLeft; };
  box.append(wrap);
  wrap.scrollLeft = c.scroll || 0;
}

export function renderCropsCalc(box, render) {
  const c = state.calc, s = state.settings;
  controls(box, render);
  const rc = restockCoins(s);
  info(box, rc);
  help(box, render);

  const plots = c.plots ?? farmPlots(), warehouse = c.warehouse ?? farmHasWarehouse();
  const ctx = buildContext();
  const list = availableCrops({ allSeasons: c.allSeasons }).slice().sort((a, b) => a.seconds - b.seconds);
  const rows = list.map((crop) => {
    const r = calcCrop(crop, ctx);
    const p = planRow(r, { mode: c.mode, input: c.seeds[crop.name], plots, warehouse, deduct: c.restock === "deduct",
      restockCoins: rc, flowerCoins: s.flowerCoins, p2p: Number(c.p2p[crop.name]), fee: c.fee });
    return { r, p };
  });
  if (!rows.length) return box.append(el("p", "empty", "Tidak ada crop untuk musim ini."));
  const dash = el("div", "dash");
  cards(dash, summarize(rows.map((x) => x.p), s), rc != null);
  box.append(dash);
  table(box, rows, render);
}
