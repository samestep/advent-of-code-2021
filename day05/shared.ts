import { getLines } from "../shared.ts";

export type Line = { x1: number; y1: number; x2: number; y2: number };

export const getInput = (): Line[] =>
  getLines().map((line) => {
    const match = line.match(/(\d+),(\d+) -> (\d+),(\d+)/);
    if (!match) {
      throw new Error(`failed to match: ${line}`);
    }
    match.shift();
    const [x1, y1, x2, y2] = match.map((n) => parseInt(n));
    return { x1, y1, x2, y2 };
  });

export type Grid = number[][];

export const makeGrid = (lines: Line[]): Grid => {
  // assume min x and min y are 0
  let maxX = 0;
  let maxY = 0;
  for (const { x1, y1, x2, y2 } of lines) {
    maxX = Math.max(maxX, x1, x2);
    maxY = Math.max(maxY, y1, y2);
  }

  const grid: Grid = [];
  for (let y = 0; y <= maxY; ++y) {
    const row = Array(maxX + 1);
    row.fill(0);
    grid.push(row);
  }

  return grid;
};

export const printGrid = (grid: Grid): void => {
  for (const row of grid) {
    console.log(
      row
        .map((n) => {
          if (n < 1) {
            return ".";
          } else if (n > 9) {
            return "+";
          } else {
            return n.toString();
          }
        })
        .join("")
    );
  }
};

export const countOverlaps = (grid: Grid): number => {
  let overlaps = 0;
  for (const row of grid) {
    for (const n of row) {
      if (n > 1) {
        ++overlaps;
      }
    }
  }
  return overlaps;
};
