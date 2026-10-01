// Gabungan semua skill tree. Urutan key di sini tidak mempengaruhi urutan tampilan
// (lihat categories.js). Untuk menambah kategori baru: buat file baru, import di sini.
import crops from "./crops.js";
import fruitPatch from "./fruit-patch.js";
import greenhouse from "./greenhouse.js";
import trees from "./trees.js";
import mining from "./mining.js";
import animals from "./animals.js";
import machinery from "./machinery.js";
import fishing from "./fishing.js";
import cooking from "./cooking.js";
import compost from "./compost.js";
import beesAndFlowers from "./bees-and-flowers.js";
import aging from "./aging.js";
import legacy from "./legacy.js";

export const SKILLS = {
  "Crops": crops,
  "Fruit Patch": fruitPatch,
  "Greenhouse": greenhouse,
  "Trees": trees,
  "Mining": mining,
  "Animals": animals,
  "Machinery": machinery,
  "Fishing": fishing,
  "Cooking": cooking,
  "Compost": compost,
  "Bees & Flowers": beesAndFlowers,
  "Aging": aging,
  "Legacy": legacy,
};
