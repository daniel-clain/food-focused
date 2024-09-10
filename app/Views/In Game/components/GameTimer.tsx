import { useGameContext } from "@/app/game-context/GameContext"
import { Text, View } from "react-native"

type Props = {
  isActive: boolean
}
export function GameTimer({ isActive }: Props) {
  const { level } = useGameContext()
  if (!isActive) return null
  return (
    <View>
      <Text>{level.timeLeft}</Text>
    </View>
  )
}
