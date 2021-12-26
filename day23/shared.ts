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
  rooms: rooms.map((room) => [...room]),
  hall: [...hall],
});

const penalty = (
  roomSize: number,
  budget: number | null,
  state: State
): number | null => {
  if (budget !== null && budget < 0) {
    return null;
  }

  if (
    state.rooms.every((room, i) => room.every((pod) => pod === types[i])) &&
    state.hall.every((x) => x === null)
  ) {
    return 0;
  }

  moveIntoRoom: for (let j = 0; j < state.hall.length; ++j) {
    const pod = state.hall[j];
    if (pod !== null) {
      const i = types.indexOf(pod);
      const room = state.rooms[i];
      if (room.every((p) => p === pod)) {
        const location = 2 * (1 + i);
        for (let k = location; k !== j; k += j < location ? -1 : 1) {
          if (state.hall[k] !== null) {
            continue moveIntoRoom;
          }
        }
        state.hall[j] = null;
        state.rooms[i].push(pod);
        return penalty(roomSize, budget, state);
      }
    }
  }

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
          const end = 2 * (1 + types.indexOf(pod));
          const extra =
            cost[pod] *
            2 *
            Math.max(
              0,
              Math.min(location, end) - j,
              j - Math.max(location, end)
            );
          if (budget === null || extra < budget) {
            const energy = penalty(
              roomSize,
              budget === null ? null : budget - extra,
              cloned
            );
            if (energy !== null) {
              const total = extra + energy;
              if (budget === null || total < budget) {
                budget = total;
              }
            }
          }
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

  return budget;
};

const minimum = (rooms: Pod[][]): number => {
  const move = [0, 0, 0, 0];
  let min = 0;
  for (let i = 0; i < rooms.length; ++i) {
    const room = rooms[i];
    let dirty = false;
    for (let j = 0; j < room.length; ++j) {
      const pod = room[j];
      const out = room.length - j;
      if (pod === types[i]) {
        if (dirty) {
          // to make our calculations in the search easier, we pretend in the
          // theoretical minimum that we can move out and then directly back in
          // without moving one space to the side
          min += cost[pod] * (out + /* 2 + */ ++move[i]);
        }
      } else {
        dirty = true;
        const k = types.indexOf(pod);
        min += cost[pod] * (out + 2 * Math.abs(k - i) + ++move[k]);
      }
    }
  }
  return min;
};

export const organize = (rooms: Pod[][]): number | null => {
  const c1 = minimum(rooms);
  const c2 = penalty(rooms[0].length, null, {
    rooms,
    hall: Array(11).fill(null),
  });
  return c2 === null ? null : c1 + c2;
};
