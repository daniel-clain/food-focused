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

export type LevelArgs = Partial<Omit<Level, "number" | "characterStats">> &
  Pick<Level, "number"> & {
    visibleStats?: Exclude<StatNames, "happiness">[]
  }
