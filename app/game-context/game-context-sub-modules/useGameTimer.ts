import { useCallback, useEffect, useRef, useState } from "react"

// Define the type for the timer hook
export function useGameTimer(
  initialTime: number,
  onTimerExpired: () => void,
  onTimeTickDown: (timeLeft: number) => void
) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    onTimeTickDown(timeLeft)
  }, [timeLeft])

  const startTimer = useCallback(() => {
    if (timerRef.current) return // Prevent multiple timers

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          onTimerExpired()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }, [onTimerExpired])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => stopTimer()
  }, [stopTimer])

  return { startTimer, stopTimer }
}
