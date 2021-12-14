import { JSONMap } from "../shared.ts";
import { getInput, lowPoints } from "./shared.ts";

const heightmap = getInput();

// map each position to all the positions that flow directly into it
const graph = new JSONMap<[number, number], [number, number][]>();
for (let i = 0; i < heightmap.length; ++i) {
  for (let j = 0; j < heightmap[i].length; ++j) {
    graph.set([i, j], []);
  }
}
for (let i = 0; i < heightmap.length; ++i) {
  for (let j = 0; j < heightmap[i].length; ++j) {
    if (heightmap[i][j] < 9) {
      const area = [
        [i, j],
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ].filter(
        ([i1, j1]) =>
          0 <= i1 &&
          i1 < heightmap.length &&
          0 <= j1 &&
          j1 < heightmap[i].length
      );
      const min = Math.min(...area.map(([i1, j1]) => heightmap[i1][j1]));
      for (const [i1, j1] of area) {
        if (!(i1 === i && j1 === j) && heightmap[i1][j1] <= min) {
          graph.get([i1, j1])!.push([i, j]);
        }
      }
    }
  }
}

const basins: number[] = [];
for (const lowPoint of lowPoints(heightmap)) {
  const basin = new JSONMap<[number, number], null>();
  const stack = [lowPoint];
  while (stack.length > 0) {
    const next = stack.pop()!;
    basin.set(next, null);
    stack.push(...graph.get(next)!.filter((neighbor) => !basin.has(neighbor)));
  }
  basins.push(basin.size);
}

basins.sort((a, b) => b - a);
console.log(basins[0] * basins[1] * basins[2]);
