import { getInput, makeGrid, countOverlaps } from "./shared.ts";

const input = getInput();
const grid = makeGrid(input);

for (const line of input) {
  const { x1, y1, x2, y2 } = line;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  if (x1 === x2 || y1 === y2) {
    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        ++grid[y][x];
      }
    }
  } else if (x2 - x1 === y2 - y1) {
    for (let y = minY; y <= maxY; ++y) {
      ++grid[y][minX + (y - minY)];
    }
  } else if (x2 - x1 === y1 - y2) {
    for (let y = minY; y <= maxY; ++y) {
      ++grid[y][maxX - (y - minY)];
    }
  } else {
    throw new Error(`invalid line: ${line}`);
  }
}

console.log(countOverlaps(grid));
