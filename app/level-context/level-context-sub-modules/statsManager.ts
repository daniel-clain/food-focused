import { CharacterStats } from "@/app/game-types/stats"
import { useEffect, useRef } from "react"
import { UseLevelTimerType } from "./levelTimer"

export function useStatsManager(
  updateCharacterStats: (
    func: (prevCharStats: CharacterStats) => CharacterStats
  ) => void,
  levelTimer: UseLevelTimerType
) {
  const lastUpdateTime = useRef<number | null>(null)

  const elapsedTime = useRef<number>(0)

  const fullnessLastUpdateTime = useRef<number | null>(null)

  const fullnessElapsedTime = useRef<number>(0)

  useEffect(() => {
    if (levelTimer.paused) {
      if (lastUpdateTime.current !== null) {
        elapsedTime.current += Date.now() - lastUpdateTime.current
      }
      lastUpdateTime.current = null
    } else {
      lastUpdateTime.current = Date.now()
      if (fullnessLastUpdateTime.current === null) {
        fullnessLastUpdateTime.current = Date.now()
      }
    }
  }, [levelTimer.paused])

  useEffect(() => {
    if (!levelTimer.paused) {
      if (lastUpdateTime.current === null) {
        lastUpdateTime.current = Date.now()
      }

      const interval = setInterval(() => {
        const now = Date.now()

        // Calculate time passed since last update
        const timeSinceLastUpdate =
          lastUpdateTime.current !== null ? now - lastUpdateTime.current : 0
        const timeSinceLastFullnessUpdate =
          fullnessLastUpdateTime.current !== null
            ? now - fullnessLastUpdateTime.current
            : 0

        // Accumulate the total elapsed time
        elapsedTime.current += timeSinceLastUpdate
        fullnessElapsedTime.current += timeSinceLastFullnessUpdate

        lastUpdateTime.current = now
        fullnessLastUpdateTime.current = now

        // Update stats
        updateCharacterStats((prevStats) => ({
          ...prevStats,
          happiness: calcHappiness(prevStats),
          fullness: calcFullness(
            prevStats.fullness,
            fullnessElapsedTime.current
          ), // Use fullnessElapsedTime here
          energy: calcEnergy(prevStats.energy),
          fatness: calcFatness(prevStats),
          muscleTone: calcMuscleTone(prevStats.muscleTone),
          health: calcHealth(prevStats.health),
          bodyStress: calcBodyStress(prevStats.bodyStress, elapsedTime.current),
          foodAddiction: calcFoodAddiction(prevStats.foodAddiction),
        }))
      }, 1000) // Adjust interval to suit your update frequency

      return () => clearInterval(interval)
    } else {
      lastUpdateTime.current = null
    }
  }, [levelTimer.paused])

  // Abstracted calculation functions
  function calcFoodAddiction(foodAddiction: number) {
    return Math.max(foodAddiction - 0.5, 0)
  }

  function calcHappiness({
    happiness,
    energy,
    fatness,
    muscleTone,
    health,
    bodyStress,
    foodAddiction,
  }: CharacterStats) {
    const baseDecayRate = 1
    const energyDecayRate = Math.pow(1.2, Math.max(0, (20 - energy) / 20))
    const fatnessDecayRate = Math.pow(1.5, fatness / 100)
    const muscleToneBoostRate =
      fatness < 20 ? Math.pow(1.3, muscleTone / 10) : 1
    const healthDecayRate = health < 5 ? Math.pow(1.5, (5 - health) / 5) : 1
    const healthBoostRate = health > 80 ? Math.pow(1.1, (health - 80) / 20) : 1
    const bodyStressDecayRate = Math.pow(1.2, bodyStress / 10)
    const addictionDecayRate =
      foodAddiction > 80 ? Math.pow(1.5, (foodAddiction - 80) / 20) : 1

    const finalHappinessDecay =
      baseDecayRate *
      energyDecayRate *
      fatnessDecayRate *
      muscleToneBoostRate *
      healthDecayRate *
      healthBoostRate *
      bodyStressDecayRate *
      addictionDecayRate

    return Math.max(happiness - finalHappinessDecay, 0)
  }

  function calcEnergy(energy: number) {
    return Math.max(energy - 1, 0) // Reduce energy over time
  }

  function calcFatness({ fatness, energy }: CharacterStats) {
    if (energy > 80) {
      const surplus = energy - 80
      return Math.min(fatness + surplus * 0.1, 100)
    } else if (energy < 20) {
      return Math.max(fatness - (20 - energy) * 0.1, 0)
    }
    return fatness
  }

  function calcMuscleTone(muscleTone: number) {
    return Math.max(muscleTone - 0.1, 0) // Gradual muscle tone decrease
  }

  function calcHealth(health: number) {
    return Math.max(health - 0.05, 0) // Gradual health decrease
  }
  function calcFullness(fullness: number, totalElapsedTime: number) {
    const elapsedSeconds = totalElapsedTime / 1000 // Convert ms to seconds
    let decayRate

    if (elapsedSeconds < 2) {
      decayRate = 0.5 // Slow initial decay for the first 2 seconds
    } else {
      // Increase the quadratic term's exponent or multiplier to make the decay faster
      decayRate = 0.5 + Math.pow(elapsedSeconds - 2, 2.5) / 50
    }

    return Math.max(fullness - decayRate, 0)
  }

  function calcBodyStress(bodyStress: number, totalElapsedTime: number) {
    const elapsedSeconds = totalElapsedTime / 1000 // Convert ms to seconds
    let decayRate

    if (elapsedSeconds < 2) {
      decayRate = 0.5 // Slow initial decay for the first 2 seconds
    } else {
      // Make the exponential decay steeper for more rapid acceleration
      decayRate = 0.5 + (Math.pow(1.2, elapsedSeconds - 2) - 1) / 50
    }

    return Math.max(bodyStress - decayRate, 0)
  }
}

export type UseCharacterStatsType = ReturnType<typeof useStatsManager>
