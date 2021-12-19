import { Packet, getInput, parse } from "./shared.ts";

const evaluate = (packet: Packet): number => {
  const { typeID } = packet;
  if (typeID === 4) {
    return packet.value;
  } else {
    const values = packet.subpackets.map(evaluate);
    if (typeID === 0) {
      return values.reduce((a, b) => a + b, 0);
    } else if (typeID === 1) {
      return values.reduce((a, b) => a * b, 1);
    } else if (typeID === 2) {
      return Math.min(...values);
    } else if (typeID === 3) {
      return Math.max(...values);
    } else if (typeID === 5) {
      return values[0] > values[1] ? 1 : 0;
    } else if (typeID === 6) {
      return values[0] < values[1] ? 1 : 0;
    } else {
      return values[0] === values[1] ? 1 : 0;
    }
  }
};

console.log(evaluate(parse(getInput(), 0).packet));
