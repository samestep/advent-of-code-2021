import { getInput } from "./shared.ts";

console.log(
  getInput()
    .map(
      (entry) =>
        entry.output.filter((digit) => [2, 4, 3, 7].includes(digit.length))
          .length
    )
    .reduce((a, b) => a + b)
);
