/* // src/GameContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react"
import { Time } from "../(InGame)/components/Time"
export type FoodOption = {
  type: "healthy" | "junk" | "neutral"
  happiness: number
  calories: number
  healthBoost: number
}
export type Level = {
  levelNumber: number // Unique identifier for the level
  duration: number // Duration of the level in seconds
  happinessGoal: number // Happiness level objective
  foodOptions: FoodOption[] // Array of food options for the level
  isCompleted?: boolean
}

export type ExerciseOption = {
  type: "weight training" | "cardio" | "cardio"
  happinessCost: number
  muscleToneBoost: number
  energyCost: number
  healthBoost: number
  bodyStress: number
}

type GameContextType = {
  currentLevel: Level | undefined
  setCurrentLevel: (level: Level | undefined) => void
  levels: Level[] // Expose levels here
  markLevelCompleted: (level: Level) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Predefined levels array
export function GameProvider({ children }: { children: ReactNode }) {
  const [levels, setLevels] = useState<Level[]>([
    { levelNumber: 1, duration: 5, happinessGoal: 50, foodOptions: [] },
    { levelNumber: 2, duration: 40, happinessGoal: 60, foodOptions: [] },
    { levelNumber: 3, duration: 50, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 4, duration: 60, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 5, duration: 70, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 6, duration: 80, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 7, duration: 90, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 8, duration: 100, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 9, duration: 110, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 10, duration: 120, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 11, duration: 130, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 12, duration: 140, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 13, duration: 150, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 14, duration: 160, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 15, duration: 170, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 16, duration: 180, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 17, duration: 190, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 18, duration: 200, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 19, duration: 210, happinessGoal: 70, foodOptions: [] },
    { levelNumber: 20, duration: 220, happinessGoal: 70, foodOptions: [] },
  ])
  const [currentLevel, setCurrentLevel] = useState<Level | undefined>()
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const timeModule = new Time(0)

  function markLevelCompleted(level: Level) {
    setLevels((prevLevels) =>
      prevLevels.map((l) => {
        console.log("level", level.levelNumber)
        console.log("l", l.levelNumber)
        return l.levelNumber === level.levelNumber
          ? { ...level, isCompleted: true }
          : level
      })
    )
  }

  return (
    <GameContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        levels,
        markLevelCompleted,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
 */
