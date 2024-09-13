import React from "react"
import { StyleSheet, Text, View } from "react-native"

interface MeterProps {
  label: string
  value: number
  color: string
}

const Meter: React.FC<MeterProps> = ({ label, value, color }) => (
  <View style={styles.meterContainer}>
    <Text>
      {label}: {Math.round(value)}%
    </Text>
    <View style={styles.meter}>
      <View
        style={[
          styles.meterFill,
          { width: `${Math.round(value)}%`, backgroundColor: color },
        ]}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  meterContainer: {
    width: "100%",
    marginVertical: 4,
  },
  meter: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: 4,
  },
})

export default Meter
