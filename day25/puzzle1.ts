import { getLines } from "../shared.ts";

const step = (region: string[][]): string[][] | null => {
  const h = region.length;
  const w = region[0].length;
  let changed = false;

  const middle = region.map((row) => [...row]);
  for (let r = 0; r < h; ++r) {
    for (let c = 0; c < w; ++c) {
      const c1 = (c + 1) % w;
      if (region[r][c] === ">" && region[r][c1] === ".") {
        changed = true;
        middle[r][c] = ".";
        middle[r][c1] = ">";
      }
    }
  }

  const after = middle.map((row) => [...row]);
  for (let r = 0; r < h; ++r) {
    for (let c = 0; c < w; ++c) {
      const r1 = (r + 1) % h;
      if (middle[r][c] === "v" && middle[r1][c] === ".") {
        changed = true;
        after[r][c] = ".";
        after[r1][c] = "v";
      }
    }
  }

  return changed ? after : null;
};

let region = getLines().map((row) => row.split(""));
let i = 0;
while (true) {
  const after = step(region);
  ++i;
  if (after === null) {
    break;
  }
  region = after;
}
console.log(i);
