import { CellValue } from "../game/types";
import { writable } from "svelte/store";
import { TicTacToe } from "../game/ticTacToe";

export const game = writable(new TicTacToe(CellValue.X));
