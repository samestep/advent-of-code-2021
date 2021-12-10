import { Delimiter, getInput } from "./shared.ts";

let score = 0;
for (const line of getInput()) {
  const stack: Delimiter[] = [];
  for (const delim of line) {
    if (delim === "(" || delim === "[" || delim === "{" || delim === "<") {
      stack.push(delim);
    } else {
      const match = stack.pop();
      if (match === undefined) {
        throw new Error("stack empty");
      }
      if (
        (match === "(" && delim !== ")") ||
        (match === "[" && delim !== "]") ||
        (match === "{" && delim !== "}") ||
        (match === "<" && delim !== ">")
      ) {
        score += { ")": 3, "]": 57, "}": 1197, ">": 25137 }[delim];
        break;
      }
    }
  }
}
console.log(score);
