import { getLines } from "../shared.ts";

export type Pod = "A" | "B" | "C" | "D";

export const getInput = (): [Pod, Pod][] => {
  const lines = getLines();
  const [front, back] = [2, 3].map((i) => {
    const match = lines[i].match(/...(.).(.).(.).(.)./);
    if (!match) {
      throw Error(`failed to match: ${lines[i]}`);
    }
    match.shift();
    return match.map((char) => {
      if (char === "A" || char === "B" || char === "C" || char === "D") {
        return char;
      } else {
        throw Error(`invalid character: ${char}`);
      }
    });
  });
  return front.map((f, i) => [back[i], f]);
};

const types = ["A", "B", "C", "D"];

const cost = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

type State = {
  rooms: Pod[][];
  hall: (Pod | null)[];
};

const clone = ({ rooms, hall }: State): State => ({
  rooms: rooms.map((room) => room.map((x) => x)),
  hall: hall.map((x) => x),
});

export const organize = (
  roomSize: number,
  budget: number,
  state: State
): number => {
  if (budget < 0) {
    return -1;
  }

  if (
    state.rooms.every((room, i) => room.every((pod) => pod === types[i])) &&
    state.hall.every((x) => x === null)
  ) {
    return 0;
  }
  let best = -1;

  const g = (extra: number, cloned: State) => {
    const trueBudget = best < 0 ? budget : Math.min(budget, best);
    if (extra < trueBudget) {
      const energy = organize(roomSize, trueBudget - extra, cloned);
      const total = extra + energy;
      if (energy >= 0 && (best < 0 || total < best)) {
        best = total;
      }
    }
  };

  // move out of room
  for (let i = 0; i < types.length; ++i) {
    const room = state.rooms[i];
    if (room.some((pod) => pod !== types[i])) {
      const location = 2 * (1 + i);
      const f = (j: number) => {
        if (!(j === 2 || j === 4 || j === 6 || j === 8)) {
          const cloned = clone(state);
          const pod = cloned.rooms[i].pop()!;
          cloned.hall[j] = pod;
          const extra =
            (Math.abs(j - location) + 1 + roomSize - room.length) * cost[pod];
          g(extra, cloned);
        }
      };
      for (let j = location; j >= 0 && state.hall[j] === null; --j) {
        f(j);
      }
      for (
        let j = location;
        j < state.hall.length && state.hall[j] === null;
        ++j
      ) {
        f(j);
      }
    }
  }

  // move into room
  for (let j = 0; j < state.hall.length; ++j) {
    const pod = state.hall[j];
    if (pod !== null) {
      const i = types.indexOf(pod);
      const room = state.rooms[i];
      if (room.every((p) => p === pod)) {
        const location = 2 * (1 + i);
        let clear = true;
        for (let k = location; k !== j; k += j < location ? -1 : 1) {
          if (state.hall[k] !== null) {
            clear = false;
          }
        }
        if (clear) {
          const cloned = clone(state);
          cloned.hall[j] = null;
          cloned.rooms[i].push(pod);
          const extra =
            (Math.abs(location - j) + roomSize - room.length) * cost[pod];
          g(extra, cloned);
        }
      }
    }
  }

  return best;
};
