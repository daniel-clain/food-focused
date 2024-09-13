import { GameState } from "@/app/game-types/game"
import { Level } from "@/app/game-types/level"

export function useGameController(
  gameState: GameState,
  setLevels: React.Dispatch<React.SetStateAction<Level[]>>,
  setSelectedLevel: React.Dispatch<React.SetStateAction<Level | null>>
) {
  function returnToLevelSelect() {
    setSelectedLevel(null)
  }
  function goToNextLevel() {
    const level = gameState.selectedLevel
    if (level != null) {
      const currentIndex = gameState.levels.findIndex(
        (l) => l.number === level.number
      )
      if (currentIndex >= 0 && currentIndex < gameState.levels.length - 1) {
        const nextLevel = gameState.levels[currentIndex + 1]
        console.log("next level set", nextLevel)
        setSelectedLevel(nextLevel)
      }
    }
  }

  function unlockNextLevel() {
    const level = gameState.selectedLevel
    if (level != null) {
      const currentIndex = gameState.levels.findIndex(
        (l) => l.number === level.number
      )
      if (currentIndex >= 0 && currentIndex < gameState.levels.length - 1) {
        const nextLevel = gameState.levels[currentIndex + 1]
        setLevels(
          gameState.levels.map((l) =>
            l.number === nextLevel.number ? { ...l, locked: false } : l
          )
        )
      }
    }
  }
  function selectLevel(level: Level) {
    setSelectedLevel(level)
  }
  return {
    returnToLevelSelect,
    goToNextLevel,
    unlockNextLevel,
    selectLevel,
  }
}
