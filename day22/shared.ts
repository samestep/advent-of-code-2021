import { getLines } from "../shared.ts";

export type Cuboid = {
  x: [number, number];
  y: [number, number];
  z: [number, number];
};

export const getInput = (): (Cuboid & { on: boolean })[] =>
  getLines().map((line) => {
    const match = line.match(
      /([^\s]+) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/
    );
    if (!match) {
      throw Error(`failed to match: ${line}`);
    }
    return {
      on: match[1] === "on",
      x: [parseInt(match[2]), parseInt(match[3])],
      y: [parseInt(match[4]), parseInt(match[5])],
      z: [parseInt(match[6]), parseInt(match[7])],
    };
  });
