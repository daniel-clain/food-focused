import React from "react"
import { Button, Modal, StyleSheet, Text, View } from "react-native"

type Props = {
  visible: boolean
  onStart: () => void
}
export default function LevelStartModal({ visible, onStart }: Props) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Ready to start the level?</Text>
          <Button title="Start" onPress={onStart} />
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
