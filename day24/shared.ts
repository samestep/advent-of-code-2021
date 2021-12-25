import { getLines } from "../shared.ts";

export type Var = "w" | "x" | "y" | "z";

const parseVar = (s: string): Var => {
  if (s === "w" || s === "x" || s === "y" || s === "z") {
    return s;
  } else {
    throw Error(`invalid variable: ${s}`);
  }
};

export type Instr = {
  a: Var;
} & (
  | {
      code: "inp";
    }
  | {
      code: "add" | "mul" | "div" | "mod" | "eql";
      b: Var | number;
    }
);

export const getInput = (): Instr[] =>
  getLines().map((line) => {
    const [code, o1, ...rest] = line.split(" ");
    const a = parseVar(o1);
    if (code === "inp") {
      return { code, a };
    } else if (
      code === "add" ||
      code === "mul" ||
      code === "div" ||
      code === "mod" ||
      code === "eql"
    ) {
      const [o2] = rest;
      const b = parseInt(o2);
      return { code, a, b: isNaN(b) ? parseVar(o2) : b };
    } else {
      throw Error(`invalid instruction: ${line}`);
    }
  });
