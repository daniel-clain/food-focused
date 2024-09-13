import { PropsWithChildren } from "react"
import { StyleSheet, View } from "react-native"

export function GameWrapper(props: PropsWithChildren) {
  return <View style={styles.wrapper}>{props.children}</View>
}

const styles = StyleSheet.create({
  wrapper: { width: "100%", alignItems: "center", gap: 20 },
})
