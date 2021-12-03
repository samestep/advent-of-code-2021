import { getInput } from "./shared.ts";

const unbitify = (bits: boolean[]): number => {
  let n = 0;
  for (const bit of bits) {
    n = n << 1;
    if (bit) {
      n = n | 1;
    }
  }
  return n;
};

const input = getInput();

const counts: number[] = input[0].map((_) => 0);
for (const bits of input) {
  for (let i = 0; i < counts.length; ++i) {
    if (bits[i]) {
      ++counts[i];
    }
  }
}

const gamma = counts.map((n) => n * 2 > input.length);
const epsilon = gamma.map((b) => !b);

console.log(unbitify(gamma) * unbitify(epsilon));
