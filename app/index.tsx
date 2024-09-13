import { useGameContext } from "./game-context/gameContext"
import { LevelProvider } from "./level-context/levelContext"
import { InGame } from "./Views/In Game/InGame"
import { LevelSelect } from "./Views/Level Select/LevelSelect"

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
