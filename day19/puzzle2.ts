import { getInput, orientAll } from "./shared.ts";

const scanners = getInput();
const oriented = orientAll(scanners);

let farthest = 0;
for (const {
  translation: [x1, y1, z1],
} of oriented.values()) {
  for (const {
    translation: [x2, y2, z2],
  } of oriented.values()) {
    const d = Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1);
    if (d > farthest) {
      farthest = d;
    }
  }
}
console.log(farthest);
