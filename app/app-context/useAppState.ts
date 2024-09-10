import { Level } from "@/app/game-modules/level"
import { initialLevels } from "@/app/game-modules/levels"
import { useState } from "react"

export function useAppState() {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [levels, setLevels] = useState<Level[]>(initialLevels)

  return {
    levels,
    currentLevel,
    setCurrentLevel,
  }
}

export type UseAppStateType = ReturnType<typeof useAppState>
