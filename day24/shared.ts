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

export const monad = (
  params: [number, number, number][],
  model: number[]
): boolean => {
  let z = 0;
  for (let i = 0; i < model.length; ++i) {
    const [a, b, c] = params[i];
    const w = model[i];
    const x = (z % 26) + b === w;
    z = Math.floor(z / a) * (x ? 1 : 26) + (x ? 0 : w + c);
  }
  return z === 0;
};

const right = (instr: Instr): number => {
  if (instr.code === "inp") {
    throw Error(`code: ${instr}`);
  }
  const x = instr.b;
  if (typeof x !== "number") {
    throw Error(`type: ${instr}`);
  }
  return x;
};

export const extract = (instrs: Instr[]): [number, number, number][] => {
  const parameters: [number, number, number][] = [];
  for (let i = 0; i < instrs.length; i += 18) {
    parameters.push([
      right(instrs[i + 4]),
      right(instrs[i + 5]),
      right(instrs[i + 15]),
    ]);
  }
  return parameters;
};

export const search = (
  ordering: number[],
  params: [number, number, number][],
  z: number
): number[] | null => {
  if (params.length < 1) {
    return z === 0 ? [] : null;
  }

  const [a, b, c] = params[0];
  for (const w of ordering) {
    const x = (z % 26) + b === w;
    const z1 = Math.floor(z / a) * (x ? 1 : 26) + (x ? 0 : w + c);
    const p = params.slice(1);

    let z2 = z1;
    for (const [a1] of p) {
      z2 = Math.floor(z2 / a1);
    }
    if (z2 > 0) {
      continue;
    }

    const rest = search(ordering, p, z1);
    if (rest !== null) {
      return [w, ...rest];
    }
  }

  return null;
};
