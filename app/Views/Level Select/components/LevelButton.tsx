import { useGameContext } from "@/app/game-context/GameContext"
import { Level } from "@/app/game-types/level"
import { Pressable, StyleSheet, Text } from "react-native"
type Props = {
  level: Level
}
export function LevelButton({ level }: Props) {
  const { selectLevel } = useGameContext()
  return (
    <Pressable
      style={[styles.button, level.locked && styles.buttonDisabled]}
      disabled={level.locked}
      onPress={() => selectLevel(level)}
    >
      <Text style={styles.text}>{level.number}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: { width: 50, height: 50, backgroundColor: "#a9d1ff" },
  buttonDisabled: { backgroundColor: "#808080" },
  text: { fontSize: 20 },
})
