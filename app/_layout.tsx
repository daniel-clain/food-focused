import { Stack } from "expo-router"
import { AppProvider } from "./app-context/AppContext"

export default function RootLayout() {
  return (
    <AppProvider>
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
    </AppProvider>
  )
}
