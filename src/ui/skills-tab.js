import { state } from "../state.js";
import { el, initials } from "../utils/dom.js";
import { SKILLS } from "../data/skills/index.js";
import { CATEGORIES } from "../data/categories.js";
import { cost, spent, totalPoints, available, need, unlocked, validCat, islandOk } from "../core/rules.js";
import { setStatus } from "./status.js";

function toggle(s, render) {
  const { cat, selected } = state;
  state.active = s;
  if (state.locked) return render();

  if (selected.has(s.name)) {
    selected.delete(s.name);
    if (!validCat(cat)) {
      selected.add(s.name);
      setStatus(`${s.name} tidak bisa dilepas: skill tier atas masih bergantung padanya.`, true);
      return render();
    }
  } else {
    if (!islandOk(s)) {
      setStatus(`${s.name} butuh island ${s.island} atau lebih tinggi.`, true);
      return render();
    }
    if (!unlocked(cat, s.tier)) {
      setStatus(`Tier ${s.tier} butuh ${need(cat, s.tier)} poin dari tier di bawahnya (sekarang ${spent(cat, s.tier - 1)}).`, true);
      return render();
    }
    if (totalPoints() + cost(s) > available()) {
      setStatus(`Skill Points tidak cukup (butuh ${cost(s)}, sisa ${available() - totalPoints()}).`, true);
      return render();
    }
    selected.add(s.name);
  }
  setStatus("");
  render();
}

function renderHeader(panel, render) {
  const head = el("div", "head");
  head.append(el("h2", "", `Skill Points Used: ${totalPoints()}`));

  const actions = el("div", "actions");
  const lk = el("button", "lock");
  const label = state.locked ? "Buka kunci skill" : "Kunci skill (mode baca)";
  lk.setAttribute("aria-pressed", state.locked);
  lk.setAttribute("aria-label", label);
  lk.title = label;
  const img = el("img");
  img.src = state.locked ? "assets/icons/lock.png" : "assets/icons/unlock.png";
  img.alt = "";
  lk.append(img);
  lk.onclick = () => {
    state.locked = !state.locked;
    setStatus(state.locked ? "Terkunci: mengetuk skill hanya menampilkan deskripsi." : "");
    render();
  };

  const clear = el("button", "clear", "Clear Skills");
  clear.disabled = state.locked;
  clear.onclick = () => { state.selected.clear(); state.active = null; render(); };

  actions.append(lk, clear);
  head.append(actions);
  panel.append(head);
}

function renderChips(panel, render) {
  const chips = el("div", "chips");
  CATEGORIES.forEach((c) => {
    const b = el("button", "chip", c);
    b.setAttribute("aria-pressed", c === state.cat);
    b.onclick = () => { state.cat = c; state.active = null; render(); };
    chips.append(b);
  });
  panel.append(chips);
}

function renderLegacy(panel, list, render) {
  panel.append(el("p", "empty", "Skill pasif milik beberapa akun. Tidak bisa dibuka dengan skill point. Status dibaca dari farm."));
  const row = el("div", "tier");
  list.forEach((s) => {
    const b = el("button", "skill", initials(s.name));
    b.setAttribute("aria-pressed", state.legacyOwned.has(s.name));
    b.setAttribute("aria-label", s.name);
    b.onclick = () => { state.active = s; render(); };
    row.append(b);
  });
  panel.append(row);

  const a = state.active;
  const d = el("div", "detail");
  d.textContent = a && a.passive
    ? `${a.name} (${state.legacyOwned.has(a.name) ? "dimiliki" : "tidak dimiliki"}): ${a.effect}`
    : "Ketuk skill untuk melihat efeknya. Yang menyala berarti dimiliki farm.";
  panel.append(d);
}

function renderTiers(panel, list, render) {
  const { cat, selected } = state;
  [...new Set(list.map((s) => s.tier))].sort().forEach((t) => {
    if (t > 1) panel.append(el("h3", "", `Tier ${t} - butuh ${need(cat, t)} poin dari tier bawah (sekarang ${spent(cat, t - 1)})`));
    const row = el("div", "tier");
    list.filter((s) => s.tier === t).forEach((s) => {
      const b = el("button", "skill");
      b.setAttribute("aria-pressed", selected.has(s.name));
      b.setAttribute("aria-label", s.name);
      if (!selected.has(s.name) && (!unlocked(cat, s.tier) || !islandOk(s))) b.setAttribute("aria-disabled", "true");
      if (s.icon) { const i = el("img"); i.src = s.icon; i.alt = ""; b.append(i); }
      else b.textContent = initials(s.name);
      b.onclick = () => toggle(s, render);
      row.append(b);
    });
    panel.append(row);
  });

  const a = state.active;
  const d = el("div", "detail");
  d.textContent = a
    ? `${a.name} (Tier ${a.tier}, biaya ${cost(a)} poin, island ${a.island || "-"}): ${a.effect || "Efek belum diisi di src/data/skills/."}`
    : "Ketuk skill untuk memilih dan melihat efeknya.";
  panel.append(d);
}

export function renderSkills(panel, render) {
  renderHeader(panel, render);
  renderChips(panel, render);

  const list = SKILLS[state.cat] || [];
  panel.append(el("h2", "", `${state.cat}: ${spent(state.cat)} Points Used`));
  if (!list.length) {
    panel.append(el("p", "empty", "Belum ada skill di kategori ini. Tambahkan di src/data/skills/."));
    return;
  }
  if (list.every((s) => s.passive)) return renderLegacy(panel, list, render);
  renderTiers(panel, list, render);
}
