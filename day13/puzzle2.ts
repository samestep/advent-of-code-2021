import { getInput, fold } from "./shared.ts";

const { points, folds } = getInput();

const code = folds.reduce(fold, points);

let maxX = 0;
let maxY = 0;
for (const [x, y] of code.keys()) {
  maxX = Math.max(x, maxX);
  maxY = Math.max(y, maxY);
}

for (let y = 0; y <= maxY; ++y) {
  const line = [];
  for (let x = 0; x <= maxX; ++x) {
    line.push(code.has([x, y]) ? "#" : ".");
  }
  console.log(line.join(""));
}
