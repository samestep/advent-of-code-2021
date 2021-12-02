export type Command = "forward" | "down" | "up";

export const getInput = (filename: string): [Command, number][] => {
  const lines = Deno.readTextFileSync(filename).split("\n");
  lines.pop(); // trailing newline

  return lines.map((line) => {
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
};
