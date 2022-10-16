import type { MakeOptional } from "../util/makeOptional";
import { Board } from "./board";
import { CellValue } from "./types";
import type { Move, Player } from "./types";

class TicTacToe {
  private board: Board;
  private currentPlayer: Player;
  private history: Array<Move>;
  constructor(startingPlayer: Player) {
    this.board = new Board();
    this.currentPlayer = startingPlayer;
    this.history = [];
  }

  makeMove(move: MakeOptional<Move, "player">): void {
    // Make a move on the board

    // Thow an error if trying to make a move with the wrong player
    if (move.player !== undefined && move.player !== this.currentPlayer) {
      throw new Error(`It is not ${move.player}'s turn`);
    }
    // Throw an error if the move is illegal

    if (
      !this.legalMoves.some(
        (legalMove) => legalMove.x === move.x && legalMove.y === move.y
      )
    ) {
      throw new Error("Illegal move");
    }

    this.board.doMove({ ...move, player: this.currentPlayer });
    this.history.push({ ...move, player: this.currentPlayer });
    this.currentPlayer =
      this.currentPlayer === CellValue.X ? CellValue.O : CellValue.X;
  }

  getCell(x: number, y: number): CellValue {
    return this.board.getCell(x, y);
  }

  getSuperCell(x: number, y: number): CellValue {
    return this.board.getSuperCell(x, y);
  }

  get winner(): CellValue {
    // Return the winner of the entire board
    return this.board.winner;
  }

  get current(): Player {
    return this.currentPlayer;
  }

  get legalMoves(): Array<Move> {
    // For the first move, all moves are legal
    if (this.history.length === 0) {
      return Array(81)
        .fill(0)
        .map((_, i) => {
          return {
            x: Math.floor(i / 9),
            y: i % 9,
            player: this.currentPlayer,
          };
        });
    }

    // If the board has a winner, no moves are legal
    if (this.board.winner !== CellValue.Empty) {
      return [];
    }

    // The previous move decides which 3x3 board is legal
    const previousMove = this.history[this.history.length - 1];

    const nextSubBoard = { x: previousMove.x % 3, y: previousMove.y % 3 };
    if (
      this.board.getSuperCell(nextSubBoard.x, nextSubBoard.y) ===
      CellValue.Empty
    ) {
      // If the subboard has no winner, you must play in that subboard
      const moves: Array<Move> = [];
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (
            this.board.getCell(
              x + nextSubBoard.x * 3,
              y + nextSubBoard.y * 3
            ) === CellValue.Empty
          ) {
            moves.push({
              x: x + nextSubBoard.x * 3,
              y: y + nextSubBoard.y * 3,
              player: this.currentPlayer,
            });
          }
        }
      }

      return moves;
    } else {
      // If the subboard has a winner, you can play anywhere that is empty and the subboard is not won
      const moves: Array<Move> = [];
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (
            this.board.getCell(x, y) === CellValue.Empty &&
            this.board.getSuperCell(Math.floor(x / 3), Math.floor(y / 3)) ===
              CellValue.Empty
          ) {
            moves.push({
              x,
              y,
              player: this.currentPlayer,
            });
          }
        }
      }
      return moves;
    }
  }
}

export { TicTacToe };
