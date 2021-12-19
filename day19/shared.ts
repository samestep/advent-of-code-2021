import { getAllLines } from "../shared.ts";

export type Scanner = [number, number, number][];

export const getInput = (): Scanner[] => {
  const lines = getAllLines();
  const scanners: Scanner[] = [];
  let scanner: Scanner = [];
  for (const line of lines) {
    if (!line) {
      scanners.push(scanner);
      scanner = [];
    } else {
      const match = line.match(/(-?\d+),(-?\d+),(-?\d+)/);
      if (match) {
        match.shift();
        const [x, y, z] = match.map((n) => parseInt(n));
        scanner.push([x, y, z]);
      }
    }
  }
  return scanners;
};
