import { Input, getInput } from "./shared.ts";

const reaches = (
  { xMin, xMax, yMin, yMax }: Input,
  xvStart: number,
  yvStart: number
): boolean => {
  let x = 0;
  let y = 0;
  let xv = xvStart;
  let yv = yvStart;
  while (x <= xMax && y >= yMin && (xv > 0 || x >= xMin)) {
    if (xMin <= x && x <= xMax && yMin <= y && y <= yMax) {
      return true;
    }
    x += xv;
    y += yv;
    if (xv > 0) {
      --xv;
    }
    --yv;
  }
  return false;
};

const input = getInput();

let count = 0;
for (let xv = 0; xv <= input.xMax; ++xv) {
  for (let yv = input.yMin; yv <= -input.yMin - 1; ++yv) {
    if (reaches(input, xv, yv)) {
      ++count;
    }
  }
}

console.log(count);
