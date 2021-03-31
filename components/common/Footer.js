import React from "react";
import { View, Text } from "react-native";
import WavyBackground from "../../assets/images/WavyBackground";

export default function Footer({ scrollX, screenWidth, screenHeight }) {
  console.log(screenWidth, screenHeight);
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        bottom: 0,
        width: screenWidth,
        height: screenHeight / 3,
        padding: 0,
      }}
    >
      <WavyBackground width="100%" height="100%" />
    </View>
  );
}
