import { getInput, organize } from "./shared.ts";

const rooms = getInput();
rooms[0].splice(1, 0, "D", "D");
rooms[1].splice(1, 0, "B", "C");
rooms[2].splice(1, 0, "A", "B");
rooms[3].splice(1, 0, "C", "A");
console.log(organize(4, 100000, { rooms, hall: Array(11).fill(null) }));
