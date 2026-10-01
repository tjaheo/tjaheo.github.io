// Sidebar kiri: buka/tutup lewat tombol, backdrop, atau tombol Esc.
// Pilihan terakhir disimpan; kunjungan pertama: terbuka di layar lebar, tertutup di HP.
import { $ } from "../utils/dom.js";
import { load, save } from "../utils/storage.js";

const KEY = "sidebar";
const wide = () => !!globalThis.matchMedia?.("(min-width: 900px)").matches;

function setOpen(open, remember = true) {
  document.body.classList.toggle("sidebar-open", open);
  $("sidebarToggle").setAttribute("aria-expanded", String(open));
  if (remember) save(KEY, open ? "1" : "0");
}

const isOpen = () => document.body.classList.contains("sidebar-open");

// Dipanggil setelah Search agar hasil langsung terlihat di HP.
export function closeSidebarOnMobile() {
  if (!wide()) setOpen(false, false);
}

export function initSidebar() {
  const saved = load(KEY);
  setOpen(saved === null ? wide() : saved === "1", false);

  $("sidebarToggle").onclick = () => setOpen(!isOpen());
  $("sidebarClose").onclick = () => setOpen(false);
  $("backdrop").onclick = () => setOpen(false);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen() && !wide()) setOpen(false);
  });
}
