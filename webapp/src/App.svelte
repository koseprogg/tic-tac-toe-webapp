<script lang="ts">
  import { TicTacToe } from "./game/ticTacToe";
  import { CellValue } from "./game/types";
  import PlayerController from "./lib/PlayerController.svelte";
  import TicTacToeBoard from "./lib/TicTacToeBoard.svelte";
  import { game } from "./stores/gameStore";
  import JSConfetti from "js-confetti";

  const jsConfetti = new JSConfetti();

  let currentWinner = "";
  game.subscribe((game) => {
    if (game.winner !== currentWinner && game.winner !== CellValue.Empty) {
      jsConfetti.addConfetti();
    }
    currentWinner = game.winner;
  });

  const restartGame = () => {
    currentWinner = "";
    game.update((gm) => {
      gm.restart();
      return gm;
    });
  };
</script>

<main>
  <header>
    <h1>Tic Tac Toe</h1>
  </header>
  {#if $game.winner !== CellValue.Empty}
    <div class="winner">
      <h2>The winner is {$game.winner}!</h2>
    </div>
  {/if}
  <TicTacToeBoard />
  <PlayerController />
  <button on:click={restartGame}> Restart </button>
</main>

<style>
  button {
    font-size: large;
    margin: 10px;
    padding: 10px;
  }
  main {
    text-align: center;
  }
</style>
