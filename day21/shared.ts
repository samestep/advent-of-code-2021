import { getLines } from "../shared.ts";

export const getInput = (): [number, number] => {
  const positions = getLines().map((line) => {
    const match = line.match(/Player \d starting position: (\d)/);
    if (!match) {
      throw Error(`failed to match: ${line}`);
    }
    return parseInt(match[1]);
  });
  return [positions[0], positions[1]];
};

export const wrap = (max: number, n: number): number => ((n - 1) % max) + 1;
