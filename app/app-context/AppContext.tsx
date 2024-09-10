import { createContext, ReactNode, useContext } from "react"
import { Level } from "../game-modules/level"
import { useAppState, UseAppStateType } from "./useAppState"

type AppContextType = {
  levels: Level[]
  currentLevel: Level | null
  selectLevel: (level: Level) => void
  returnToLevelSelect: () => void
  nextLevel: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const appState: UseAppStateType = useAppState()

  function returnToLevelSelect() {
    appState.setCurrentLevel(null)
  }
  function nextLevel() {
    console.log("next level not implemented")
    appState.setCurrentLevel(null)
  }
  const contextValue: AppContextType = {
    levels: appState.levels,
    currentLevel: appState.currentLevel,
    selectLevel: (level: Level) => appState.setCurrentLevel(level),
    returnToLevelSelect,
    nextLevel,
  }
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
