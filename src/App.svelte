<script lang="ts">
  import { get_custom_elements_slots } from "svelte/internal";
  import svelteLogo from "./assets/svelte.svg";
  import { Board } from "./ultimateGame/board";
  import { TicTacToe } from "./game/ticTacToe";
  import { CellValue } from "./game/types";
  import PlayerController from "./lib/PlayerController.svelte";
  import TicTacToeBoard from "./lib/TicTacToeBoard.svelte";
  import UltimateTicTacToeBoard from "./lib/UltimateTicTacToeBoard.svelte";
  let game = new TicTacToe(CellValue.X);
</script>

<main>
  <header>
    <h1>Tic Tac Toe</h1>
  </header>
  <TicTacToeBoard />
  <PlayerController />
</main>
