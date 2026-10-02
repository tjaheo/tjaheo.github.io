// Header bersama untuk tab yang bisa dipilih: judul, gembok (mode baca), dan tombol Clear.
// Dipakai tab Skills, Collectibles, Wearables, dan Temporary Buffs. State gembok: state.locked.
import { state } from "../state.js";
import { el } from "../utils/dom.js";
import { setStatus } from "./status.js";

export function renderLockHeader(panel, render, { title, clearLabel = "Clear", onClear }) {
  const head = el("div", "head");
  head.append(el("h2", "", title));

  const actions = el("div", "actions");
  const lk = el("button", "lock");
  const label = state.locked ? "Buka kunci (bisa memilih)" : "Kunci (mode baca: hanya lihat efek)";
  lk.setAttribute("aria-pressed", state.locked);
  lk.setAttribute("aria-label", label);
  lk.title = label;
  const img = el("img");
  img.src = state.locked ? "assets/icons/lock.png" : "assets/icons/unlock.png";
  img.alt = "";
  lk.append(img);
  lk.onclick = () => {
    state.locked = !state.locked;
    setStatus(state.locked ? "Terkunci: mengetuk hanya menampilkan deskripsi." : "");
    render();
  };

  const clear = el("button", "clear", clearLabel);
  clear.disabled = state.locked;
  clear.onclick = () => { onClear(); render(); };

  actions.append(lk, clear);
  head.append(actions);
  panel.append(head);
}
