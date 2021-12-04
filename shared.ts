export const getAllLines = (): string[] =>
  Deno.readTextFileSync(Deno.args[0]).split("\n");

export const getLines = (): string[] => {
  const lines = getAllLines();
  lines.pop(); // trailing newline
  return lines;
};
