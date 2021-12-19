import { getGrid } from "../shared.ts";

import { Heap } from "https://deno.land/x/heap@0.0.1-pre.0/heap.ts";

export const getInput = getGrid;

export const bestPath = (grid: number[][]): number => {
  const height = grid.length;
  const width = grid[0].length;

  const paths = grid.map((row) => row.map((_) => -1));
  const heap = Heap<[number, number, number]>(([n1], [n2]) => n1 - n2);
  heap.push([0, 0, 0]);
  while (heap.length > 0) {
    const [n, r, c] = heap.pop()!;
    if (paths[r][c] < 0) {
      paths[r][c] = n;
      for (const [r1, c1] of [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ]) {
        if (
          0 <= r1 &&
          r1 < height &&
          0 <= c1 &&
          c1 < width &&
          paths[r1][c1] < 0
        ) {
          heap.push([n + grid[r1][c1], r1, c1]);
        }
      }
    }
  }

  return paths[height - 1][width - 1];
};
