import { useRouter } from "expo-router"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { View } from "react-native"
import { Level, useGameContext } from "../GameContext-old"
import { LevelTile } from "./components/LevelTile"

export default function LevelSelectold() {
  console.log("rerender")
  const gapSize = 10
  const containerRef: MutableRefObject<null | View> = useRef(null)
  const router = useRouter()
  const [tileSize, setTileSize] = useState<number>()
  const { setCurrentLevel, levels } = useGameContext() // Get levels from context
  useEffect(() => {
    setCurrentLevel(undefined)
  }, [])
  return (
    <View
      ref={containerRef}
      onLayout={({
        nativeEvent: {
          layout: { width: containerWidth },
        },
      }) => {
        setTileSize(getTileSize(containerWidth, gapSize))
      }}
      style={{
        gap: gapSize,
        flexWrap: "wrap",
        maxWidth: 500,
        width: "100%",
        flexDirection: "row",
      }}
    >
      {levels.map((level, i) => (
        <LevelTile
          onTilePress={handleLevelTilePress}
          key={i}
          level={level}
          tileSize={tileSize!}
        />
      ))}
    </View>
  )

  function handleLevelTilePress(level: Level) {
    setCurrentLevel(level) // Set the current level in the context
    router.push("/InGame") // Navigate to the InGame screen
  }
}

function getTileSize(containerWidth: number, gapSize: number): number {
  const numberOfCols = 4
  const tileSize =
    (containerWidth! - gapSize * (numberOfCols - 1)) / numberOfCols

  return tileSize
}
