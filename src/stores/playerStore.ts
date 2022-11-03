import { CellValue } from "../ultimateGame/types";
import { derived, writable } from "svelte/store";
import { game } from "./gameStore";
import { debounce } from "../util/debounce";
import { fetchGroupName } from "../util/fetchGroupName";

export const xPlayer = writable("");
export const oPlayer = writable("");

const fetchXPlayerName = debounce(async (url, set) => {
  const name = await fetchGroupName(url);
  set(name || "");
}, 1000);

export const xPlayerName = derived(
  xPlayer,
  ($xPlayer, set) => {
    fetchXPlayerName($xPlayer, set);
  },
  ""
);

const fetchOPlayerName = debounce(async (url, set) => {
  const name = await fetchGroupName(url);
  set(name || "");
}, 1000);

export const oPlayerName = derived(
  oPlayer,
  ($oPlayer, set) => {
    fetchOPlayerName($oPlayer, set);
  },
  ""
);

export const currentPlayer = derived(
  [game, xPlayer, oPlayer],
  ([game, xPlayer, oPlayer]) =>
    game.current === CellValue.X ? xPlayer : oPlayer
);
