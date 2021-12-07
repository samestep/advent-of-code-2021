export const getAllLines = (): string[] =>
  Deno.readTextFileSync(Deno.args[0]).split("\n");

export const getLines = (): string[] => {
  const lines = getAllLines();
  lines.pop(); // trailing newline
  return lines;
};

export const getNumbers = (): number[] => {
  const lines = getLines();
  if (lines.length !== 1) {
    throw new Error("expected exactly one line");
  }
  return lines[0].split(",").map((n) => parseInt(n));
};
