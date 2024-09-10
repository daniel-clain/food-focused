import { ActiveLevel, Level } from "@/app/game-modules/level"
import { useEffect, useRef, useState } from "react"
import { useLevelTimer } from "./useLevelTimer"

export function useLevelState(selectedLevel: Level) {
  const levelTimerInterval = useRef<NodeJS.Timeout | null>(null)
  const [level, setLevel] = useState<ActiveLevel>({
    timeLeft: selectedLevel.duration,
    completed: false,
    started: false,
    failed: false,
    paused: false,
    ...selectedLevel,
  })

  useEffect(() => {
    return () => {
      if (levelTimerInterval.current) clearInterval(levelTimerInterval.current)
    }
  }, [])
  function updateLevelProperty<K extends keyof ActiveLevel>(
    key: K,
    value: ActiveLevel[K]
  ) {
    setLevel((prevLevel) => ({
      ...prevLevel,
      [key]: value,
    }))
  }

  const { startTimer, stopTimer } = useLevelTimer(
    selectedLevel.duration,
    onTimerExpired,
    onTimeTickDown
  )

  function onTimeTickDown(timeLeft: number) {
    updateLevelProperty("timeLeft", timeLeft)
  }

  function onTimerExpired() {
    const levelCompleted = checkIfLevelCompleted()
    if (levelCompleted) {
      updateLevelProperty("completed", true)
    } else {
      updateLevelProperty("failed", true)
    }
  }

  function startLevel() {
    updateLevelProperty("started", true)
    startTimer()
  }

  function checkIfLevelCompleted(): boolean {
    return true
  }

  function pauseLevel() {
    updateLevelProperty("paused", true)
    stopTimer()
  }
  function unpauseLevel() {
    updateLevelProperty("paused", false)
    startTimer()
  }
  return {
    level,
    startLevel,
    pauseLevel,
    unpauseLevel,
  }
}

export type UseLevelStateType = ReturnType<typeof useLevelState>
