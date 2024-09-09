import React from "react"

import { GameProvider, useGameContext } from "../../game-context/GameContext"
import { GameCharacter } from "./components/GameCharacter"
import { GameCharacterStats } from "./components/GameCharacterStats"
import { GameExerciseOptions } from "./components/GameExerciseOptions"
import { GameFoodOptions } from "./components/GameFoodOptions"
import { GameModal } from "./components/GameModal"
import { GameTimer } from "./components/GameTimer"
import { GameWrapper } from "./components/GameWrapper"
import { styles } from "./gameStyles"

export function GameInterface() {
  const game = useGameContext()
  return (
    <GameProvider>
      <GameModal
        isVisible={
          !game.level.started ||
          game.level.failed ||
          game.level.completed ||
          game.level.paused
        }
      />

      <GameWrapper>
        <div style={styles.timerContainer}>
          <GameTimer isActive={game.level.started && !game.level.paused} />
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

        {game.level.hasExercise && (
          <div style={styles.exerciseOptionsContainer}>
            <GameExerciseOptions />
          </div>
        )}
      </GameWrapper>
    </GameProvider>
  )
}
