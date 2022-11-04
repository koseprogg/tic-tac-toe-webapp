import { CellValue } from "../ultimateGame/types";
import { writable } from "svelte/store";
import { TicTacToe } from "../ultimateGame/ticTacToe";

export const game = writable(new TicTacToe(CellValue.X));
