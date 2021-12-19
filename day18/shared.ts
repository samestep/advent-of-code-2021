import { getLines } from "../shared.ts";

export type Snailfish = number | [Snailfish, Snailfish];

export const getInput = (): Snailfish[] =>
  getLines().map((line) => JSON.parse(line));
