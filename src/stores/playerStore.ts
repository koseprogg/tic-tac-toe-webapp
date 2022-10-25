import { CellValue } from "../ultimateGame/types";
import { derived, writable } from "svelte/store";
import { game } from "./gameStore";

export const xPlayer = writable("");
export const oPlayer = writable("");

export const currentPlayer = derived(
  [game, xPlayer, oPlayer],
  ([game, xPlayer, oPlayer]) =>
    game.current === CellValue.X ? xPlayer : oPlayer
);
