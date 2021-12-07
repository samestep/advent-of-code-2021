import { getInput } from "./shared.ts";

const score = (positions: number[], guess: number): number => {
  let penalty = 0;
  for (const pos of positions) {
    penalty += Math.abs(guess - pos);
  }
  return penalty;
};

const positions = getInput();
positions.sort((a, b) => a - b);
const i = Math.floor(positions.length / 2);
let answer = positions[i];
// 2 seems like a reasonable radius for searching around
for (let j = i - 2; j <= i + 2; ++j) {
  if (
    0 <= j &&
    j < positions.length &&
    score(positions, positions[j]) < score(positions, answer)
  ) {
    answer = j;
  }
}
console.log(score(positions, answer));
