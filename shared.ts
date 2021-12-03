export const getLines = (): string[] => {
  const lines = Deno.readTextFileSync(Deno.args[0]).split("\n");
  lines.pop(); // trailing newline
  return lines;
};
