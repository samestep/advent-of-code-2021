import { getLines } from "../shared.ts";

export type Image = {
  background: string;
  foreground: string[];
};

export type Input = {
  algorithm: string;
  image: Image;
};

export const getInput = (): Input => {
  const lines = getLines();
  const foreground = [];
  for (let i = 2; i < lines.length; ++i) {
    foreground.push(lines[i]);
  }
  return { algorithm: lines[0], image: { background: ".", foreground } };
};

const enhance = (
  algorithm: string,
  { background, foreground }: Image
): Image => {
  const output = [];
  for (let r = -1; r <= foreground.length; ++r) {
    const row = [];
    for (let c = -1; c <= foreground[0].length; ++c) {
      const i = [];
      for (let r1 = r - 1; r1 <= r + 1; ++r1) {
        for (let c1 = c - 1; c1 <= c + 1; ++c1) {
          const char =
            0 <= r1 &&
            r1 < foreground.length &&
            0 <= c1 &&
            c1 < foreground[0].length
              ? foreground[r1][c1]
              : background;
          i.push(char === "#" ? 1 : 0);
        }
      }
      row.push(algorithm[parseInt(i.join(""), 2)]);
    }
    output.push(row.join(""));
  }
  return {
    background: background === "#" ? algorithm[511] : algorithm[0],
    foreground: output,
  };
};

export const repeat = (input: Input, iterations: number): number => {
  const { algorithm } = input;
  let { image } = input;
  for (let i = 0; i < iterations; ++i) {
    image = enhance(algorithm, image);
  }
  let n = 0;
  for (const row of image.foreground) {
    for (const char of row) {
      if (char === "#") {
        ++n;
      }
    }
  }
  return n;
};
