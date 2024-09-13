import { useGameContext } from "./game-context/gameContext"
import { LevelProvider } from "./level-context/levelContext"
import { InGame } from "./Views/InGame/InGame"
import { LevelSelect } from "./Views/LevelSelect/LevelSelect"

export default function Index() {
  const { selectedLevel } = useGameContext()
  console.log("index rerender", selectedLevel)
  return selectedLevel ? (
    <LevelProvider {...{ selectedLevel }}>
      <InGame />
    </LevelProvider>
  ) : (
    <LevelSelect />
  )
}
