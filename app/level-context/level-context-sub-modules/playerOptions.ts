import { ExerciseOption } from "@/app/game-types/exerciseOptions"
import { FoodOption } from "@/app/game-types/foodOptions"
import { CharacterStats } from "@/app/game-types/stats"

export function usePlayerOptions(
  updateCharacterStats: (
    func: (prevCharStats: CharacterStats) => CharacterStats
  ) => void
) {
  function selectFoodOption(option: FoodOption) {
    updateCharacterStats((prev) => {
      const { fullness, happiness, energy, health, foodAddiction } = prev
      return {
        ...prev,
        fullness: Math.min(fullness + option.fullnessBoost),
        happiness: Math.min(happiness + option.happiness),
        energy: Math.min(energy + option.calories, 100),
        health: Math.min(health + option.healthBoost, 100),
        foodAddiction: Math.min(
          foodAddiction + option.type === "junk"
            ? Math.min(foodAddiction + 10, 100)
            : 0,
          100
        ),
      }
    })
  }
  function selectExerciseOption(option: ExerciseOption) {
    updateCharacterStats((prev) => {
      const { bodyStress, happiness, energy, health, muscleTone } = prev

      let happinessDecrease = option.happinessCost
      if (energy < 20) {
        const deficit = 20 - energy
        const exponentialDecrease = Math.pow(1.2, deficit) // Exponential decrease with base 1.2
        happinessDecrease *= exponentialDecrease
      }
      return {
        ...prev,

        happiness: Math.min(happiness - happinessDecrease),
        energy: Math.min(energy - option.energyCost, 100),
        health: Math.min(health + option.healthBoost, 100),
        bodyStress: Math.min(bodyStress + option.bodyStress, 100),
        muscleTone: Math.min(muscleTone + option.muscleToneBoost, 100),
      }
    })
  }

  return { selectExerciseOption, selectFoodOption }
}

export type UsePlayerOptionsType = ReturnType<typeof usePlayerOptions>
