import { Cuboid, getInput } from "./shared.ts";

type Axis = "x" | "y" | "z";

const intersect = (
  axis: Axis,
  c1: Cuboid,
  c2: Cuboid
): [[number, number], [number, number][]] => {
  const [a11, a12] = c1[axis];
  const [a21, a22] = c2[axis];
  const a1 = Math.max(a11, a21);
  const a2 = Math.min(a12, a22);
  const left: [number, number] = [a1, a2];
  if (a11 < a1) {
    if (a2 < a12) {
      return [
        left,
        [
          [a11, a1 - 1],
          [a1, a2],
          [a2 + 1, a12],
        ],
      ];
    } else {
      return [
        left,
        [
          [a11, a1 - 1],
          [a1, a2],
        ],
      ];
    }
  } else {
    if (a2 < a12) {
      return [
        left,
        [
          [a1, a2],
          [a2 + 1, a12],
        ],
      ];
    } else {
      return [left, [[a1, a2]]];
    }
  }
};

const difference = (c1: Cuboid, c2: Cuboid): Cuboid[] => {
  const [[ix1, ix2], xs] = intersect("x", c1, c2);
  const [[iy1, iy2], ys] = intersect("y", c1, c2);
  const [[iz1, iz2], zs] = intersect("z", c1, c2);
  if (ix1 <= ix2 && iy1 <= iy2 && iz1 <= iz2) {
    const broken = [];
    for (const x of xs) {
      for (const y of ys) {
        for (const z of zs) {
          const [x1, x2] = x;
          const [y1, y2] = y;
          const [z1, z2] = z;
          if (
            x1 <= x2 &&
            y1 <= y2 &&
            z1 <= z2 &&
            !(
              x1 === ix1 &&
              x2 === ix2 &&
              y1 === iy1 &&
              y2 === iy2 &&
              z1 === iz1 &&
              z2 === iz2
            )
          ) {
            broken.push({ x, y, z });
          }
        }
      }
    }
    return broken;
  } else {
    return [c1];
  }
};

let reactor: Cuboid[] = [];
for (const { on, x, y, z } of getInput()) {
  const cuboid = { x, y, z };
  if (on) {
    let toAdd: Cuboid[] = [cuboid];
    for (const c2 of reactor) {
      const expanded = [];
      for (const c1 of toAdd) {
        expanded.push(...difference(c1, c2));
      }
      toAdd = expanded;
    }
    reactor.push(...toAdd);
  } else {
    const after: Cuboid[] = [];
    for (const c1 of reactor) {
      after.push(...difference(c1, cuboid));
    }
    reactor = after;
  }
}

let n = 0;
for (const {
  x: [x1, x2],
  y: [y1, y2],
  z: [z1, z2],
} of reactor) {
  n += (1 + x2 - x1) * (1 + y2 - y1) * (1 + z2 - z1);
}
console.log(n);
