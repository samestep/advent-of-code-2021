import { getLines } from "../shared.ts";

export type Input = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export const getInput = (): Input => {
  const match = getLines()[0].match(
    /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/
  );
  if (!match) {
    throw new Error("failed to match");
  }
  match.shift();
  const [xMin, xMax, yMin, yMax] = match.map((n) => parseInt(n));
  return { xMin, xMax, yMin, yMax };
};
