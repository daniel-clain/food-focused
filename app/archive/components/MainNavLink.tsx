import { Href, Link } from "expo-router"
import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

type Props = {
  to: Href<string>
  children: string
}

export function MainNavLink({ children, to }: Props) {
  return (
    <Link href={to} asChild>
      <TouchableOpacity style={styles.linkContainer}>
        <Text style={styles.linkText}>{children}</Text>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  linkContainer: {
    marginVertical: 8,
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 18,
    color: "#318aea",
    fontWeight: "bold",
    textAlign: "center",
  },
})
