import { useEffect } from "react"

export function useHappinessDecay(
  setHappiness: React.Dispatch<React.SetStateAction<number>>,
  fatness: number
) {
  useEffect(() => {
    const happinessDecayTimer = setInterval(() => {
      setHappiness((prevHappiness) =>
        Math.max(prevHappiness - (1 + fatness * 0.1), 0)
      )
    }, 1000)

    return () => clearInterval(happinessDecayTimer)
  }, [setHappiness, fatness])
}

export function useEnergyDecay(
  setEnergy: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    const energyDecayTimer = setInterval(() => {
      setEnergy((prevEnergy) => Math.max(prevEnergy - 1, 0))
    }, 1000)

    return () => clearInterval(energyDecayTimer)
  }, [setEnergy])
}

// Add other timer-based functions similarly.
