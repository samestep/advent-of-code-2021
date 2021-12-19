import { getInput, bestPath } from "./shared.ts";

const grid = getInput();
const height = grid.length;
const width = grid[0].length;

const tiled: number[][] = [];
for (let r = 0; r < 5 * height; ++r) {
  const row: number[] = [];
  for (let c = 0; c < 5 * width; ++c) {
    row.push(
      ((grid[r % height][c % width] -
        1 +
        Math.floor(r / width) +
        Math.floor(c / width)) %
        9) +
        1
    );
  }
  tiled.push(row);
}

console.log(bestPath(tiled));
