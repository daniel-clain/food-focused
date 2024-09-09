import { createContext, ReactNode, useContext } from "react"
import { GameManager } from "./game-context-sub-modules/game-manager"
import { Level } from "./game-context-sub-modules/level"
import {
  useGameState,
  UseGameStateType,
} from "./game-context-sub-modules/useGameState"

type GameContextType = {
  levels: Level[]
  currentLevel: Level | null
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const gameState: UseGameStateType = useGameState()
  const gameManager = new GameManager(gameState)

  const contextValue: GameContextType = {
    levels: gameState.levels,
    currentLevel: gameState.currentLevel,
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
