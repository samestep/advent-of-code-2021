import { getInput, unbitify } from "./shared.ts";

const process = (
  criteria: (total: number, ones: number) => boolean,
  position: number,
  numbers: boolean[][]
): boolean[] => {
  let count = 0;
  for (const bits of numbers) {
    if (bits[position]) {
      ++count;
    }
  }
  const keep = criteria(numbers.length, count);
  const filtered = numbers.filter((bits) => bits[position] === keep);
  if (filtered.length === 1) {
    return filtered[0];
  } else {
    return process(criteria, position + 1, filtered);
  }
};

const oxygen = (position: number, numbers: boolean[][]): boolean[] =>
  process((total, ones) => ones * 2 >= total, position, numbers);

const co2 = (position: number, numbers: boolean[][]): boolean[] =>
  process((total, ones) => ones * 2 < total, position, numbers);

const input = getInput();
console.log(unbitify(oxygen(0, input)) * unbitify(co2(0, input)));
