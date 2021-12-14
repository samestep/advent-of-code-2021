import { getLines } from "../shared.ts";

export type Graph = Map<string, Set<string>>;

export const getInput = (): Graph => {
  const graph: Graph = new Map();
  for (const line of getLines()) {
    const [left, right] = line.split("-");
    for (const [a, b] of [
      [left, right],
      [right, left],
    ]) {
      const adjacent = graph.get(a);
      if (adjacent === undefined) {
        graph.set(a, new Set([b]));
      } else {
        adjacent.add(b);
      }
    }
  }
  return graph;
};
