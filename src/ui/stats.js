import { state } from "../state.js";
import { $ } from "../utils/dom.js";
import { available, totalPoints } from "../core/rules.js";

export function renderStats() {
  const left = available() - totalPoints();
  $("pts").className = "stat" + (left < 0 ? " bad" : "");
  $("pts").textContent = `Skill Points: ${totalPoints()} / ${available()} (sisa ${left})`;
  $("shard").textContent = `Ascension Shard: ${state.shards ?? "-"}`;
}
