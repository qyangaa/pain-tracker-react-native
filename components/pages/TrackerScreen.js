import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./TrackerScreen.styles";

export default function TrackerScreen({ data, screenWidth, screenHeight }) {
  return (
    <View
      style={{
        width: screenWidth,
        alignItems: "center",
      }}
    >
      <View style={{ flex: 0.3, alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 24,
            marginTop: 100,
            color: "white",
          }}
        >
          {data.title}
        </Text>
      </View>
      <View style={{ flex: 0.87, justifyContent: "center" }}>
        <Image
          source={{
            uri: data.backgroundImage,
          }}
          style={{
            width: screenWidth / 2,
            height: screenHeight / 2,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
}
