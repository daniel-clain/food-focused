import React from "react"
import { StyleSheet, View } from "react-native"
import { useLevelContext } from "../../level-context/LevelContext"
import { AverageHappiness } from "./components/AverageHappiness/AverageHappiness"
import { Character } from "./components/Character/Character"
import { CharacterStats } from "./components/CharacterStats/CharacterStats"
import { ExerciseOptions } from "./components/ExerciseOptions"
import { FoodOptions } from "./components/FoodOptions"
import { GameModal } from "./components/GameModal/GameModal"
import { GameWrapper } from "./components/GameWrapper"
import { PauseButton } from "./components/PauseButton"
import { Timer } from "./components/Timer"

export function InGame() {
  const { levelState } = useLevelContext()
  return (
    <GameWrapper>
      <GameModal
        isVisible={
          !levelState.started ||
          levelState.failed ||
          levelState.completed ||
          levelState.paused
        }
      />
      <View style={styles.headerContainer}>
        <AverageHappiness />
        <Timer />
        <PauseButton />
      </View>

      <View style={styles.characterContainer}>
        <Character />
      </View>

      <View style={styles.characterStatsContainer}>
        <CharacterStats />
      </View>

      <View style={styles.foodOptionsContainer}>
        <FoodOptions />
      </View>

      {levelState.exerciseOptionsEnabled && (
        <View style={styles.exerciseOptionsContainer}>
          <ExerciseOptions />
        </View>
      )}
    </GameWrapper>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "#eeeeee",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  characterContainer: {},
  characterStatsContainer: {},
  foodOptionsContainer: {},
  exerciseOptionsContainer: {},
})
