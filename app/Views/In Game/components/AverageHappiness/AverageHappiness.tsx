import { useLevelContext } from "@/app/level-context/LevelContext"
import { Text, View } from "react-native"

export function AverageHappiness() {
  const {
    levelState: { averageHappiness: h },
  } = useLevelContext()
  return (
    <View style={{ width: 200 }}>
      <Text>
        Average Happiness: {Math.round(h)}
        {h >= 80
          ? "😁"
          : h >= 60
          ? "😊"
          : h >= 40
          ? "😐"
          : h >= 20
          ? "😟"
          : "😢"}
      </Text>
    </View>
  )
}
