import { getInput, lowPoints } from "./shared.ts";

const heightmap = getInput();
console.log(
  lowPoints(heightmap)
    .map(([i, j]) => heightmap[i][j] + 1)
    .reduce((a, b) => a + b)
);
