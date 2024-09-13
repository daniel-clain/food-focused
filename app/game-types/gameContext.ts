import { useGameController } from "../game-context/game-context-sub-modules/GameController"
import { GameState } from "./game"

export type GameContextType = GameState & GameActions

export type GameActions = ReturnType<typeof useGameController>
