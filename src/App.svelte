<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import { Board } from "./game/board";
  import { TicTacToe } from "./game/ticTacToe";
  import { CellValue } from "./game/types";
  import TicTacToeBoard from "./lib/TicTacToeBoard.svelte";
  let game = new TicTacToe(CellValue.X);
</script>

<main>
  <header>
    <h1>Ultimate Tic Tac Toe</h1>
  </header>
  <TicTacToeBoard {game} />
</main>

<style>
</style>
