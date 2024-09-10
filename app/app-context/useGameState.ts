import { useState } from "react"
import { Level } from "../game-modules/level"
import { initialLevels } from "../game-modules/levels"

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [levels, setLevels] = useState<Level[]>(initialLevels)

  return {
    levels,
    currentLevel,
    setCurrentLevel,
  }
}

export type UseGameStateType = ReturnType<typeof useGameState>
