<script lang="ts">
  import type { CellValue, Move } from "../game/types";
  import type { MakeOptional } from "../util/makeOptional";
  import { game } from "../stores/ultimateGameStore";
  import { currentPlayer, xPlayer } from "../stores/playerStore";
  //create board object that is easy to use in svelte
  // It is a 3x3 array of 3x3 arrays (with a field for winner of the subBoard)

  const makeMove = (move: MakeOptional<Move, "player">) => {
    game.update((gm) => {
      gm.makeMove(move);
      return gm;
    });
  };

  let board;
  game.subscribe((game) => {
    board = [];
    for (let x = 0; x < 3; x++) {
      board.push([]);
      for (let y = 0; y < 3; y++) {
        const subBoard = {
          winner: game.getSuperCell(x, y),
          cells: [],
        };
        for (let i = 0; i < 3; i++) {
          subBoard.cells.push([]);
          for (let j = 0; j < 3; j++) {
            subBoard.cells[i].push(game.getCell(x * 3 + i, y * 3 + j));
          }
        }
        board[x].push(subBoard);
      }
    }
  });
</script>

<main>
  <div class="board">
    {#each board as superRow, x}
      <div class="row">
        {#each superRow as subBoard, y}
          <div class="subBoard">
            <div class="subBoardWinner">
              {subBoard.winner}
            </div>
            {#each subBoard.cells as row, i}
              <div class="subRow">
                {#each row as cell, j}
                  <div
                    class="cell"
                    class:clickable={$game.legalMoves.some(
                      (move) => move.x === x * 3 + i && move.y === y * 3 + j
                    )}
                    on:click={$currentPlayer == ""
                      ? () => makeMove({ x: x * 3 + i, y: y * 3 + j })
                      : () => {
                          throw new Error("Bot's turn");
                        }}
                  >
                    {cell}
                  </div>
                {/each}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</main>

<style>
  .cell {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  main {
    display: flex;
    justify-content: center;
  }
  .board {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .row {
    display: flex;
    gap: 10px;
  }
  .subBoard {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .subBoardWinner {
    font-size: 150px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: absolute;
    width: 100%;
    pointer-events: none;
  }
  .subRow {
    display: flex;
  }

  .clickable {
    background-color: #09501027;
  }
</style>
