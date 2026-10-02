// Gabungan daftar buff sementara: buff non-item (Power hour) + item sementara/pupuk.
import { BUFFS } from "../data/buffs.js";
import { TEMPORARY_ITEMS } from "../data/temporary.js";

export const TEMP_ITEMS = [
  ...BUFFS.map((b) => ({ ...b, group: "Buff", buff: true })),
  ...TEMPORARY_ITEMS,
];
