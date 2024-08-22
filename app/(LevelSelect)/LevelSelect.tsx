import { useRouter } from "expo-router"
import { MutableRefObject, useRef, useState } from "react"
import { View } from "react-native"
import { LevelTile } from "./components/LevelTile"

export default function LevelSelect() {
  console.log("rerender")
  const gapSize = 10
  const containerRef: MutableRefObject<null | View> = useRef(null)
  const router = useRouter()
  const [tileSize, setTileSize] = useState<number>()
  const levels = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
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
          levelNum={i + 1}
          tileSize={tileSize!}
        />
      ))}
    </View>
  )

  function handleLevelTilePress(levelNum: number) {
    router.push({
      pathname: "/InGame",
      params: { level: levelNum },
    })
  }
}

function getTileSize(containerWidth: number, gapSize: number): number {
  const numberOfCols = 4
  const tileSize =
    (containerWidth! - gapSize * (numberOfCols - 1)) / numberOfCols

  return tileSize
}
