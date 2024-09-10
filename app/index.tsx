import { View } from "react-native"
import { GameProvider } from "./game-context/GameContext"
import { GameInterface } from "./Views/In Game/InGame"
import { LevelSelect } from "./Views/Level Select/LevelSelect"
import { useAppContext } from "./app-context/AppContext"

export default function Index() {
  const { currentLevel } = useAppContext()
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
        <GameProvider {...{ level: currentLevel }}>
          <GameInterface />
        </GameProvider>
      ) : (
        <LevelSelect />
      )}
    </View>
  )
}
