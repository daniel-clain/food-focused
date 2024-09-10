import { useEffect, useRef, useState } from "react"
import { ActiveLevel, Level } from "../../game-modules/level"
import { useGameTimer } from "./useGameTimer"

export function useGameState(selectedLevel: Level) {
  const gameTimerInterval = useRef<NodeJS.Timeout | null>(null)
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
      if (gameTimerInterval.current) clearInterval(gameTimerInterval.current)
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

  const { startTimer, stopTimer } = useGameTimer(
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

export type UseGameStateType = ReturnType<typeof useGameState>
