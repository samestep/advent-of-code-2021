import { Delimiter, getInput } from "./shared.ts";

const scores: number[] = [];
lines: for (const line of getInput()) {
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
        continue lines;
      }
    }
  }
  let score = 0;
  for (const delim of stack.reverse()) {
    score *= 5;
    if (delim === "(") {
      score += 1;
    } else if (delim === "[") {
      score += 2;
    } else if (delim === "{") {
      score += 3;
    } else if (delim === "<") {
      score += 4;
    } else {
      throw new Error(`invalid delimiter in stack: ${delim}`);
    }
  }
  scores.push(score);
}
scores.sort((a, b) => a - b);
console.log(scores[Math.floor(scores.length / 2)]);
