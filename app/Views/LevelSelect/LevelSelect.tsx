import React from "react"
import { LevelButton } from "./components/LevelButton"
import { LevelSelectWrapper } from "./components/LevelSelectWrapper"
import { useGameContext } from "@/app/game-context/gameContext"

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
