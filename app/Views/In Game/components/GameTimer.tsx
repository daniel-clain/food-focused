import { useLevelContext } from "@/app/game-context/LevelContext"
import { Text, View } from "react-native"

type Props = {
  isActive: boolean
}
export function GameTimer({ isActive }: Props) {
  const { level } = useLevelContext()
  if (!isActive) return null
  return (
    <View>
      <Text>{level.timeLeft}</Text>
    </View>
  )
}
