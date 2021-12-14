import { JSONMap, getLines } from "../shared.ts";

export type Points = JSONMap<[number, number], null>;

export type Axis = "x" | "y";

export type Input = {
  points: Points;
  folds: [Axis, number][];
};

export const getInput = (): Input => {
  const lines = getLines();
  const i = lines.indexOf("");
  const points = new JSONMap<[number, number], null>();
  const folds: [Axis, number][] = [];
  for (let j = 0; j < i; ++j) {
    const [x, y] = lines[j].split(",");
    points.set([parseInt(x), parseInt(y)], null);
  }
  for (let j = i + 1; j < lines.length; ++j) {
    const match = lines[j].match(/fold along (.)=(\d+)/);
    if (!match) {
      throw new Error(`failed to match: ${lines[j]}`);
    }
    const axis = match[1];
    if (!(axis === "x" || axis === "y")) {
      throw new Error(`invalid axis: ${axis}`);
    }
    folds.push([axis, parseInt(match[2])]);
  }
  return { points, folds };
};

export const fold = (points: Points, [axis, index]: [Axis, number]): Points => {
  const folded: Points = new JSONMap();
  for (const [x, y] of points.keys()) {
    folded.set(
      [
        axis === "x" && x > index ? index - (x - index) : x,
        axis === "y" && y > index ? index - (y - index) : y,
      ],
      null
    );
  }
  return folded;
};
