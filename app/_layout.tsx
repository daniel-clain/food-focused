import { Stack } from "expo-router"
import { GameProvider } from "./game-context/GameContext"

type InGameRouteParams = {
  level: number
}

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack
        screenOptions={{
          contentStyle: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Welcome to Food Focused" }}
        />
        <Stack.Screen
          name="(LevelSelect)/LevelSelect"
          options={{ title: "Select a Level" }}
        />
        <Stack.Screen name="(options)/options" options={{ title: "Options" }} />
        <Stack.Screen
          name="(InGame)/InGame"
          options={({ route }) => {
            const params = route.params as InGameRouteParams
            console.log("params", params.level)
            return { title: `Level ${params.level}` }
          }}
        />
      </Stack>
    </GameProvider>
  )
}
