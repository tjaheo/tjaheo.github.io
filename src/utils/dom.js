export const $ = (id) => document.getElementById(id);

export function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

export const initials = (name) =>
  name.split(/[\s'-]+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
