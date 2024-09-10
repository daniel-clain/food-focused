import { useGameContext } from "@/app/game-context/GameContext"
import { Pressable, Text } from "react-native"

export function PauseButton() {
  const { pauseLevel } = useGameContext()
  return (
    <Pressable onPress={pauseLevel}>
      <Text>Pause</Text>
    </Pressable>
  )
}
