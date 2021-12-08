import { Segment, Digit, Entry, getInput } from "./shared.ts";

type Code = {
  a: Segment;
  b: Segment;
  c: Segment;
  d: Segment;
  e: Segment;
  f: Segment;
  g: Segment;
};

const decode = (patterns: Digit[]): Code => {
  const sift = (n: number) => patterns.filter((digit) => digit.length === n);
  const [[one], [seven], [four], twoThreeFive, zeroSixNine, [eight]] = [
    2, 3, 4, 5, 6, 7,
  ].map(sift);
  const [a] = seven.filter((s) => !one.includes(s));
  const [f] = one.filter((s) =>
    zeroSixNine.every((digit) => digit.includes(s))
  );
  const [c] = one.filter((s) => s !== f);
  const bd = four.filter((s) => !one.includes(s));
  const [d] = bd.filter((s) =>
    twoThreeFive.every((digit) => digit.includes(s))
  );
  const [b] = bd.filter((s) => s !== d);
  const eg = eight.filter((s) => !(four.includes(s) || seven.includes(s)));
  const [g] = eg.filter((s) => zeroSixNine.every((digit) => digit.includes(s)));
  const [e] = eg.filter((s) => s !== g);
  return { a, b, c, d, e, f, g };
};

const translate = (code: Code, digit: Digit): number => {
  if (digit.length === 2) {
    return 1;
  } else if (digit.length === 3) {
    return 7;
  } else if (digit.length === 4) {
    return 4;
  } else if (digit.length === 5) {
    if (digit.includes(code.b)) {
      return 5;
    } else if (digit.includes(code.e)) {
      return 2;
    } else {
      return 3;
    }
  } else if (digit.length === 6) {
    if (!digit.includes(code.c)) {
      return 6;
    } else if (!digit.includes(code.d)) {
      return 0;
    } else {
      return 9;
    }
  } else {
    // digit.length === 7
    return 8;
  }
};

const compute = ({ patterns, output }: Entry): number => {
  const code = decode(patterns);
  return parseInt(output.map((digit) => translate(code, digit)).join(""));
};

console.log(
  getInput()
    .map(compute)
    .reduce((a, b) => a + b)
);
