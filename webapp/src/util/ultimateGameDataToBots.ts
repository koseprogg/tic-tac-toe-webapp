import type { TicTacToe } from "../ultimateGame/ticTacToe";

export const gameDataToBots = (game: TicTacToe): string => {
  // Get relevant game data as a JSON string
  console.log(new Array(9).fill(0).map((_, i) => i));
  const data = {
    board: new Array(9)
      .fill(0)
      .map((_, x) => new Array(9).fill(0).map((_, y) => game.getCell(x, y))),
    history: game.history,
    currentPlayer: game.current,
    legalMoves: game.legalMoves,
  };
  return JSON.stringify(data);
};
