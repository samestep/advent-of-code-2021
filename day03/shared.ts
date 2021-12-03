import { getLines } from "../shared.ts";

export const getInput = (): boolean[][] =>
  getLines().map((line) =>
    line.split("").map((c) => {
      if (c === "0") {
        return false;
      } else if (c === "1") {
        return true;
      } else {
        throw new Error(`invalid bit: ${c}`);
      }
    })
  );
