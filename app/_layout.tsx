import { Stack } from "expo-router"
import { GameProvider } from "./game-context/GameContext"

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
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </GameProvider>
  )
}
