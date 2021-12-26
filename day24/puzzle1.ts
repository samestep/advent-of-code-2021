import { extract, getInput, monad, search } from "./shared.ts";

const parameters = extract(getInput());
const model = search([9, 8, 7, 6, 5, 4, 3, 2, 1], parameters, 0);
if (model === null || !monad(parameters, model)) {
  throw Error(`invalid solution: ${model}`);
}
console.log(model.join(""));
