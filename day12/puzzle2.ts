import { Graph, getInput } from "./shared.ts";

const countPaths = (
  graph: Graph,
  start: string,
  small: Set<string>,
  twice: boolean
): number => {
  if (start === "end") {
    return 1;
  }
  let n = 0;
  const neighbors = graph.get(start);
  if (neighbors === undefined) {
    throw new Error(`no neighbors: ${start}`);
  }
  for (const neighbor of neighbors) {
    if (!small.has(neighbor)) {
      const smaller = new Set(small);
      if (neighbor.toLowerCase() === neighbor) {
        smaller.add(neighbor);
      }
      n += countPaths(graph, neighbor, smaller, twice);
    } else if (!twice && neighbor !== "start") {
      n += countPaths(graph, neighbor, small, true);
    }
  }
  return n;
};

console.log(countPaths(getInput(), "start", new Set(["start"]), false));
