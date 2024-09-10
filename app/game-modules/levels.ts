import { createLevel, Level } from "./level"

export const initialLevels: Level[] = [
  createLevel(1, { locked: false }),
  createLevel(2),
]
