import { useLevelContext } from "@/app/level-context/levelContext"
import Meter from "./components/Meter"

export function CharacterStats() {
  const {
    levelState: {
      characterStats: {
        happiness,
        fullness,
        energy,
        health,
        fatness,
        muscleTone,
        bodyStress,
        foodAddiction,
      },
      visibleStats,
    },
  } = useLevelContext()
  return (
    <>
      <Meter {...{ label: "Happiness", value: happiness, color: "yellow" }} />

      <Meter {...{ label: "Fullness", value: fullness, color: "pink" }} />

      {visibleStats.includes("energy") && (
        <Meter {...{ label: "Energy", value: energy, color: "blue" }} />
      )}

      {visibleStats.includes("health") && (
        <Meter {...{ label: "Health", value: health, color: "green" }} />
      )}

      {visibleStats.includes("fatness") && (
        <Meter {...{ label: "Fatness", value: fatness, color: "red" }} />
      )}

      {visibleStats.includes("muscleTone") && (
        <Meter
          {...{ label: "Muscle Tone", value: muscleTone, color: "orange" }}
        />
      )}

      {visibleStats.includes("bodyStress") && (
        <Meter
          {...{ label: "Body Stress", value: bodyStress, color: "purple" }}
        />
      )}

      {visibleStats.includes("foodAddiction") && (
        <Meter
          {...{ label: "Food Addiction", value: foodAddiction, color: "pink" }}
        />
      )}
    </>
  )
}
