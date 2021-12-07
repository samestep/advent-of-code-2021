import { getInput } from "./shared.ts";

const score = (positions: number[], guess: number): number => {
  let penalty = 0;
  for (const pos of positions) {
    const n = Math.abs(guess - pos);
    penalty += (n * (n + 1)) / 2;
  }
  return penalty;
};

const positions = getInput();
const start = Math.floor(positions.reduce((a, b) => a + b) / positions.length);
let i = start;
// 2 seems like a reasonable radius for searching around
for (let j = start - 2; j <= start + 2; ++j) {
  if (score(positions, j) < score(positions, i)) {
    i = j;
  }
}
console.log(score(positions, i));
