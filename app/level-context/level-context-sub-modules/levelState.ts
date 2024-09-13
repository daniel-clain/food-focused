import { Level, LevelState } from "@/app/game-types/level"
import { useEffect, useState } from "react"

export function useLevelState(selectedLevel: Level) {
  const [levelState, setLevelState] = useState<LevelState>(
    setNewLevel(selectedLevel)
  )

  useEffect(() => {
    setLevelState(setNewLevel(selectedLevel))
  }, [selectedLevel])

  useEffect(() => {
    setAverageHappiness()
  }, [levelState.characterStats.happiness])

  function setAverageHappiness() {
    setLevelState((prev) => {
      const timePassed = prev.duration - prev.timeLeft

      // Prevent division by zero if the level just started
      if (timePassed === 0) {
        return prev
      }

      // Calculate the weighted average
      const newAverageHappiness =
        (prev.averageHappiness * (prev.duration - timePassed) +
          prev.characterStats.happiness * timePassed) /
        prev.duration

      return { ...prev, averageHappiness: newAverageHappiness }
    })
  }

  function setNewLevel(selectedLevel: Level): LevelState {
    return {
      timeLeft: selectedLevel.duration,
      completed: false,
      started: false,
      failed: false,
      paused: false,
      foodOptions: [
        {
          type: "healthy",
          happiness: 10,
          calories: 20,
          healthBoost: 15,
          fullnessBoost: 50,
        },
        {
          type: "junk",
          happiness: 40,
          calories: 50,
          healthBoost: -10,
          fullnessBoost: 40,
        },
        {
          type: "neutral",
          happiness: 20,
          calories: 30,
          healthBoost: 5,
          fullnessBoost: 60,
        },
      ],
      exerciseOptions: [
        {
          type: "weight training",
          muscleToneBoost: 15,
          energyCost: 20,
          happinessCost: 15,
          healthBoost: 2,
          bodyStress: 50,
        },
        {
          type: "cardio",
          muscleToneBoost: 5,
          energyCost: 20,
          happinessCost: 5,
          healthBoost: 3,
          bodyStress: 20,
        },
      ],
      averageHappiness: selectedLevel.initialStats.happiness,
      characterStats: {
        bodyStress: 0,
        fullness: 0,
        ...selectedLevel.initialStats,
      },
      ...selectedLevel,
    }
  }

  return { levelState, setLevelState }
}

export type UseLevelStateType = ReturnType<typeof useLevelState>
