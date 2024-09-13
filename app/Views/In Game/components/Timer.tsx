import { useLevelContext } from "@/app/level-context/xevelContext"
import { Text, View } from "react-native"

export function Timer() {
  const { levelState } = useLevelContext()
  return (
    <View style={{ width: 200 }}>
      <Text>Time Left: {levelState.timeLeft}</Text>
    </View>
  )
}
