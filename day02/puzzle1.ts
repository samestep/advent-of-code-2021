type Command = "forward" | "down" | "up";

const lines = Deno.readTextFileSync(Deno.args[0]).split("\n");
lines.pop();

const input: [Command, number][] = lines.map((line) => {
  const [cmd, amtUnparsed] = line.split(" ");
  const amt = parseInt(amtUnparsed);
  if (isNaN(amt)) {
    throw new Error(`invalid amount: ${amtUnparsed}`);
  } else if (cmd === "forward" || cmd === "down" || cmd === "up") {
    return [cmd, amt];
  } else {
    throw new Error(`invalid command: ${cmd}`);
  }
});

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
