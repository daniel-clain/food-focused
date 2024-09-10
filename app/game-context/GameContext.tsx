import { createContext, ReactNode, useContext } from "react"
import { ActiveLevel, Level } from "../game-modules/level"
import {
  useGameState,
  UseGameStateType,
} from "./game-context-sub-modules/useGameState"

type GameContextType = {
  level: ActiveLevel
  startLevel: () => void
  pauseLevel: () => void
  unpauseLevel: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({
  level,
  children,
}: {
  level: Level
  children: ReactNode
}) {
  const gameState: UseGameStateType = useGameState(level)

  const contextValue: GameContextType = gameState
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
