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

// adapted from https://github.com/gameless/babel-forest/blob/v1.0.0/app/map.ts
export class JSONMap<K, V> {
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

export const getGrid = (): number[][] =>
  getLines().map((line) => line.split("").map((n) => parseInt(n)));
