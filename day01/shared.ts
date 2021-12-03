import { getLines } from "../shared.ts";

export const getInput = (): number[] =>
  getLines().map((line) => parseInt(line));

export const countIncreases = (array: number[]): number => {
  let increased = 0;
  for (let i = 1; i < array.length; ++i) {
    if (array[i] > array[i - 1]) {
      ++increased;
    }
  }
  return increased;
};
