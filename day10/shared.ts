import { getLines } from "../shared.ts";

export type Delimiter = "(" | ")" | "[" | "]" | "{" | "}" | "<" | ">";

export const getInput = (): Delimiter[][] =>
  getLines().map((line) =>
    line.split("").map((c) => {
      if (
        c === "(" ||
        c === ")" ||
        c === "[" ||
        c === "]" ||
        c === "{" ||
        c === "}" ||
        c === "<" ||
        c === ">"
      ) {
        return c;
      } else {
        throw new Error(`not a delimiter: ${c}`);
      }
    })
  );
