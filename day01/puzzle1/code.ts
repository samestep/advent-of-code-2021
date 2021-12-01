const measurements: number[] = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .map((line) => parseInt(line))
  .filter((measurement) => !isNaN(measurement));
let increased = 0;
for (let i = 1; i < measurements.length; ++i) {
  if (measurements[i] > measurements[i - 1]) {
    ++increased;
  }
}
console.log(increased);
