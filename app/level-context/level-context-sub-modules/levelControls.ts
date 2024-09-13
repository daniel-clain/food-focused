import { LevelState } from "@/app/game-types/level"
import { UseLevelTimerType } from "./levelTimer"

export function useLevelControls(
  levelTimer: UseLevelTimerType,
  levelState: LevelState,
  setLevelState: React.Dispatch<React.SetStateAction<LevelState>>
) {
  function startLevel() {
    levelTimer.start(levelState.duration)
    setLevelState((prev) => ({
      ...prev,
      started: true,
    }))
  }
  function pauseLevel() {
    levelTimer.pause()
    setLevelState((prev) => ({
      ...prev,
      paused: true,
    }))
  }
  function unpauseLevel() {
    levelTimer.unpause()
    setLevelState((prev) => ({
      ...prev,
      paused: false,
    }))
  }

  return {
    startLevel,
    pauseLevel,
    unpauseLevel,
  }
}

export type UseLevelControlsType = ReturnType<typeof useLevelControls>
