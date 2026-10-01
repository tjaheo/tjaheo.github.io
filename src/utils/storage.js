// Pembungkus localStorage yang aman (tidak error di mode privat / storage penuh).
export function load(key, fallback = null) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
export function save(key, value) {
  try { localStorage.setItem(key, value); } catch { /* abaikan */ }
}
export function loadJson(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
export function saveJson(key, value) { save(key, JSON.stringify(value)); }
