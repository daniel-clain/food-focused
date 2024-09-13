import { ExerciseOption } from "./exerciseOptions"
import { FoodOption } from "./foodOptions"
import { CharacterStats, InitialCharacterStats } from "./stats"

export type Level = {
  number: number
  locked: boolean
  duration: number
  initialStats: InitialCharacterStats
  visibleStats: StatNames[]
  goalHappiness: number
  exerciseOptionsEnabled: boolean
}
export type StatNames =
  | "happiness"
  | "energy"
  | "fatness"
  | "muscleTone"
  | "health"
  | "bodyStress"
  | "foodAddiction"
  | "fullness"

export function createLevel(overrides: LevelArgs): Level {
  return {
    locked: true,
    duration: 5,
    initialStats: {
      happiness: 10,
      energy: 10,
      fatness: 10,
      muscleTone: 0,
      health: 50,
      foodAddiction: 0,
    },
    goalHappiness: 80,
    exerciseOptionsEnabled: false,
    ...overrides,
    visibleStats: [
      "happiness",
      ...(overrides.visibleStats ? overrides.visibleStats : []),
    ],
  }
}

export type LevelState = Level & {
  averageHappiness: number
  timeLeft: number
  started: boolean
  failed: boolean
  completed: boolean
  paused: boolean
  characterStats: CharacterStats
  foodOptions: FoodOption[]
  exerciseOptions: ExerciseOption[]
}

type LevelArgs = Partial<Omit<Level, "number" | "characterStats">> &
  Pick<Level, "number"> & {
    visibleStats?: Exclude<StatNames, "happiness">[]
  }
