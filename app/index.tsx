import { View } from "react-native"
import { GameInterface } from "./Views/In Game/InGame"
import LevelSelect from "./archive/level select old/LevelSelectold"
import { GameProvider, useGameContext } from "./game-context/GameContext"

export default function Index() {
  const { currentLevel } = useGameContext()
  return (
    <GameProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {currentLevel ? <GameInterface /> : <LevelSelect />}
      </View>
    </GameProvider>
  )
}
