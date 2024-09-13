import { createLevel, Level } from "../game-types/level"

const testLevels: Level[] = [
  createLevel({
    number: 1,
    locked: false,
    duration: 120,
    goalHappiness: 80,
    initialStats: {
      foodAddiction: 50,
      happiness: 50,
      energy: 50,
      fatness: 50,
      muscleTone: 50,
      health: 50,
    },
    visibleStats: ["energy", "fatness", "muscleTone", "bodyStress", "health"],
    exerciseOptionsEnabled: true,
  }),
]

const mainLevels: Level[] = [
  createLevel({
    number: 1,
    locked: false,
    duration: 5,
    goalHappiness: 10,
  }),
  createLevel({
    number: 2,
    duration: 5,
    goalHappiness: 20,
  }),
  createLevel({
    number: 3,
    duration: 40,
    goalHappiness: 50,
    visibleStats: ["energy", "fatness"],
  }),
  createLevel({
    number: 4,
    duration: 40,
    goalHappiness: 50,
    initialStats: {
      foodAddiction: 90,
      happiness: 50,
      energy: 50,
      fatness: 50,
      muscleTone: 50,
      health: 20,
    },
    visibleStats: ["energy", "fatness"],
  }),
  createLevel({
    number: 5,
    duration: 40,
    goalHappiness: 80,
    initialStats: {
      foodAddiction: 50,
      happiness: 50,
      energy: 50,
      fatness: 50,
      muscleTone: 50,
      health: 50,
    },
    visibleStats: ["energy", "fatness", "muscleTone", "bodyStress", "health"],
    exerciseOptionsEnabled: true,
  }),
  createLevel({
    number: 6,
    duration: 60,
    goalHappiness: 50,
    initialStats: {
      foodAddiction: 50,
      happiness: 50,
      energy: 50,
      fatness: 80,
      muscleTone: 20,
      health: 10,
    },
    visibleStats: ["energy", "fatness", "muscleTone", "bodyStress", "health"],
    exerciseOptionsEnabled: true,
  }),
]

export const initialLevels = testLevels
