import { GameState } from "./game"
import { useGameController } from '../game-context/game-context-sub-modules/gameController';

export type GameContextType = GameState & GameActions

export type GameActions = ReturnType<typeof useGameController>
