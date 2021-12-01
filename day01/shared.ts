export const getInput = (filename: string): number[] =>
  Deno.readTextFileSync(filename)
    .split(/\n/)
    .map((line) => parseInt(line))
    .filter((measurement) => !isNaN(measurement));

export const countIncreases = (array: number[]): number => {
  let increased = 0;
  for (let i = 1; i < array.length; ++i) {
    if (array[i] > array[i - 1]) {
      ++increased;
    }
  }
  return increased;
};
