import { getLines } from "../shared.ts";

export type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g";
export type Digit = Segment[];
export type Entry = { patterns: Digit[]; output: Digit[] };

const isSegment = (segment: string): segment is Segment =>
  segment.length === 1 && "a" <= segment && segment <= "g";

const parseDigits = (s: string): Digit[] =>
  s.split(" ").map((digit) =>
    digit.split("").map((segment) => {
      if (isSegment(segment)) {
        return segment;
      } else {
        throw new Error(`invalid segment: ${segment}`);
      }
    })
  );

export const getInput = (): Entry[] =>
  getLines().map((line) => {
    const [patterns, output] = line.split(" | ").map(parseDigits);
    return { patterns, output };
  });
