import { getInput } from "./shared.ts";

const size = 101;
const cubes: boolean[][][] = [];
for (let x = 0; x <= size; ++x) {
  const plane = [];
  for (let y = 0; y <= size; ++y) {
    const line = [];
    for (let z = 0; z <= size; ++z) {
      line.push(false);
    }
    plane.push(line);
  }
  cubes.push(plane);
}

const cuboids = getInput();
for (const {
  on,
  x: [x1, x2],
  y: [y1, y2],
  z: [z1, z2],
} of cuboids) {
  if (Math.max(...[x1, x2, y1, y2, z1, z2].map(Math.abs)) <= 50) {
    for (let x = x1; x <= x2; ++x) {
      for (let y = y1; y <= y2; ++y) {
        for (let z = z1; z <= z2; ++z) {
          cubes[x + 50][y + 50][z + 50] = on;
        }
      }
    }
  }
}

let n = 0;
for (let x = 0; x <= size; ++x) {
  for (let y = 0; y <= size; ++y) {
    for (let z = 0; z <= size; ++z) {
      if (cubes[x][y][z]) {
        ++n;
      }
    }
  }
}
console.log(n);
