import { JSONMap } from "../shared.ts";
import { getInput, wrap } from "./shared.ts";

type State = {
  p: [number, number];
  s: [number, number];
};

type Summary = {
  wins: [number, number];
  multiverse: JSONMap<State, number>;
};

const rolls = (() => {
  const die = [1, 2, 3];
  const a = [];
  for (const x of die) {
    for (const y of die) {
      for (const z of die) {
        a.push(x + y + z);
      }
    }
  }
  return a;
})();

const turn = (i: number, summary: Summary): Summary => {
  const wins: [number, number] = [summary.wins[0], summary.wins[1]];
  const multiverse = new JSONMap<State, number>();
  for (const [{ p, s }, n] of summary.multiverse.entries()) {
    for (const roll of rolls) {
      const p1: [number, number] = [p[0], p[1]];
      const s1: [number, number] = [s[0], s[1]];
      p1[i] = wrap(10, p1[i] + roll);
      s1[i] += p1[i];
      if (s1[i] >= 21) {
        wins[i] += n;
      } else {
        const state = { p: p1, s: s1 };
        const m = multiverse.get(state);
        multiverse.set(state, (m === undefined ? 0 : m) + n);
      }
    }
  }
  return { wins, multiverse };
};

const start = getInput();
let summary: Summary = {
  wins: [0, 0],
  multiverse: new JSONMap([[{ p: start, s: [0, 0] }, 1]]),
};
for (let i = 0; summary.multiverse.size > 0; ++i) {
  summary = turn(i % 2, summary);
}
console.log(Math.max(...summary.wins));
