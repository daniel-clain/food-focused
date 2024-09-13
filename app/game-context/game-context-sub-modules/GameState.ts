import { useState } from "react"
import { Level } from "../../game-types/level"
import { initialLevels } from "../../levels/levels"

export function useGameState() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [levels, setLevels] = useState<Level[]>(initialLevels)
  console.log("selectedLevel", selectedLevel)
  return {
    gameState: {
      levels,
      selectedLevel,
    },
    setSelectedLevel,
    setLevels,
  }
}

export type UseGameStateType = ReturnType<typeof useGameState>
