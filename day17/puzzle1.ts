import { getInput } from "./shared.ts";

// after some investigation, it seems clear that if a given starting y velocity
// requires that the x position reach the target area at a specific step, it is
// always possible to choose a starting x velocity that makes that happen

// because of this and the fact that the target area is always in negative y and
// we start at the origin, we know that we can simply follow a symmetrical
// trajectory in the positive y direction and build up exactly enough negative y
// velocity to catch the target area in our very first step into negative y

const { yMin } = getInput();

let y = 0;
let yMax = y;
for (let yv = -yMin - 1; yv > 0; --yv) {
  y += yv;
  yMax = Math.max(y, yMax);
}

console.log(yMax);
