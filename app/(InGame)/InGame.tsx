import { useRouter } from "expo-router"
import React, { useEffect } from "react"
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useGameContext } from "../game-context/GameContext"

export default function InGame() {
  const {
    currentLevel,
    timeLeft,
    happiness,
    foodOptions,
    startLevel,
    handleFoodSelection,
    levelStatus,
    resetLevel,
  } = useGameContext()

  const [modalVisible, setModalVisible] = React.useState(false)

  const router = useRouter()

  useEffect(() => {
    if (levelStatus) {
      setModalVisible(true)
    }
  }, [levelStatus])

  return (
    <View style={styles.container}>
      <Text>Time Left: {timeLeft} seconds</Text>
      <Text>Happiness: {happiness}</Text>

      {foodOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleFoodSelection(option)}
        >
          <Text>
            {option.type}: {option.happinessBoost} happiness, {option.calories}{" "}
            calories
          </Text>
        </TouchableOpacity>
      ))}

      <Button title="Start" onPress={startLevel} />

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          {levelStatus === "success" ? (
            <View style={styles.modalContent}>
              <Text>Level Completed!</Text>
              <Button
                title="Back to Level Select"
                onPress={() => router.push("/LevelSelect")}
              />
              <Button
                title="Next Level"
                onPress={() =>
                  router.push({
                    pathname: "/InGame",
                    params: { level: currentLevel!.id + 1 },
                  })
                }
              />
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Text>Level Failed!</Text>
              <Button
                title="Back to Level Select"
                onPress={() => router.push("/LevelSelect")}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
})
