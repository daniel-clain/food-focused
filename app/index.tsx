import { View } from "react-native"
import { MainNavLink } from "./components/MainNavLink"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <MainNavLink to="/(LevelSelect)/LevelSelect">Level Select</MainNavLink>
      <MainNavLink to="/(options)/options">Options</MainNavLink>
    </View>
  )
}
