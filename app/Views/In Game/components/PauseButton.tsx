import { useLevelContext } from "@/app/game-context/LevelContext"
import { Pressable, Text } from "react-native"

export function PauseButton() {
  const { pauseLevel } = useLevelContext()
  return (
    <Pressable onPress={pauseLevel}>
      <Text>Pause</Text>
    </Pressable>
  )
}
