import { getLines } from "../shared.ts";

export type Snailfish = number | [Snailfish, Snailfish];

export const getInput = (): Snailfish[] =>
  getLines().map((line) => JSON.parse(line));

const addLeft = (x: Snailfish, n: number): Snailfish => {
  if (typeof x === "number") {
    return x + n;
  } else {
    const [left, right] = x;
    return [addLeft(left, n), right];
  }
};

const addRight = (x: Snailfish, n: number): Snailfish => {
  if (typeof x === "number") {
    return x + n;
  } else {
    const [left, right] = x;
    return [left, addRight(right, n)];
  }
};

type Reduced = { kind: "reduced" };

type Explode =
  | Reduced
  | {
      kind: "explode";
      x: Snailfish;
      left?: number;
      right?: number;
    };

const explode = (x: Snailfish, depth: number): Explode => {
  if (typeof x === "number") {
    return { kind: "reduced" };
  } else {
    const [left, right] = x;
    if (depth >= 4) {
      if (typeof left === "number" && typeof right === "number") {
        return { kind: "explode", x: 0, left, right };
      } else {
        throw new Error(`too deep: ${depth}`);
      }
    } else {
      const lAction = explode(left, depth + 1);
      if (lAction.kind === "explode") {
        const ret: Explode = {
          kind: "explode",
          x: [
            lAction.x,
            lAction.right === undefined ? right : addLeft(right, lAction.right),
          ],
        };
        if (lAction.left !== undefined) {
          ret.left = lAction.left;
        }
        return ret;
      } else {
        const rAction = explode(right, depth + 1);
        if (rAction.kind === "explode") {
          const ret: Explode = {
            kind: "explode",
            x: [
              rAction.left === undefined ? left : addRight(left, rAction.left),
              rAction.x,
            ],
          };
          if (rAction.right !== undefined) {
            ret.right = rAction.right;
          }
          return ret;
        } else {
          return { kind: "reduced" };
        }
      }
    }
  }
};

type Split =
  | Reduced
  | {
      kind: "split";
      x: Snailfish;
    };

const split = (x: Snailfish): Split => {
  if (typeof x === "number") {
    if (x > 9) {
      return { kind: "split", x: [Math.floor(x / 2), Math.ceil(x / 2)] };
    } else {
      return { kind: "reduced" };
    }
  } else {
    const [left, right] = x;
    const lAction = split(left);
    if (lAction.kind === "split") {
      return { kind: "split", x: [lAction.x, right] };
    } else {
      const rAction = split(right);
      if (rAction.kind === "split") {
        return { kind: "split", x: [left, rAction.x] };
      } else {
        return { kind: "reduced" };
      }
    }
  }
};

const reduce = (x: Snailfish): Snailfish => {
  let y = x;
  while (true) {
    const a1 = explode(y, 0);
    if (a1.kind === "reduced") {
      const a2 = split(y);
      if (a2.kind === "reduced") {
        return y;
      } else {
        y = a2.x;
      }
    } else {
      y = a1.x;
    }
  }
};

export const add = (x: Snailfish, y: Snailfish): Snailfish => {
  return reduce([x, y]);
};

export const magnitude = (x: Snailfish): number => {
  if (typeof x === "number") {
    return x;
  } else {
    const [left, right] = x;
    return 3 * magnitude(left) + 2 * magnitude(right);
  }
};
