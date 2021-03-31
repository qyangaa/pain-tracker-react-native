import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

export default function Backdrop({ scrollX, screenWidth, bgs }) {
  // [0, width, with*2 ...]
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * screenWidth),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    />
  );
}
