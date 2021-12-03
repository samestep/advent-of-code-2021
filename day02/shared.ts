import { getLines } from "../shared.ts";

export type Command = "forward" | "down" | "up";

export const getInput = (): [Command, number][] => {
  const lines = getLines();
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
