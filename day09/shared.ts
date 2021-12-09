import { getLines } from "../shared.ts";

export const getInput = (): number[][] =>
  getLines().map((line) => line.split("").map((n) => parseInt(n)));

export const lowPoints = (heightmap: number[][]): [number, number][] => {
  const points: [number, number][] = [];
  for (let i = 0; i < heightmap.length; ++i) {
    const top = i <= 0;
    const bottom = i + 1 >= heightmap.length;
    for (let j = 0; j < heightmap[i].length; ++j) {
      const left = j <= 0;
      const right = j + 1 >= heightmap[i].length;
      const here = heightmap[i][j];
      if (
        (top || here < heightmap[i - 1][j]) &&
        (bottom || here < heightmap[i + 1][j]) &&
        (left || here < heightmap[i][j - 1]) &&
        (right || here < heightmap[i][j + 1])
      ) {
        points.push([i, j]);
      }
    }
  }
  return points;
};
