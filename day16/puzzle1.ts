import { Packet, getInput, parse } from "./shared.ts";

const versionSum = (packet: Packet): number =>
  packet.version +
  (packet.typeID === 4
    ? 0
    : packet.subpackets.map(versionSum).reduce((a, b) => a + b, 0));

console.log(versionSum(parse(getInput(), 0).packet));
