import { Snailfish, getInput } from "./shared.ts";

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

type Action =
  | {
      kind: "explode";
      x: Snailfish;
      left?: number;
      right?: number;
    }
  | {
      kind: "split";
      x: Snailfish;
    }
  | {
      kind: "reduced";
    };

const action = (x: Snailfish, depth: number): Action => {
  if (typeof x === "number") {
    if (x > 9) {
      return { kind: "split", x: [Math.floor(x / 2), Math.ceil(x / 2)] };
    } else {
      return { kind: "reduced" };
    }
  } else {
    const [left, right] = x;
    if (depth >= 4) {
      if (typeof left === "number" && typeof right === "number") {
        return { kind: "explode", x: 0, left, right };
      } else {
        throw new Error(`too deep: ${depth}`);
      }
    } else {
      const lAction = action(left, depth + 1);
      if (lAction.kind === "explode") {
        const ret: Action = {
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
      } else if (lAction.kind === "split") {
        return { kind: "split", x: [lAction.x, right] };
      } else {
        const rAction = action(right, depth + 1);
        if (rAction.kind === "explode") {
          const ret: Action = {
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
        } else if (rAction.kind === "split") {
          return { kind: "split", x: [left, rAction.x] };
        } else {
          return { kind: "reduced" };
        }
      }
    }
  }
};

const reduce = (x: Snailfish): Snailfish => {
  let y = x;
  while (true) {
    const act = action(y, 0);
    if (act.kind === "reduced") {
      return y;
    } else {
      y = act.x;
    }
  }
};

const add = (x: Snailfish, y: Snailfish): Snailfish => {
  return reduce([x, y]);
};

const magnitude = (x: Snailfish): number => {
  if (typeof x === "number") {
    return x;
  } else {
    const [left, right] = x;
    return 3 * magnitude(left) + 2 * magnitude(right);
  }
};

console.log(magnitude(getInput().reduce(add)));
