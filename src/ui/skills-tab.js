import { state } from "../state.js";
import { el, initials } from "../utils/dom.js";
import { SKILLS } from "../data/skills/index.js";
import { CATEGORIES } from "../data/categories.js";
import { MAX_RANK } from "../data/tiers.js";
import { rankLines } from "../core/rank-text.js";
import {
  cost, spent, usedPoints, totalPoints, available, need, unlocked, validCat, islandOk,
  rankOf, rankUpProblem, upgradeCost,
} from "../core/rules.js";
import { setStatus } from "./status.js";
import { renderLockHeader } from "./header.js";

function toggle(s, render) {
  const { cat, selected } = state;
  state.active = s;
  if (state.locked) return render();

  if (selected.has(s.name)) {
    const prevRank = state.ranks[s.name];
    selected.delete(s.name);
    delete state.ranks[s.name];
    if (!validCat(cat)) {
      selected.add(s.name);
      if (prevRank) state.ranks[s.name] = prevRank;
      setStatus(`${s.name} tidak bisa dilepas: skill tier atas masih bergantung padanya.`, true);
      return render();
    }
  } else {
    if (s.disabled) {
      setStatus(`${s.name} sedang dinonaktifkan di game.`, true);
      return render();
    }
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
    if (s.upgrade) state.ranks[s.name] = 1;
  }
  setStatus("");
  render();
}

function renderHeader(panel, render) {
  renderLockHeader(panel, render, {
    title: `Skill Points Used: ${totalPoints()}`,
    clearLabel: "Clear Skills",
    onClear: () => { state.selected.clear(); state.ranks = {}; state.active = null; },
  });
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

function renderDetail(panel, s, render) {
  const d = el("div", "detail");
  if (!s) {
    d.textContent = "Ketuk skill untuk memilih dan melihat efeknya.";
    return panel.append(d);
  }
  d.append(el("div", "", `${s.name} (Tier ${s.tier}, biaya ${cost(s)} poin, island ${s.island || "-"}): ${s.effect || "Efek belum diisi di src/data/skills/."}${s.disabled ? " [nonaktif di game]" : ""}`));

  if (s.upgrade) {
    const cur = rankOf(s);
    const up = upgradeCost(s.tier);
    d.append(el("div", "rank-note", `Upgrade rank (maks ${MAX_RANK}): ${up.points} poin + ${up.shards} Ascension Shard per rank.`));
    const ul = el("ul", "ranks");
    rankLines(s.upgrade).forEach((t, i) => ul.append(el("li", i + 1 === cur ? "on" : "", `Rank ${i + 1}: ${t}`)));
    d.append(ul);

    if (!state.locked && cur >= 1) {
      const row = el("div", "actions");
      const minus = el("button", "step", "Rank -");
      minus.disabled = cur <= 1;
      minus.onclick = () => { state.ranks[s.name] = cur - 1; setStatus(""); render(); };
      const plus = el("button", "step", cur >= MAX_RANK ? "Rank maks" : "Rank +");
      plus.disabled = cur >= MAX_RANK;
      plus.onclick = () => {
        const problem = rankUpProblem(state.cat, s);
        if (problem) { setStatus(problem, true); return render(); }
        state.ranks[s.name] = cur + 1; setStatus(""); render();
      };
      row.append(minus, plus);
      d.append(row);
    }
  }
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
      if (s.upgrade && rankOf(s) > 1) b.append(el("span", "rank", String(rankOf(s))));
      b.onclick = () => toggle(s, render);
      row.append(b);
    });
    panel.append(row);
  });

  renderDetail(panel, state.active, render);
}

export function renderSkills(panel, render) {
  renderHeader(panel, render);
  renderChips(panel, render);

  const list = SKILLS[state.cat] || [];
  panel.append(el("h2", "", `${state.cat}: ${usedPoints(state.cat)} Points Used`));
  if (!list.length) {
    panel.append(el("p", "empty", "Belum ada skill di kategori ini. Tambahkan di src/data/skills/."));
    return;
  }
  if (list.every((s) => s.passive)) return renderLegacy(panel, list, render);
  renderTiers(panel, list, render);
}
