import { StatNames } from "./level"

export type CharacterStats = Record<StatNames, number>

export type InitialCharacterStats = Omit<
  CharacterStats,
  "fullness" | "bodyStress"
>
