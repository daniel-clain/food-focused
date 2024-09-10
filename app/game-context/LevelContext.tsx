import { createContext, ReactNode, useContext } from "react"
import { ActiveLevel, Level } from "../game-modules/level"
import {
  UseLevelStateType,
  useLevelState,
} from "./level-context-sub-modules/useLevelState"

type LevelContextType = {
  level: ActiveLevel
  startLevel: () => void
  pauseLevel: () => void
  unpauseLevel: () => void
}

const LevelContext = createContext<LevelContextType | undefined>(undefined)

export function LevelProvider({
  level,
  children,
}: {
  level: Level
  children: ReactNode
}) {
  const levelState: UseLevelStateType = useLevelState(level)

  const contextValue: LevelContextType = levelState
  return (
    <LevelContext.Provider value={contextValue}>
      {children}
    </LevelContext.Provider>
  )
}

export function useLevelContext() {
  const context = useContext(LevelContext)
  if (!context) {
    throw new Error("useLevelContext must be used within a LevelProvider")
  }
  return context
}
