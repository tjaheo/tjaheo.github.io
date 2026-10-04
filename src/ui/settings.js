// Panel "Pengaturan Farm" di sidebar. Dipakai kalkulator (island, musim, VIP, event, harga).
import { state } from "../state.js";
import { $, el } from "../utils/dom.js";
import { ISLANDS, SEASONS, EVENTS, GEM_PACKS } from "../data/settings.js";
import { updateSettings } from "../core/settings.js";

function choice(label, id, map, none) {
  const wrap = el("label", "field");
  wrap.append(el("span", "", label));
  const s = el("select");
  s.id = id;
  [["", none], ...Object.entries(map)].forEach(([k, v]) => { const o = el("option", "", v); o.value = k; s.append(o); });
  wrap.append(s);
  return wrap;
}

function number(label, id, hint) {
  const wrap = el("label", "field");
  wrap.append(el("span", "", label));
  const i = el("input");
  i.id = id; i.type = "number"; i.min = "0"; i.step = "any"; i.placeholder = hint; i.inputMode = "decimal";
  wrap.append(i);
  return wrap;
}

export function initSettings(render) {
  const box = $("settings");
  box.append(
    el("h3", "", "Pengaturan Farm"),
    choice("Island", "setIsland", ISLANDS, "- belum dipilih -"),
    choice("Musim", "setSeason", SEASONS, "- belum dipilih -"),
    choice("VIP", "setVip", { yes: "Ya" }, "Tidak"),
    choice("Event hari ini", "setEvent", EVENTS, "Tidak ada"),
    choice("Paket Gems", "setGem", Object.fromEntries(GEM_PACKS.map((p) => [p.gems, `${p.gems.toLocaleString("id-ID")} Gems - $${p.usd}`])), "- biaya restock tidak dihitung -"),
    number("Harga 1 FLOWER (USD)", "setFlowerUsd", "contoh 0.01"),
    number("Nilai 1 FLOWER (coins)", "setFlower", "contoh 200"),
    el("p", "hint", "Island, musim, VIP, dan event terisi otomatis saat Search; bisa diubah manual."),
  );
  const on = (id, key, read) => { $(id).onchange = () => { updateSettings({ [key]: read($(id).value) }); render(); }; };
  on("setIsland", "island", (v) => v);
  on("setSeason", "season", (v) => v);
  on("setVip", "vip", (v) => v === "yes");
  on("setEvent", "event", (v) => v);
  on("setGem", "gemPack", (v) => v);
  on("setFlowerUsd", "flowerUsd", (v) => v);
  on("setFlower", "flowerCoins", (v) => v);
  syncSettingsForm();
}

// Tampilkan nilai state.settings di form (dipanggil saat awal dan setelah Search).
export function syncSettingsForm() {
  const s = state.settings;
  $("setIsland").value = s.island;
  $("setSeason").value = s.season;
  $("setVip").value = s.vip ? "yes" : "";
  $("setEvent").value = s.event;
  $("setGem").value = s.gemPack;
  $("setFlowerUsd").value = s.flowerUsd;
  $("setFlower").value = s.flowerCoins;
}
