import { getInput, step } from "./shared.ts";

let grid = getInput();

let flashes = 0;
for (let i = 0; i < 100; ++i) {
  grid = step(grid);
  for (const row of grid) {
    for (const octopus of row) {
      if (octopus < 1) {
        ++flashes;
      }
    }
  }
}

console.log(flashes);
