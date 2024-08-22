// src/GameContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
export type FoodOption = {
  type: "healthy" | "junk" | "neutral"
  happinessBoost: number
  calories: number
}
export type Level = {
  id: number // Unique identifier for the level
  duration: number // Duration of the level in seconds
  happinessGoal: number // Happiness level objective
  foodOptions: FoodOption[] // Array of food options for the level
}

interface GameContextType {
  currentLevel: Level | null
  setCurrentLevel: (level: Level) => void
  timeLeft: number
  happiness: number
  foodOptions: FoodOption[]
  startLevel: () => void
  handleFoodSelection: (food: FoodOption) => void
  levelStatus: "success" | "failure" | null
  resetLevel: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

function generateFoodOptions(level: Level): FoodOption[] {
  return [
    {
      type: "healthy",
      happinessBoost: 1,
      calories: 10,
    },
    {
      type: "neutral",
      happinessBoost: 5,
      calories: 30,
    },
    {
      type: "junk",
      happinessBoost: 10,
      calories: 100,
    },
  ]
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [happiness, setHappiness] = useState(0)
  const [foodOptions, setFoodOptions] = useState<FoodOption[]>([])
  const [levelStatus, setLevelStatus] = useState<"success" | "failure" | null>(
    null
  )

  useEffect(() => {
    if (!currentLevel) return

    setTimeLeft(currentLevel.duration)
    setFoodOptions(generateFoodOptions(currentLevel))
  }, [currentLevel])

  useEffect(() => {
    if (timeLeft <= 0) {
      if (happiness >= (currentLevel?.happinessGoal || 0)) {
        setLevelStatus("success")
      } else {
        setLevelStatus("failure")
      }
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft])

  const startLevel = () => {
    // Initialize or restart level
    if (currentLevel) {
      setFoodOptions(generateFoodOptions(currentLevel))
    }
  }

  const handleFoodSelection = (food: FoodOption) => {
    setHappiness((prev) => prev + food.happinessBoost)
    // Handle food selection logic
  }

  const resetLevel = () => {
    // Reset game state for a new level
    setHappiness(0)
    setTimeLeft(currentLevel?.duration || 0)
    setLevelStatus(null)
  }

  return (
    <GameContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        timeLeft,
        happiness,
        foodOptions,
        startLevel,
        handleFoodSelection,
        levelStatus,
        resetLevel,
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
