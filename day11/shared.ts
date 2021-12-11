import { getLines } from "../shared.ts";

export type Grid = number[][];

export const getInput = (): Grid =>
  getLines().map((line) => line.split("").map((c) => parseInt(c)));

const neighbors = (i: number, j: number): [number, number][] => [
  [i - 1, j - 1],
  [i - 1, j],
  [i - 1, j + 1],
  [i, j - 1],
  [i, j + 1],
  [i + 1, j - 1],
  [i + 1, j],
  [i + 1, j + 1],
];

export const step = (before: Grid): Grid => {
  const toIncrease: [number, number][] = [];
  const after = before.map((row, i) =>
    row.map((octopus, j) => {
      if (octopus < 9) {
        return octopus + 1;
      } else {
        toIncrease.push(...neighbors(i, j));
        return 0;
      }
    })
  );
  while (toIncrease.length > 0) {
    const [i, j] = toIncrease.pop()!;
    if (
      0 <= i &&
      i < after.length &&
      0 <= j &&
      j < after[i].length &&
      after[i][j] > 0
    ) {
      if (after[i][j] < 9) {
        ++after[i][j];
      } else {
        after[i][j] = 0;
        toIncrease.push(...neighbors(i, j));
      }
    }
  }
  return after;
};
