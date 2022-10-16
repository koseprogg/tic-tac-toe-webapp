enum CellValue {
  Empty = " ",
  X = "X",
  O = "O",
}

type Player = CellValue.X | CellValue.O;

//This represents a 9x9 board
type SuperBoard = CellValue[][];

//This represents a 3x3 board
type SubBoard = CellValue[][];

type Move = {
  x: number;
  y: number;
  player: Player;
};

export { CellValue };
export type { SuperBoard, SubBoard, Move, Player };
