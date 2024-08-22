import { Pressable, Text } from "react-native"

export function LevelTile(props: {
  levelNum: number
  tileSize: number
  onTilePress: (levelNum: number) => void
}) {
  return (
    <Pressable
      onPress={() => props.onTilePress(props.levelNum)}
      style={{
        width: props.tileSize,
        aspectRatio: 1,
        backgroundColor: "#a5d2ff",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{props.levelNum}</Text>
    </Pressable>
  )
}
