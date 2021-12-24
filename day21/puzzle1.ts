import { getInput, wrap } from "./shared.ts";

const p = getInput();

const s: [number, number] = [0, 0];
let d = 1;
let i = 0;
while (Math.max(...s) < 1000) {
  p[i] = wrap(
    10,
    p[i] + [d, d + 1, d + 2].map((x) => wrap(100, x)).reduce((a, b) => a + b)
  );
  s[i] += p[i];
  d += 3;
  i = (i + 1) % 2;
}

console.log(Math.min(...s) * (d - 1));
