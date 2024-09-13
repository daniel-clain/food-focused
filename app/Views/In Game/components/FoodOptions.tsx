import { useLevelContext } from "@/app/level-context/levelContext"
import { Text, TouchableOpacity, View } from "react-native"

export function FoodOptions() {
  const {
    levelFunctions: { selectFoodOption },
    levelState: {
      foodOptions,
      characterStats: { fullness },
    },
  } = useLevelContext()
  return (
    <View>
      {foodOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          disabled={fullness >= 100}
          onPress={() => selectFoodOption(option)}
        >
          <Text>
            {option.type}: {option.happiness} happiness, {option.calories}{" "}
            calories
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
