// Pengaturan farm: disimpan di localStorage, sebagian diisi otomatis dari data farm.
import { state } from "../state.js";
import { loadJson, saveJson } from "../utils/storage.js";
import { ISLANDS, SEASONS, EVENTS, DEFAULT_SETTINGS } from "../data/settings.js";

const KEY = "settings";
const DAY = 86400000;

export function loadSettings() {
  state.settings = { ...DEFAULT_SETTINGS, ...(loadJson(KEY) || {}) };
  state.island = state.settings.island || null;
}

export function updateSettings(patch) {
  state.settings = { ...state.settings, ...patch };
  state.island = state.settings.island || null; // dipakai aturan syarat island skill
  saveJson(KEY, state.settings);
}

const utcDate = (t) => new Date(t).toISOString().slice(0, 10);

// Event aktif hari ini (UTC, sama dengan game): dari kalender harian, lalu dari event yang baru dimulai.
export function todayEvent(calendar, now = Date.now()) {
  const day = (calendar?.dates || []).find((d) => d.date === utcDate(now) && EVENTS[d.name]);
  if (day) return day.name;
  const live = Object.keys(EVENTS).find((k) => calendar?.[k]?.startedAt <= now && now < calendar[k].startedAt + DAY);
  return live || "";
}

// Isi island, musim, VIP, dan event dari farm. Gem/FLOWER tidak diubah.
export function applyFarmSettings(farm, now = Date.now()) {
  updateSettings({
    island: ISLANDS[farm.island?.type] ? farm.island.type : state.settings.island,
    season: SEASONS[farm.season?.season] ? farm.season.season : state.settings.season,
    vip: Number(farm.vip?.expiresAt ?? 0) > now,
    event: todayEvent(farm.calendar, now),
  });
}
