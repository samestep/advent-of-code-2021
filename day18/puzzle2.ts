import { getInput, add, magnitude } from "./shared.ts";

const numbers = getInput();

let largest = 0;
for (const x of numbers) {
  for (const y of numbers) {
    largest = Math.max(largest, magnitude(add(x, y)));
  }
}

console.log(largest);
