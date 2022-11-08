<script lang="ts">
  import {
    xPlayer,
    oPlayer,
    xPlayerName,
    oPlayerName,
    currentPlayer,
  } from "../stores/playerStore";
  import { game } from "../stores/gameStore";
  import { CellValue, type Move } from "../game/types";
  import { gameDataToBots } from "../util/gameDataToBots";

  let waitingForResponse = false;

  const makeBotMove = async () => {
    console.log(gameDataToBots($game));

    waitingForResponse = true;
    const response = await fetch($currentPlayer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: gameDataToBots($game),
    });
    waitingForResponse = false;
    await response.json().then((res: { move: Move }) => {
      game.update((gm) => {
        gm.makeMove(res.move);
        return gm;
      });
    });
  };
</script>

<div class="playerController">
  <h2>Players</h2>
  <div class="playerSelectors">
    <div class="xPlayerSelector" class:active={$game.current === CellValue.X}>
      <h3>
        X - Player {$xPlayer === "" ? "👨" : "🤖"}{$xPlayerName === ""
          ? ""
          : ": " + $xPlayerName}
      </h3>
      <input type="text" bind:value={$xPlayer} placeholder="URL" />
    </div>

    <div class="yPlayerSelector" class:active={$game.current === CellValue.O}>
      <h3>
        O - Player {$oPlayer === "" ? "👨" : "🤖"}{$oPlayerName === ""
          ? ""
          : ": " + $oPlayerName}
      </h3>
      <input type="text" bind:value={$oPlayer} placeholder="URL" />
    </div>
  </div>
  <button
    disabled={$currentPlayer === "" || waitingForResponse}
    on:click={() => makeBotMove()}>Next Move</button
  ><br />
</div>

<style>
  .playerController {
    text-align: center;
  }
  .playerSelectors {
    display: flex;
    justify-content: space-around;
  }
  .active {
    border: 1px solid black;
  }
  input {
    width: 500px;
    margin: 20px;
    padding: 10px;
    font-size: large;
  }
  button {
    font-size: large;
    margin: 10px;
    padding: 10px;
  }
</style>
