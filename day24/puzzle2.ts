import { extract, getInput, monad, search } from "./shared.ts";

const parameters = extract(getInput());
const model = search([1, 2, 3, 4, 5, 6, 7, 8, 9], parameters, 0);
if (model === null || !monad(parameters, model)) {
  throw Error(`invalid solution: ${model}`);
}
console.log(model.join(""));
