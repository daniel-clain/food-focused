export type Level = {
  number: number
  locked: boolean
  hasExercise: boolean
  duration: number
}
export function createLevel(
  levelNumber: number,
  overrides: Partial<Level> = {}
): Level {
  return {
    number: levelNumber,
    locked: true,
    hasExercise: false,
    duration: 5,
    ...overrides,
  }
}

export type ActiveLevel = Level & {
  timeLeft: number
  started: boolean
  failed: boolean
  completed: boolean
  paused: boolean
}
