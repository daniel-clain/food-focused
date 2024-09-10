import { useGameContext } from "@/app/app-context/GameContext"
import { useLevelContext } from "@/app/game-context/LevelContext"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
  isVisible: boolean
}
export function GameModal({ isVisible }: Props) {
  const { level, startLevel, unpauseLevel } = useLevelContext()
  const { returnToLevelSelect, nextLevel } = useGameContext()
  if (!isVisible) return null

  const gameStartView = (
    <>
      <Text style={styles.modalText}>Level {level.number}</Text>
      <Pressable style={styles.button} onPress={startLevel}>
        <Text style={styles.textStyle}>Start</Text>
      </Pressable>
    </>
  )
  const gamePausedView = (
    <>
      <Text style={styles.modalText}>Level {level.number}</Text>

      <Text style={styles.modalText}>Paused</Text>
      <Pressable style={styles.button} onPress={unpauseLevel}>
        <Text style={styles.textStyle}>Un Pause</Text>
      </Pressable>
    </>
  )
  const levelCompleteView = (
    <>
      <Text style={styles.modalText}>Level {level.number}</Text>

      <Text style={styles.modalText}>Complete!</Text>
      <Pressable style={styles.button} onPress={nextLevel}>
        <Text style={styles.textStyle}>Next Level</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={returnToLevelSelect}>
        <Text style={styles.textStyle}>Return to level select</Text>
      </Pressable>
    </>
  )
  const levelFailedView = (
    <>
      <Text style={styles.modalText}>Level {level.number}</Text>

      <Text style={styles.modalText}>Failed</Text>
      <Pressable style={styles.button} onPress={returnToLevelSelect}>
        <Text style={styles.textStyle}>Return to level select</Text>
      </Pressable>
    </>
  )
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!level.started ? (
              gameStartView
            ) : level.paused ? (
              gamePausedView
            ) : level.completed ? (
              levelCompleteView
            ) : level.failed ? (
              levelFailedView
            ) : (
              <Text>Modal Error</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
})
