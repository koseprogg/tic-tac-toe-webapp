enum CellValue {
  Empty = " ",
  X = "X",
  O = "O",
}

type PlayerPiece = CellValue.X | CellValue.O;

//This represents a 9x9 board
type Grid = CellValue[][];

type Move = {
  x: number;
  y: number;
  player: PlayerPiece;
};

export { CellValue };
export type { Grid, Move, PlayerPiece };
