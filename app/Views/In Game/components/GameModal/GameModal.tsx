import { useGameContext } from "@/app/game-context/GameContext"
import { useLevelContext } from "@/app/level-context/LevelContext"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
  isVisible: boolean
}
export function GameModal({ isVisible }: Props) {
  const {
    levelState: { number, goalHappiness, started, paused, completed, failed },
    levelFunctions: { startLevel, unpauseLevel },
  } = useLevelContext()
  const { returnToLevelSelect, goToNextLevel: nextLevel } = useGameContext()
  if (!isVisible) return null

  const gameStartView = (
    <>
      <Text style={styles.modalText}>Level {number}</Text>
      <Text style={styles.modalText}>Goal Happiness: {goalHappiness}</Text>
      <Pressable style={styles.button} onPress={startLevel}>
        <Text style={styles.textStyle}>Start</Text>
      </Pressable>
    </>
  )
  const gamePausedView = (
    <>
      <Text style={styles.modalText}>Level {number}</Text>

      <Text style={styles.modalText}>Paused</Text>

      <Text style={styles.modalText}>Goal Happiness: {goalHappiness}</Text>
      <Pressable style={styles.button} onPress={unpauseLevel}>
        <Text style={styles.textStyle}>Un Pause</Text>
      </Pressable>
    </>
  )
  const levelCompleteView = (
    <>
      <Text style={styles.modalText}>Level {number}</Text>

      <Text style={styles.modalText}>Complete!</Text>

      <Text style={styles.modalText}>Goal Happiness: {goalHappiness}</Text>
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
      <Text style={styles.modalText}>Level {number}</Text>

      <Text style={styles.modalText}>Goal Happiness: {goalHappiness}</Text>
      <Text style={styles.modalText}>Failed</Text>
      <Pressable style={styles.button} onPress={returnToLevelSelect}>
        <Text style={styles.textStyle}>Return to level select</Text>
      </Pressable>
    </>
  )
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {!started ? (
            gameStartView
          ) : paused ? (
            gamePausedView
          ) : completed ? (
            levelCompleteView
          ) : failed ? (
            levelFailedView
          ) : (
            <Text>Modal Error</Text>
          )}
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    marginTop: "10%",
    width: "40%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    gap: 20,
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
