import { getInput, orientAll } from "./shared.ts";

const scanners = getInput();
const oriented = orientAll(scanners);

const allBeacons = new Set<string>();
for (const { beacons } of oriented.values()) {
  for (const p of beacons) {
    allBeacons.add(JSON.stringify(p));
  }
}
console.log(allBeacons.size);
