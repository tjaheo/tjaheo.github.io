import { $ } from "../utils/dom.js";

export function setStatus(msg, err = false) {
  $("status").textContent = msg;
  $("status").className = err ? "err" : "";
}
