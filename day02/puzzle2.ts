import { getInput } from "./shared.ts";

const input = getInput(Deno.args[0]);

let horizontal = 0;
let depth = 0;
let aim = 0;

for (const step of input) {
  const [cmd, amt] = step;
  if (cmd === "down") {
    aim += amt;
  } else if (cmd === "up") {
    aim -= amt;
  } else if (cmd === "forward") {
    horizontal += amt;
    depth += aim * amt;
  }
}

console.log(horizontal * depth);
