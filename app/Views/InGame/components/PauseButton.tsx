import { useLevelContext } from "@/app/level-context/levelContext"
import { Pressable, StyleSheet, Text } from "react-native"

export function PauseButton() {
  const {
    levelFunctions: { pauseLevel },
  } = useLevelContext()
  return (
    <Pressable onPress={pauseLevel} style={styles.button}>
      <Text>Pause</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
})
