import { state } from "../state.js";
import { $ } from "../utils/dom.js";
import { available, totalPoints, shardsUsed } from "../core/rules.js";

const fmt = (n) => Math.round(n).toLocaleString("id-ID");

export function renderStats() {
  const left = available() - totalPoints();
  $("pts").className = "stat" + (left < 0 ? " bad" : "");
  $("pts").textContent = `Skill Points: ${totalPoints()} / ${available()} (sisa ${left})`;

  const used = shardsUsed();
  const over = state.shards !== null && used > state.shards;
  $("shard").className = "stat" + (over ? " bad" : "");
  $("shard").textContent = state.shards === null
    ? `Ascension Shard terpakai: ${used}`
    : `Ascension Shard: ${used} / ${state.shards} (sisa ${state.shards - used})`;

  const a = state.asc;
  $("asc").hidden = !a;
  if (a) {
    $("asc").textContent = `Ascension ${a.ascension} Level ${a.level}`
      + (a.ready ? " - siap Ascend" : ` - ${fmt(a.progress)} / ${fmt(a.toNext)} XP`);
  }
}
