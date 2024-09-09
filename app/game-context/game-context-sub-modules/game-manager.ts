import { Level } from "./level"
import { UseGameStateType } from "./useGameState"

export class GameManager {
  constructor(private gameState: UseGameStateType) {}

  startLevel(level: Level) {
    this.gameState.currentLevel = level
  }
}
