import { getInput } from "./shared.ts";

const input = getInput();

let horizontal = 0;
let depth = 0;

for (const step of input) {
  const [cmd, amt] = step;
  if (cmd === "forward") {
    horizontal += amt;
  } else if (cmd === "down") {
    depth += amt;
  } else if (cmd === "up") {
    depth -= amt;
  }
}

console.log(horizontal * depth);
