import { getInput, fold } from "./shared.ts";

const { points, folds } = getInput();
console.log(fold(points, folds[0]).size);
