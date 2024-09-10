import { View } from "react-native"
import { useGameContext } from "./app-context/GameContext"
import { LevelProvider } from "./game-context/LevelContext"
import { GameInterface } from "./Views/In Game/InGame"
import { LevelSelect } from "./Views/Level Select/LevelSelect"

export default function Index() {
  const { currentLevel } = useGameContext()
  console.log("gameState.currentLevel", currentLevel)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {currentLevel ? (
        <LevelProvider {...{ level: currentLevel }}>
          <GameInterface />
        </LevelProvider>
      ) : (
        <LevelSelect />
      )}
    </View>
  )
}
