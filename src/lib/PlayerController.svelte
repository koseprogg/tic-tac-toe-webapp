<script lang="ts">
  import { xPlayer, oPlayer, currentPlayer } from "../stores/playerStore";
  import { game } from "../stores/gameStore";
  import { CellValue, type Move } from "../game/types";
  import { gameDataToBots } from "../util/gameDataToBots";

  let xTimer;
  let oTimer;
  let xPlayerName = "";
  let oPlayerName = "";

  xPlayer.subscribe((value) => {
    clearTimeout(xTimer);
    xTimer = setTimeout(() => {
      if (value !== "") {
        // Do fetch name of player
        fetch($currentPlayer)
          .then((r) => r.json())
          .then((it) => (xPlayerName = it.groupName))
          .catch((err) => {});
      }
    }, 1000); // 1 second
  });

  oPlayer.subscribe((value) => {
    clearTimeout(oTimer);
    oTimer = setTimeout(() => {
      if (value !== "") {
        fetch($currentPlayer)
          .then((r) => r.json())
          .then((it) => (oPlayerName = it.groupName))
          .catch((err) => {});
      }
    }, 1000);
  });

  console.log(xPlayerName);

  const makeBotMove = async () => {
    console.log(gameDataToBots($game));

    const response = await fetch($currentPlayer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: gameDataToBots($game),
    });
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
        X - Player {$xPlayer === "" ? "👨" : "🤖"}{xPlayerName === ""
          ? ""
          : ": " + xPlayerName}
      </h3>
      <input type="text" bind:value={$xPlayer} placeholder="URL" />
    </div>

    <div class="yPlayerSelector" class:active={$game.current === CellValue.O}>
      <h3>
        O - Player {$oPlayer === "" ? "👨" : "🤖"}{oPlayerName === ""
          ? ""
          : ": " + oPlayerName}
      </h3>
      <input type="text" bind:value={$oPlayer} placeholder="URL" />
    </div>
  </div>
  <button disabled={$currentPlayer === ""} on:click={() => makeBotMove()}
    >Next Move</button
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
