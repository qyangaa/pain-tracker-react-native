import React from "react";
import { Animated, Image } from "react-native";

export default function Footer({ scrollX, screenWidth, screenHeight }) {
  return (
    <Animated.View
      style={{
        flex: 1,
        position: "absolute",
        bottom: 0,
        width: screenWidth,
        height: screenHeight / 4,
        padding: 0,
      }}
    >
      <Image
        source={require("../../assets/images/WavyBackground.png")}
        style={{
          width: "100%",
        }}
      />
    </Animated.View>
  );
}
