import { createContext, ReactNode, useContext } from "react"
import { GameContextType } from "../game-types/gameContext"
import { useGameController } from "./game-context-sub-modules/gameController"
import {
  UseGameStateType,
  useGameState,
} from "./game-context-sub-modules/GameState"

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const { gameState, setLevels, setSelectedLevel }: UseGameStateType =
    useGameState()
  const gameActions = useGameController(gameState, setLevels, setSelectedLevel)

  const contextValue: GameContextType = {
    ...gameState,
    ...gameActions,
  }
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
