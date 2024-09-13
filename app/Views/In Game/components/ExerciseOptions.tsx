import { useLevelContext } from "@/app/level-context/xevelContext"
import { Text, TouchableOpacity, View } from "react-native"

export function ExerciseOptions() {
  const {
    levelFunctions: { selectExerciseOption },
    levelState: {
      exerciseOptions,
      characterStats: { fullness },
    },
  } = useLevelContext()
  return (
    <View>
      {exerciseOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          disabled={fullness >= 100}
          onPress={() => selectExerciseOption(option)}
        >
          <Text>
            {option.type}: {option.muscleToneBoost} muscle tone,{" "}
            {option.energyCost} energy cost, {option.happinessCost} happiness
            cost, {option.bodyStress} body stress
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
