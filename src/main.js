import { state } from "./state.js";
import { $ } from "./utils/dom.js";
import { load, save } from "./utils/storage.js";
import { SKILLS } from "./data/skills/index.js";
import { totalLevel, ascensionInfo } from "./core/level.js";
import { applyRanks } from "./core/rules.js";
import { syncPicks } from "./core/ownership.js";
import { readCache, fetchFarm } from "./services/farm-api.js";
import { setStatus } from "./ui/status.js";
import { render } from "./ui/render.js";
import { initSidebar, closeSidebarOnMobile } from "./ui/sidebar.js";

function setLevel(value) {
  state.level = Math.max(0, parseInt(value, 10) || 0);
  $("level").value = value;
  save("level", String(value));
}

function applyFarm(farm) {
  const owned = Object.keys(farm.bumpkin?.skills || {});
  const known = new Set(Object.values(SKILLS).flat().map((s) => s.name));
  state.selected.clear();
  owned.filter((n) => known.has(n)).forEach((n) => state.selected.add(n));
  state.locked = true; // setelah sinkron, kunci agar tidak sengaja berubah saat membaca
  state.farm = farm;
  syncPicks();
  state.island = farm.island?.type ?? null;
  // Shard yang sudah dipakai untuk rank ikut dihitung (sama seperti refund saat reset skill di game).
  const spentShards = applyRanks(farm.bumpkin?.skills);
  state.shards = Number(farm.inventory?.["Ascension Shard"] ?? 0) + spentShards;
  state.legacyOwned.clear();
  (SKILLS.Legacy || [])
    .filter((s) => Number(farm.inventory?.[s.name] ?? 0) > 0)
    .forEach((s) => state.legacyOwned.add(s.name));
  const xp = Number(farm.bumpkin?.experience ?? 0);
  const asc = Number(farm.island?.ascensionLevel ?? 0);
  state.asc = ascensionInfo(xp, asc);
  setLevel(totalLevel(xp, asc));
  render();
}

async function search() {
  const id = $("farmId").value.trim();
  if (!/^\d+$/.test(id)) return setStatus("Farm ID harus berupa angka.", true);

  const cached = readCache(id);
  if (cached) {
    applyFarm(cached);
    closeSidebarOnMobile();
    return setStatus("Skill tersinkron (data tersimpan). Terkunci, ketuk gembok untuk mengubah.");
  }

  $("search").disabled = true;
  setStatus("Memuat farm...");
  try {
    applyFarm(await fetchFarm(id));
    closeSidebarOnMobile();
    setStatus("Skill tersinkron dari farm. Terkunci, ketuk gembok untuk mengubah.");
  } catch (e) {
    setStatus(e.message, true);
  } finally {
    $("search").disabled = false;
  }
}

$("search").onclick = search;
$("farmId").onkeydown = (e) => { if (e.key === "Enter") search(); };
$("farmId").value = load("farmId", "");
$("level").placeholder = "auto";
$("level").value = load("level", "");
state.level = parseInt($("level").value, 10) || 0;
$("level").oninput = () => {
  state.level = Math.max(0, parseInt($("level").value, 10) || 0);
  save("level", $("level").value);
  render();
};
initSidebar();
render();
