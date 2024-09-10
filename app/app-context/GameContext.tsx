import { createContext, ReactNode, useContext } from "react"
import { Level } from "../game-modules/level"
import { useGameState, UseGameStateType } from "./useGameState"

type GameContextType = {
  levels: Level[]
  currentLevel: Level | null
  selectLevel: (level: Level) => void
  returnToLevelSelect: () => void
  nextLevel: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const gameState: UseGameStateType = useGameState()

  function returnToLevelSelect() {
    gameState.setCurrentLevel(null)
  }
  function nextLevel() {
    console.log("next level not implemented")
    gameState.setCurrentLevel(null)
  }
  const contextValue: GameContextType = {
    levels: gameState.levels,
    currentLevel: gameState.currentLevel,
    selectLevel: (level: Level) => gameState.setCurrentLevel(level),
    returnToLevelSelect,
    nextLevel,
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
