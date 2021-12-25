import { getInput, organize } from "./shared.ts";

console.log(
  organize(2, 100000, { rooms: getInput(), hall: Array(11).fill(null) })
);
