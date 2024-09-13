import { useGameContext } from "@/app/game-context/gameContext"
import React from "react"
import { LevelButton } from "./components/LevelButton"
import { LevelSelectWrapper } from "./components/LevelSelectWrapper"

export function LevelSelect() {
  const { levels } = useGameContext()
  return (
    <LevelSelectWrapper>
      {levels.map((level) => (
        <LevelButton {...{ level, key: level.number }} />
      ))}
    </LevelSelectWrapper>
  )
}
