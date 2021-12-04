import { getAllLines } from "../shared.ts";

export const size = 5;

export type Row = [number, number, number, number, number];
export type Board = [Row, Row, Row, Row, Row];

// note: these two type guard functions are unchecked
const isRow = (row: number[]): row is Row => row.length === size;
const isBoard = (board: Row[]): board is Board => board.length === size;

export type Input = {
  numbers: number[];
  boards: Board[];
};

export const getInput = (): Input => {
  // include trailing newline
  const lines = getAllLines();
  const numbers = lines[0].split(",").map((n) => parseInt(n));

  const boards: Board[] = [];
  let board: Row[] = [];
  // skip numbers and blank line
  for (let i = 2; i < lines.length; ++i) {
    const line = lines[i];
    if (line) {
      const row = line
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n));
      if (isRow(row)) {
        board.push(row);
      } else {
        throw new Error(`wrong number of numbers in row: ${line}`);
      }
    } else if (isBoard(board)) {
      boards.push(board);
      board = [];
    } else {
      throw new Error(`wrong number of rows in board: ${board.length}`);
    }
  }

  return { numbers, boards };
};

type Cell = {
  row: number;
  col: number;
  marked: boolean;
};

type Margin = Row;

type Playing = {
  cells: Map<number, Cell>;
  rows: Margin;
  cols: Margin;
  won: boolean;
};

const score = (board: Playing, called: number): number => {
  let sum = 0;
  for (const [n, cell] of board.cells.entries()) {
    if (!cell.marked) {
      sum += n;
    }
  }
  return sum * called;
};

const prepare = (board: Board): Playing => {
  const cells = new Map<number, Cell>();
  for (let row = 0; row < board.length; ++row) {
    const r = board[row];
    for (let col = 0; col < r.length; ++col) {
      const n = r[col];
      if (cells.has(n)) {
        throw new Error(`duplicate number in board: ${n}`);
      }
      cells.set(n, { row, col, marked: false });
    }
  }
  return {
    cells,
    rows: [0, 0, 0, 0, 0],
    cols: [0, 0, 0, 0, 0],
    won: false,
  };
};

export const play = (input: Input): number[] => {
  const { numbers, boards } = input;
  const playing = boards.map(prepare);

  const scores = [];
  for (const n of numbers) {
    for (const board of playing) {
      if (!board.won) {
        const cell = board.cells.get(n);
        if (cell) {
          if (cell.marked) {
            throw new Error(`duplicate number: ${n}`);
          }
          cell.marked = true;
          const r = ++board.rows[cell.row];
          const c = ++board.cols[cell.col];
          if (r >= size || c >= size) {
            board.won = true;
            scores.push(score(board, n));
          }
        }
      }
    }
  }
  return scores;
};
