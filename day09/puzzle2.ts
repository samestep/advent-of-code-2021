import { getInput, lowPoints } from "./shared.ts";

// adapted from https://github.com/gameless/babel-forest/blob/v1.0.0/app/map.ts
class JSONMap<K, V> {
  inner: Map<string, V>;

  // the original Map constructor takes any iterable, not just an array
  constructor(iterable?: [K, V][]) {
    this.inner = iterable
      ? new Map(iterable.map(([k, v]) => [JSON.stringify(k), v]))
      : new Map();
  }

  get size(): number {
    return this.inner.size;
  }

  clear() {
    this.inner.clear();
  }

  delete(key: K): boolean {
    return this.inner.delete(JSON.stringify(key));
  }

  // the original Map.entries returns an Iterator, not an array
  entries(): [K, V][] {
    return Array.from(this.inner.entries()).map(([k, v]) => [JSON.parse(k), v]);
  }

  // the original Map.forEach also takes a thisArg parameter
  forEach(callbackFn: (k: K, v: V, m: JSONMap<K, V>) => void) {
    this.entries().forEach(([k, v]) => callbackFn(k, v, this));
  }

  get(key: K): V | undefined {
    return this.inner.get(JSON.stringify(key));
  }

  has(key: K): boolean {
    return this.inner.has(JSON.stringify(key));
  }

  // the original Map.keys returns an Iterator, not an array
  keys(): K[] {
    return Array.from(this.inner.keys()).map((k) => JSON.parse(k));
  }

  set(key: K, value: V): JSONMap<K, V> {
    this.inner.set(JSON.stringify(key), value);
    return this;
  }

  // the original Map.values returns an Iterator, not an array
  values(): V[] {
    return Array.from(this.inner.values());
  }
}

const heightmap = getInput();

// map each position to all the positions that flow directly into it
const graph = new JSONMap<[number, number], [number, number][]>();
for (let i = 0; i < heightmap.length; ++i) {
  for (let j = 0; j < heightmap[i].length; ++j) {
    graph.set([i, j], []);
  }
}
for (let i = 0; i < heightmap.length; ++i) {
  for (let j = 0; j < heightmap[i].length; ++j) {
    if (heightmap[i][j] < 9) {
      const area = [
        [i, j],
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ].filter(
        ([i1, j1]) =>
          0 <= i1 &&
          i1 < heightmap.length &&
          0 <= j1 &&
          j1 < heightmap[i].length
      );
      const min = Math.min(...area.map(([i1, j1]) => heightmap[i1][j1]));
      for (const [i1, j1] of area) {
        if (!(i1 === i && j1 === j) && heightmap[i1][j1] <= min) {
          graph.get([i1, j1])!.push([i, j]);
        }
      }
    }
  }
}

const basins: number[] = [];
for (const lowPoint of lowPoints(heightmap)) {
  const basin = new JSONMap<[number, number], null>();
  const stack = [lowPoint];
  while (stack.length > 0) {
    const next = stack.pop()!;
    basin.set(next, null);
    stack.push(...graph.get(next)!.filter((neighbor) => !basin.has(neighbor)));
  }
  basins.push(basin.size);
}

basins.sort((a, b) => b - a);
console.log(basins[0] * basins[1] * basins[2]);
