import { createContext, ReactNode, useContext } from "react"
import { Level, LevelState } from "../game-types/level"

import { UseLevelControlsType } from "./level-context-sub-modules/levelControls"
import { useLevelManager } from "./level-context-sub-modules/levelManager"
import { UsePlayerOptionsType } from "./level-context-sub-modules/playerOptions"

export type LevelContextType = {
  levelState: LevelState
  levelFunctions: UsePlayerOptionsType & UseLevelControlsType
}

const LevelContext = createContext<LevelContextType | undefined>(undefined)

export function LevelProvider({
  selectedLevel,
  children,
}: {
  selectedLevel: Level
  children: ReactNode
}) {
  const { levelState, levelFunctions } = useLevelManager(selectedLevel)

  const contextValue: LevelContextType = {
    levelState,
    levelFunctions,
  }
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
