import React from "react"
import { LevelButton } from "./components/LevelButton"
import { LevelSelectWrapper } from "./components/LevelSelectWrapper"
import { useAppContext } from "@/app/app-context/AppContext"

export function LevelSelect() {
  const { levels } = useAppContext()
  return (
    <LevelSelectWrapper>
      {levels.map((level) => (
        <LevelButton {...{ level, key: level.number }} />
      ))}
    </LevelSelectWrapper>
  )
}
