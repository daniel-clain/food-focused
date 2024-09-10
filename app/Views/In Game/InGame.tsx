import React from "react"

import { useLevelContext } from "../../game-context/LevelContext"
import { GameCharacter } from "./components/GameCharacter"
import { GameCharacterStats } from "./components/GameCharacterStats"
import { GameExerciseOptions } from "./components/GameExerciseOptions"
import { GameFoodOptions } from "./components/GameFoodOptions"
import { GameModal } from "./components/GameModal"
import { GameTimer } from "./components/GameTimer"
import { GameWrapper } from "./components/GameWrapper"
import { PauseButton } from "./components/PauseButton"
import { styles } from "./gameStyles"
export function GameInterface() {
  const { level } = useLevelContext()
  return (
    <>
      <GameModal
        isVisible={
          !level.started || level.failed || level.completed || level.paused
        }
      />

      <GameWrapper>
        <div style={styles.timerContainer}>
          <GameTimer isActive={level.started && !level.paused} />
          <PauseButton />
        </div>

        <div style={styles.characterContainer}>
          <GameCharacter />
        </div>

        <div style={styles.characterStatsContainer}>
          <GameCharacterStats />
        </div>

        <div style={styles.foodOptionsContainer}>
          <GameFoodOptions />
        </div>

        {level.hasExercise && (
          <div style={styles.exerciseOptionsContainer}>
            <GameExerciseOptions />
          </div>
        )}
      </GameWrapper>
    </>
  )
}
