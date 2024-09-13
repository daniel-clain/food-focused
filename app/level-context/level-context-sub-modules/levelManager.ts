import { Level } from "@/app/game-types/level"
import { CharacterStats } from "@/app/game-types/stats"
import { useEffect } from "react"
import { useLevelControls } from "./levelControls"
import { useLevelState } from "./levelState"
import { useLevelTimer } from "./levelTimer"
import { usePlayerOptions } from "./playerOptions"
import { useStatsManager } from "./statsManager"
import { useGameContext } from "@/app/game-context/gameContext"

export function useLevelManager(selectedLevel: Level) {
  const { unlockNextLevel } = useGameContext()
  const { levelState, setLevelState } = useLevelState(selectedLevel)

  function updateCharacterStats(
    func: (prevCharStats: CharacterStats) => CharacterStats
  ) {
    setLevelState((prev) => ({
      ...prev,
      characterStats: func(prev.characterStats),
    }))
  }

  const levelTimer = useLevelTimer({ onTimerExpired: handleLevelFinished })

  useStatsManager(updateCharacterStats, levelTimer)

  useEffect(() => {
    setLevelState((prev) => {
      return {
        ...prev,
        timeLeft: levelTimer.timeLeft ?? prev.timeLeft,
        paused: levelTimer.paused,
      }
    })
  }, [levelTimer.timeLeft, levelTimer.paused])

  const levelControls = useLevelControls(levelTimer, levelState, setLevelState)

  const levelOptions = usePlayerOptions(updateCharacterStats)

  function handleLevelFinished() {
    setLevelState((prev) => {
      console.log("levelState.averageHappiness", prev.averageHappiness)
      console.log("levelState.goalHappiness", prev.goalHappiness)
      const isLevelCompleted = prev.averageHappiness >= prev.goalHappiness

      return {
        ...prev,
        ...(isLevelCompleted ? { completed: true } : { failed: true }),
      }
    })
  }

  useEffect(() => {
    if (levelState.completed) {
      unlockNextLevel()
    }
  }, [levelState.completed])

  return {
    levelState,
    levelFunctions: {
      ...levelControls,
      ...levelOptions,
    },
  }
}
