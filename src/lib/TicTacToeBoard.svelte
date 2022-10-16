<script lang="ts">
  //import { TicTacToe } from "src/game/ticTacToe";

  export let game;

  //create board object that is easy to use in svelte
  // It is a 3x3 array of 3x3 arrays (with a field for winner of the subBoard)
  const getBoard = (game) => {
    const board = [];
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
    console.log(board);

    return board;
  };

  $: board = getBoard(game);
  $: winner = game.winner;

  let makeMove = (x, y) => {
    game.makeMove({ x: x, y: y });
    game = game;
  };
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
                    on:click={() => makeMove(x * 3 + i, y * 3 + j)}
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
</style>
