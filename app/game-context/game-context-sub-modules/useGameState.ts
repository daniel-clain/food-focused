import { useState } from "react"
import { initialLevels } from "./levels"
import { Level } from "./level"

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
