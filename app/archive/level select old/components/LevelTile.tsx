import { Level } from "@/app/game-context/GameContext-old"
import { Pressable, Text } from "react-native"

export function LevelTile(props: {
  level: Level
  tileSize: number
  onTilePress: (level: Level) => void
}) {
  return (
    <Pressable
      onPress={() => props.onTilePress(props.level)}
      style={{
        width: props.tileSize,
        aspectRatio: 1,
        backgroundColor: "#a5d2ff",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{props.level.levelNumber}</Text>
    </Pressable>
  )
}
