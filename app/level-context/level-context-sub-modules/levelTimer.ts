import { useCallback, useRef, useState } from "react"

export function useLevelTimer({
  onTimerExpired,
}: {
  onTimerExpired: () => void
}) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [paused, setPaused] = useState<boolean>(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback((duration: number) => {
    setTimeLeft(duration)
    startTimerCountdownLoop()
  }, [])

  const startTimerCountdownLoop = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime == null) {
          throw "timer should be set"
        }
        console.log("prev time", prevTime)
        if (prevTime <= 0) {
          console.log("expired")
          clearInterval(timerRef.current!)
          timerRef.current = null
          onTimerExpired()
          return null
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const pause = useCallback(() => {
    if (timerRef.current) {
      setPaused(true)
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const unpause = useCallback(() => {
    startTimerCountdownLoop()
  }, [])

  return { start, pause, unpause, timeLeft, paused }
}

export type UseLevelTimerType = ReturnType<typeof useLevelTimer>
