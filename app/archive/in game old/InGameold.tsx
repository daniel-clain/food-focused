import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ExerciseOption, FoodOption, useGameContext } from "../GameContext-old"
import LevelCompleteModal from "./components/LevelCompleteModal"
import LevelFailedModal from "./components/LevelFailedModal"
import LevelStartModal from "./components/LevelStartModal"

// Importing images for different body states
import { useRouter } from "expo-router"
import BodyImage from "./components/BodyImage"
import Meter from "./components/Meter"

export default function InGameold() {
  const { currentLevel, markLevelCompleted } = useGameContext()
  const router = useRouter()
  useEffect(() => {
    if (!currentLevel) {
      router.replace("/") // Redirect to the home screen
    }
  }, [currentLevel])
  if (!currentLevel) {
    return
  }
  const [timeLeft, setTimeLeft] = useState<number | undefined>()
  const [happiness, setHappiness] = useState(50)
  const [energy, setEnergy] = useState(20) // Starting energy level
  const [fatness, setFatness] = useState(50)
  const [muscleTone, setMuscleTone] = useState(5) // Starting muscle tone level
  const [health, setHealth] = useState(30) // New health meter
  const [foodOptions, setFoodOptions] = useState<FoodOption[]>([])
  const [exerciseOptions, setExerciseOptions] = useState<ExerciseOption[]>([])
  const [levelStarted, setLevelStarted] = useState(false)
  const [bodyStress, setBodyStress] = useState(0) // Body stress meter
  const [foodAddiction, setFoodAddiction] = useState(0)

  useEffect(() => {
    if (timeLeft === 0) {
      console.log(
        "happiness >= currentLevel.happinessGoal",
        happiness,
        currentLevel.happinessGoal
      )
      if (happiness >= currentLevel.happinessGoal) {
        console.log("level completed")
        currentLevel.isCompleted = true
      }
    }
  }, [timeLeft])

  useEffect(() => {
    if (levelStarted) {
      startHappinessMonitoring()
      startEnergyDecay()
      startMuscleToneMonitoring()
      startHealthMonitoring()
      startFoodOptionGeneration()
      startExerciseOptionGeneration()
      startFatnessMonitoring()
      startAddictionMonitoring()
      startBodyStressMonitoring()
    }
  }, [levelStarted])

  const handleFoodSelection = (option: FoodOption) => {
    setHappiness((prevHappiness) =>
      Math.min(prevHappiness + option.happiness, 100)
    )
    setEnergy((prevEnergy) => Math.min(prevEnergy + option.calories, 100)) // Cap energy at 100
    setHealth((prevHealth) => Math.min(prevHealth + option.healthBoost, 100))
    if (option.type === "junk") {
      setFoodAddiction((prevAddiction) => Math.min(prevAddiction + 10, 100))
    }
    setFoodOptions([])
  }

  function startHappinessMonitoring() {
    const happinessDecayTimer = setInterval(() => {
      setHappiness((prevHappiness) => {
        // Define decay rates and thresholds
        const baseDecayRate = 1
        const energyDecayRate = Math.pow(1.2, Math.max(0, (20 - energy) / 20))
        const fatnessDecayRate = Math.pow(1.5, fatness / 100)
        const muscleToneBoostRate =
          fatness < 20 ? Math.pow(1.3, muscleTone / 10) : 1
        const healthDecayRate = health < 5 ? Math.pow(1.5, (5 - health) / 5) : 1
        const healthBoostRate =
          health > 80 ? Math.pow(1.1, (health - 80) / 20) : 1
        const bodyStressDecayRate = Math.pow(1.2, bodyStress / 10)
        const addictionDecayRate =
          foodAddiction > 80 ? Math.pow(1.5, (foodAddiction - 80) / 20) : 1

        // Combine effects
        const finalHappinessDecay =
          baseDecayRate *
          energyDecayRate *
          fatnessDecayRate *
          muscleToneBoostRate *
          healthDecayRate *
          healthBoostRate *
          bodyStressDecayRate *
          addictionDecayRate

        return Math.max(prevHappiness - finalHappinessDecay, 0)
      })
    }, 1000)

    return () => clearInterval(happinessDecayTimer)
  }
  function startAddictionMonitoring() {
    const addictionDecayTimer = setInterval(() => {
      setFoodAddiction((prevAddiction) => Math.max(prevAddiction - 0.5, 0))
    }, 1000)

    return () => clearInterval(addictionDecayTimer)
  }

  function startBodyStressMonitoring() {
    const bodyStressStartTime = Date.now()
    const bodyStressDecayTimer = setInterval(() => {
      const elapsedTime = (Date.now() - bodyStressStartTime) / 1000 // Elapsed time in seconds
      const decayRate = elapsedTime < 2 ? 0.5 : Math.exp((elapsedTime - 2) / 10) // Slow decay for first 2 seconds, then exponential
      setBodyStress((prevStress) => Math.max(prevStress - decayRate, 0))
    }, 1000)

    return () => clearInterval(bodyStressDecayTimer)
  }

  function startEnergyDecay() {
    const energyDecayTimer = setInterval(() => {
      setEnergy((prevEnergy) => Math.max(prevEnergy - 1, 0)) // Decrease energy over time
    }, 1000) // Decay every second

    return () => clearInterval(energyDecayTimer)
  }

  function startHealthMonitoring() {
    const healthDecayTimer = setInterval(() => {
      setHealth((prevHealth) => Math.max(prevHealth - 0.05, 0)) // Decrease energy over time
    }, 1000) // Decay every second

    return () => clearInterval(healthDecayTimer)
  }
  function startMuscleToneMonitoring() {
    const muscleDecayTimer = setInterval(() => {
      setMuscleTone((prevMuscle) => Math.max(prevMuscle - 0.1, 0)) // Decrease energy over time
    }, 1000) // Decay every second

    return () => clearInterval(muscleDecayTimer)
  }

  function startFoodOptionGeneration() {
    const foodGenerationTimer = setInterval(() => {
      if (foodOptions.length === 0) {
        setFoodOptions(generateRandomFoodOptions())
      }
    }, 3000)

    return () => clearInterval(foodGenerationTimer)
  }

  function startExerciseOptionGeneration() {
    const exerciseGenerationTimer = setInterval(() => {
      setExerciseOptions(generateRandomExerciseOptions())
    }, 5000) // Generate new options every 5 seconds

    return () => clearInterval(exerciseGenerationTimer)
  }
  function startFatnessMonitoring() {
    const fatnessMonitoringTimer = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy > 80) {
          const surplus = prevEnergy - 80
          setFatness((prevFatness) =>
            Math.min(prevFatness + surplus * 0.1, 100)
          )
        } else if (prevEnergy < 20) {
          setFatness((prevFatness) =>
            Math.max(prevFatness - (20 - prevEnergy) * 0.1, 0)
          )
        }
        return prevEnergy
      })
    }, 1000)

    return () => clearInterval(fatnessMonitoringTimer)
  }

  function handleExerciseSelection(option: ExerciseOption) {
    let happinessDecrease = option.happinessCost

    if (energy < 20) {
      const deficit = 20 - energy
      const exponentialDecrease = Math.pow(1.2, deficit) // Exponential decrease with base 1.2
      happinessDecrease *= exponentialDecrease
    }

    setMuscleTone(muscleTone + option.muscleToneBoost)
    setEnergy(energy - option.energyCost)
    setHappiness((prevHappiness) => {
      return Math.max(prevHappiness - happinessDecrease, 0)
    })

    setBodyStress((prevStress) => Math.min(prevStress + option.bodyStress, 100))
  }

  function generateRandomFoodOptions(): FoodOption[] {
    return [
      { type: "healthy", happiness: 5, calories: 20, healthBoost: 15 },
      { type: "junk", happiness: 40, calories: 60, healthBoost: -10 },
      { type: "neutral", happiness: 20, calories: 30, healthBoost: 5 },
    ]
  }

  function generateRandomExerciseOptions(): ExerciseOption[] {
    return [
      {
        type: "weight training",
        muscleToneBoost: 15,
        energyCost: 20,
        happinessCost: 15,
        healthBoost: 2,
        bodyStress: 50,
      },
      {
        type: "cardio",
        muscleToneBoost: 5,
        energyCost: 20,
        happinessCost: 5,
        healthBoost: 3,
        bodyStress: 20,
      },
    ]
  }

  if (!currentLevel) return null // Handle case where currentLevel might be null

  return (
    <View style={styles.container}>
      <Text>Time Left: {timeLeft} seconds</Text>
      {/* Body Image */}
      <BodyImage fatness={fatness} muscleTone={muscleTone} />
      <Meter {...{ label: "Happiness", value: happiness, color: "yellow" }} />
      <Meter {...{ label: "Energy", value: energy, color: "blue" }} />
      <Meter {...{ label: "Health", value: health, color: "green" }} />
      <Meter {...{ label: "Fatness", value: fatness, color: "red" }} />
      <Meter
        {...{ label: "Muscle Tone", value: muscleTone, color: "orange" }}
      />
      <Meter
        {...{ label: "Body Stress", value: bodyStress, color: "purple" }}
      />
      <Meter
        {...{ label: "Food Addiction", value: foodAddiction, color: "pink" }}
      />
      {/* Food Options */}
      {foodOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleFoodSelection(option)}
        >
          <Text>
            {option.type}: {option.happiness} happiness, {option.calories}{" "}
            calories
          </Text>
        </TouchableOpacity>
      ))}
      {/* Exercise Options */}
      {exerciseOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleExerciseSelection(option)}
        >
          <Text>
            {option.type}: {option.muscleToneBoost} muscle tone,{" "}
            {option.energyCost} energy cost, {option.happinessCost} happiness
            cost
          </Text>
        </TouchableOpacity>
      ))}

      <LevelStartModal visible={!levelStarted} onStart={handleLevelStart} />
      <LevelFailedModal
        visible={timeLeft === 0 && happiness < currentLevel.happinessGoal}
        onRetrySelected={handleRetry}
        onBackSelected={handleBack}
      />
      <LevelCompleteModal
        visible={Boolean(currentLevel.isCompleted)}
        onBackSelected={handleBack}
      />
    </View>
  )

  function handleRetry() {
    setTimeLeft(currentLevel!.duration)
    startLevelTimer()
    setHappiness(50)
    setEnergy(20) // Reset energy
    setFatness(50) // Reset fatness
  }

  function handleBack() {
    router.push("/LevelSelect")
  }

  function handleLevelStart() {
    setLevelStarted(true)
    startLevelTimer()
  }

  function startLevelTimer() {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (!prevTime) return currentLevel!.duration
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
})
