import { Grid, getInput, step } from "./shared.ts";

const allFlash = (grid: Grid): boolean =>
  grid.every((row) => row.every((octopus) => octopus === 0));

let grid = getInput();

let i = 0;
while (!allFlash(grid)) {
  grid = step(grid);
  ++i;
}

console.log(i);
