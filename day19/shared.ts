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

const overlap = (
  s1: Scanner,
  s2: Scanner,
  is1: Set<number>,
  is2: Set<number>
): Oriented | null => {
  const s2os = reorient(s2);
  for (let i = 0; i < s2os.length; ++i) {
    const s2o = s2os[i];
    for (const i1 of is1) {
      const p1 = s1[i1];
      for (const i2 of is2) {
        const p2 = s2o[i2];
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

const euclidean = ([x1, y1, z1]: Point, [x2, y2, z2]: Point) =>
  (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;

const intersect = <K, V>(
  f: (v: V) => number,
  m1: Map<K, V>,
  m2: Map<K, V>
): Map<K, number> => {
  const m = new Map<K, number>();
  for (const [k, v1] of m1.entries()) {
    const v2 = m2.get(k);
    if (v2 !== undefined) {
      m.set(k, Math.min(f(v1), f(v2)));
    }
  }
  return m;
};

const select = <K, V1, V>(
  f: (v: V1) => Set<number>,
  m1: Map<K, V1>,
  m: Map<K, V>
): Set<number> => {
  const s = new Set<number>();
  for (const k of m.keys()) {
    const v1 = m1.get(k);
    if (v1 !== undefined) {
      for (const i of f(v1)) {
        s.add(i);
      }
    }
  }
  return s;
};

export const orientAll = (scanners: Scanner[]): Map<number, Oriented> => {
  const distances = scanners.map((scanner) => {
    const m = new Map<number, { n: number; s: Set<number> }>();
    for (let i = 0; i < scanner.length; ++i) {
      for (let j = i + 1; j < scanner.length; ++j) {
        const d = euclidean(scanner[i], scanner[j]);
        let v = m.get(d);
        if (v === undefined) {
          v = { n: 0, s: new Set() };
          m.set(d, v);
        }
        ++v.n;
        v.s.add(i);
        v.s.add(j);
      }
    }
    return m;
  });

  const oriented = new Map<number, Oriented>([
    [0, { translation: [0, 0, 0], beacons: scanners[0] }],
  ]);
  const todo = [0];
  while (todo.length > 0) {
    const i = todo.pop()!;
    for (let j = 0; j < scanners.length; ++j) {
      if (!oriented.has(j)) {
        const m1 = distances[i];
        const m2 = distances[j];
        const m = intersect(({ n }) => n, m1, m2);
        if ([...m.values()].reduce((a, b) => a + b, 0) >= 66) {
          const ol = overlap(
            oriented.get(i)!.beacons,
            scanners[j],
            select(({ s }) => s, m1, m),
            select(({ s }) => s, m2, m)
          );
          if (ol !== null) {
            oriented.set(j, ol);
            todo.push(j);
          }
        }
      }
    }
  }
  return oriented;
};
