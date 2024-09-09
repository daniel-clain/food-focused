import React from "react"
import { Button, Modal, StyleSheet, Text, View } from "react-native"

type LevelModalProps = {
  visible: boolean
  title: string
  primaryActionLabel: string
  onPrimaryAction: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
}

export default function LevelModal({
  visible,
  title,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: LevelModalProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{title}</Text>
          <Button title={primaryActionLabel} onPress={onPrimaryAction} />
          {secondaryActionLabel && onSecondaryAction && (
            <Button title={secondaryActionLabel} onPress={onSecondaryAction} />
          )}
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
