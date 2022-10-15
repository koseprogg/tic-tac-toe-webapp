import { CellValue, Move, Player, SubBoard, SuperBoard } from "./types";

class Board {
    private board: SuperBoard;
    
    constructor() {
        // Construct a 9x9 board of empty cells
        this.board = Array(9).fill(Array(9).fill(CellValue.Empty));
    }

    static calculateWinnerOfSubBoard(subBoard: SubBoard): CellValue {
        //Calculate winner of a 3x3 board
        const winningCombinations = [
            //Horizontal
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            //Vertical
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            //Diagonal
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]
        ];

        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
            if (subBoard[a[0]][a[1]] !== CellValue.Empty && subBoard[a[0]][a[1]] === subBoard[b[0]][b[1]] && subBoard[a[0]][a[1]] === subBoard[c[0]][c[1]]) {
                return subBoard[a[0]][a[1]];
            }
        }

        //If no winner is found
        return CellValue.Empty;

    }

    getCell(x: number, y: number): CellValue {
        return this.board[x][y];
    }

    doMove(move: Move): void {
        // Place a value on the board
        this.board[move.x][move.y] = move.player;
    }

    getSuperCell(x: number, y: number): CellValue {
        // Return the winner of the 3x3 board at (x, y)
        // 0,0 is the top left. 2,2 is the bottom right
        return Board.calculateWinnerOfSubBoard(
            this.board.splice(x * 3, 3)
            .map(row => row.splice(y * 3, 3))
        );
    }

    get winner(): CellValue {
        // Return the winner of the entire board
        let superBoards = Array(3).fill(Array(3));
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                superBoards[x][y] = this.getSuperCell(x, y);
            }
        }
        return Board.calculateWinnerOfSubBoard(superBoards);
    }

}

export { Board };
