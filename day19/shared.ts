import { getAllLines } from "../shared.ts";

export type Point = [number, number, number];
export type Scanner = Point[];

export const is3D = <T>(v: T[]): v is [T, T, T] => v.length === 3;

export const getInput = (): Scanner[] => {
  const lines = getAllLines();
  const scanners: Scanner[] = [];
  let scanner: Scanner = [];
  for (const line of lines) {
    if (!line) {
      scanners.push(scanner);
      scanner = [];
    } else {
      const match = line.match(/(-?\d+),(-?\d+),(-?\d+)/);
      if (match) {
        match.shift();
        const [x, y, z] = match.map((n) => parseInt(n));
        scanner.push([x, y, z]);
      }
    }
  }
  return scanners;
};

const orientations = ([x, y, z]: Point): Point[] => [
  [x, y, z],
  [x, -y, -z],
  [-x, y, -z],
  [-x, -y, z],

  [-x, -z, -y],
  [-x, z, y],
  [x, -z, y],
  [x, z, -y],

  [-y, -x, -z],
  [-y, x, z],
  [y, -x, z],
  [y, x, -z],

  [y, z, x],
  [y, -z, -x],
  [-y, z, -x],
  [-y, -z, x],

  [z, x, y],
  [z, -x, -y],
  [-z, x, -y],
  [-z, -x, y],

  [-z, -y, -x],
  [-z, y, x],
  [z, -y, x],
  [z, y, -x],
];

// because I don't want to bother figuring out how to import lodash in Deno
const zipWith = <T>(
  v1: Point,
  v2: Point,
  f: (x1: number, x2: number) => T
): [T, T, T] => {
  const result = v1.map((x1, i) => f(x1, v2[i]));
  if (is3D(result)) {
    return result;
  } else {
    throw Error("impossible");
  }
};

// https://stackoverflow.com/a/36164530
const transpose = <T>(m: T[][]): T[][] =>
  m[0].map((_, i) => m.map((r) => r[i]));

const reorient = (scanner: Scanner): Scanner[] =>
  transpose(scanner.map(orientations));

export type Oriented = {
  translation: Point;
  beacons: Scanner;
};

const overlap = (s1: Scanner, s2: Scanner): Oriented | null => {
  const s2os = reorient(s2);
  for (let i = 0; i < s2os.length; ++i) {
    const s2o = s2os[i];
    for (const p1 of s1) {
      for (const p2 of s2o) {
        const translation = zipWith(p1, p2, (a, b) => a - b);
        const beacons = s2o.map((p2) =>
          zipWith(p2, translation, (a, b) => a + b)
        );
        const shared = beacons.filter((p2) =>
          s1.some((p1) => zipWith(p1, p2, (a, b) => a === b).every((x) => x))
        );
        if (shared.length >= 12) {
          return { translation, beacons };
        }
      }
    }
  }
  return null;
};

export const orientAll = (scanners: Scanner[]): Map<number, Oriented> => {
  const oriented = new Map<number, Oriented>([
    [0, { translation: [0, 0, 0], beacons: scanners[0] }],
  ]);
  const todo = [0];
  while (todo.length > 0) {
    const i = todo.pop()!;
    for (let j = 0; j < scanners.length; ++j) {
      if (!oriented.has(j)) {
        const ol = overlap(oriented.get(i)!.beacons, scanners[j]);
        if (ol !== null) {
          oriented.set(j, ol);
          todo.push(j);
        }
      }
    }
  }
  return oriented;
};
