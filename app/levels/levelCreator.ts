import { Level, LevelArgs } from "../game-types/level"

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
