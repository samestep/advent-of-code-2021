import { countIncreases, getInput } from "../code.ts";

const measurements = getInput(Deno.args[0]);

const windowSize = 3;
const windows: number[] = [];
for (let i = 0; i + windowSize <= measurements.length; ++i) {
  let window = 0;
  for (let j = 0; j < windowSize; ++j) {
    window += measurements[i + j];
  }
  windows.push(window);
}

console.log(countIncreases(windows));
