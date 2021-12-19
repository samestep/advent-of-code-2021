import { getLines } from "../shared.ts";

export type Input = {
  template: string;
  rules: Map<string, string>;
};

export const getInput = (): Input => {
  const lines = getLines();
  const rules = new Map<string, string>();
  for (let i = 2; i < lines.length; ++i) {
    const match = lines[i].match(/(..) -> (.)/);
    if (!match) {
      throw new Error(`failed to match: ${lines[i]}`);
    }
    const [_, adjacent, insert] = match;
    rules.set(adjacent, insert);
  }
  return { template: lines[0], rules };
};

const transform = (polymer: string): Map<string, number> => {
  const elements = polymer.split("");
  const pairs = new Map<string, number>();
  pairs.set(` ${elements[0]}`, 1);
  for (let i = 0; i + 1 < elements.length; ++i) {
    const pair = `${elements[i]}${elements[i + 1]}`;
    const before = pairs.get(pair);
    pairs.set(pair, (before === undefined ? 0 : before) + 1);
  }
  pairs.set(`${polymer[elements.length - 1]} `, 1);
  return pairs;
};

const step = (
  rules: Map<string, string>,
  polymer: Map<string, number>
): Map<string, number> => {
  const next = new Map<string, number>();
  const inc = (pair: string, n: number) => {
    const before = next.get(pair);
    next.set(pair, (before === undefined ? 0 : before) + n);
  };
  for (const [pair, n] of polymer) {
    const insert = rules.get(pair);
    if (insert === undefined) {
      inc(pair, n);
    } else {
      const [left, right] = pair.split("");
      inc(`${left}${insert}`, n);
      inc(`${insert}${right}`, n);
    }
  }
  return next;
};

export const difference = (
  { template, rules }: Input,
  steps: number
): number => {
  let polymer = transform(template);
  for (let i = 0; i < steps; ++i) {
    polymer = step(rules, polymer);
  }

  const frequencies = new Map<string, number>();
  for (const [pair, n] of polymer.entries()) {
    for (const element of pair.split("")) {
      const before = frequencies.get(element);
      frequencies.set(element, (before === undefined ? 0 : before) + n);
    }
  }
  frequencies.delete(" ");
  const counts = Array.from(frequencies.values()).map((n) => n / 2);
  counts.sort((a, b) => a - b);
  return counts[counts.length - 1] - counts[0];
};
