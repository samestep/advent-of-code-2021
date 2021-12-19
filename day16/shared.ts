import { getLines } from "../shared.ts";

export const getInput = (): string =>
  getLines()[0]
    .split("")
    .map(
      (c) =>
        ({
          "0": "0000",
          "1": "0001",
          "2": "0010",
          "3": "0011",
          "4": "0100",
          "5": "0101",
          "6": "0110",
          "7": "0111",
          "8": "1000",
          "9": "1001",
          A: "1010",
          B: "1011",
          C: "1100",
          D: "1101",
          E: "1110",
          F: "1111",
        }[c])
    )
    .join("");

export type Packet = { version: number } & (
  | {
      typeID: 0 | 1 | 2 | 3;
      subpackets: Packet[];
    }
  | {
      typeID: 4;
      value: number;
    }
  | {
      typeID: 5 | 6 | 7;
      subpackets: [Packet, Packet];
    }
);

export type Parsed = {
  packet: Packet;
  index: number;
};

const isPair = <T>(l: T[]): l is [T, T] => l.length === 2;

export const parse = (transmission: string, index: number): Parsed => {
  const version = parseInt(transmission.substr(index, 3), 2);
  const typeID = parseInt(transmission.substr(index + 3, 3), 2);
  if (typeID === 4) {
    let i = index + 6;
    const groups = [];
    while (transmission[i] === "1") {
      groups.push(transmission.substr(i + 1, 4));
      i += 5;
    }
    groups.push(transmission.substr(i + 1, 4));
    return {
      packet: { version, typeID, value: parseInt(groups.join(""), 2) },
      index: i + 5,
    };
  } else {
    const subpackets = [];
    let i = index;
    if (transmission[index + 6] === "0") {
      const l = parseInt(transmission.substr(index + 7, 15), 2);
      i += 22;
      while (i < index + 22 + l) {
        const parsed = parse(transmission, i);
        subpackets.push(parsed.packet);
        i = parsed.index;
      }
    } else {
      const n = parseInt(transmission.substr(index + 7, 11), 2);
      i += 18;
      for (let j = 0; j < n; ++j) {
        const parsed = parse(transmission, i);
        subpackets.push(parsed.packet);
        i = parsed.index;
      }
    }
    if (typeID === 5 || typeID === 6 || typeID === 7) {
      if (!isPair(subpackets)) {
        throw new Error(
          `bad number of subpackets for type ID ${typeID}: ${subpackets.length}`
        );
      }
      return { packet: { version, typeID, subpackets }, index: i };
    } else if (typeID === 0 || typeID === 1 || typeID === 2 || typeID === 3) {
      return { packet: { version, typeID, subpackets }, index: i };
    } else {
      throw new Error(`unexpected type ID: ${typeID}`);
    }
  }
};
