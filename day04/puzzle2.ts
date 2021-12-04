import { getInput, play } from "./shared.ts";

const input = getInput();
const scores = play(input);
console.log(scores[scores.length - 1]);
