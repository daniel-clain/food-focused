import { ExerciseOption, FoodOption } from "@/app/game-context/GameContext-old"

export function handleFoodSelection(
  option: FoodOption,
  setHappiness: React.Dispatch<React.SetStateAction<number>>,
  setEnergy: React.Dispatch<React.SetStateAction<number>>
) {
  setHappiness((prev) => prev + option.happiness)
  setEnergy((prev) => prev + option.calories)
}

export function handleExerciseSelection(
  option: ExerciseOption,
  setMuscleTone: React.Dispatch<React.SetStateAction<number>>,
  setEnergy: React.Dispatch<React.SetStateAction<number>>,
  setHappiness: React.Dispatch<React.SetStateAction<number>>,
  energy: number
) {
  let happinessDecrease = option.happinessCost

  if (energy < 20) {
    const deficit = 20 - energy
    happinessDecrease *= Math.pow(1.2, deficit)
  }

  setMuscleTone((prev) => prev + option.muscleToneBoost)
  setEnergy((prev) => prev - option.energyCost)
  setHappiness((prev) => prev - happinessDecrease)
}
