import { getInput, makeGrid, countOverlaps } from "./shared.ts";

const input = getInput();
const grid = makeGrid(input);

for (const { x1, y1, x2, y2 } of input) {
  if (x1 === x2 || y1 === y2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); ++y) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); ++x) {
        ++grid[y][x];
      }
    }
  }
}

console.log(countOverlaps(grid));
