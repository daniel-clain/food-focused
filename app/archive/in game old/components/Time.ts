export class Time {
  private timeLeft: number
  private intervalId: NodeJS.Timeout | null = null

  constructor(timeLimit: number) {
    this.timeLeft = timeLimit
  }

  startCountdown(
    onTimeUpdate: (timeLeft: number) => void,
    onTimeEnd: () => void
  ) {
    this.intervalId = setInterval(() => {
      this.timeLeft -= 1
      onTimeUpdate(this.timeLeft)

      if (this.timeLeft <= 0) {
        clearInterval(this.intervalId!)
        onTimeEnd()
      }
    }, 1000)
  }

  stopCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  getTimeLeft() {
    return this.timeLeft
  }
}
