import { Level } from "@/app/game-context/game-types/level"
import { Pressable } from "react-native"
type Props = {
  level: Level
}
export function LevelButton({ level }: Props) {
  return <Pressable disabled={level.locked} onPress={game.startLevel(level)} />
}
