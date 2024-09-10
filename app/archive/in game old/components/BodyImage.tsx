/* import React from "react"
import { Image, StyleSheet } from "react-native"
import fatBody from "../../../../assets/images/fat.jpg"
import muscleBody from "../../../../assets/images/muscle.jpg"
import normalBody from "../../../../assets/images/normal.jpg"
import obeseBody from "../../../../assets/images/obese.jpg"
import overweightBody from "../../../../assets/images/overweight.jpg"

interface BodyImageProps {
  fatness: number
  muscleTone: number
}

const BodyImage: React.FC<BodyImageProps> = ({ fatness, muscleTone }) => {
  const getBodyImage = () => {
    if (fatness > 80) return obeseBody
    if (fatness > 60) return fatBody
    if (fatness > 40) return overweightBody
    if (muscleTone > 60) return muscleBody
    return normalBody
  }
  return (
    <Image
      source={getBodyImage()}
      style={styles.bodyImage}
      resizeMode="contain"
    />
  )
}

const styles = StyleSheet.create({
  bodyImage: {
    height: 248,
    marginBottom: 20,
  },
})

export default BodyImage
 */
