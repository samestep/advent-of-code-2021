import { getNumbers } from "../shared.ts";

export const getInput = getNumbers;

const step = (before: number[]): number[] => {
  const after = Array(before.length);
  for (let i = 0; i + 1 < before.length; ++i) {
    after[i] = before[i + 1];
  }
  after[before.length - 1] = before[0];
  after[before.length - 3] += before[0];
  return after;
};

export const afterDays = (input: number[], days: number): number => {
  let counts = Array(9);
  counts.fill(0);
  for (const fish of input) {
    ++counts[fish];
  }

  for (let day = 0; day < days; ++day) {
    counts = step(counts);
  }

  return counts.reduce((a, b) => a + b);
};
