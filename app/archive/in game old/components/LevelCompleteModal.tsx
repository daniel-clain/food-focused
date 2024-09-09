import React from "react"
import { Button, Modal, StyleSheet, Text, View } from "react-native"

type Props = {
  visible: boolean
  onBackSelected: () => void
}
export default function LevelCompleteModal({ visible, onBackSelected }: Props) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Congratulations!</Text>
          <Button title="Back To Level Select" onPress={onBackSelected} />
        </View>
      </View>
    </Modal>
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
