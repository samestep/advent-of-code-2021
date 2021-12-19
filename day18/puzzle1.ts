import { getInput, add, magnitude } from "./shared.ts";

console.log(magnitude(getInput().reduce(add)));
