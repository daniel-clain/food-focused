import { Level } from "./level"

export type GameState = {
  selectedLevel: Level | null
  levels: Level[]
}
