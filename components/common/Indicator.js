import React from "react";
import { View, Text } from "react-native";

export default function Indicator({ curIdx, count, bgs }) {
  //   console.log({ scrollX });
  return (
    <View
      style={{
        position: "absolute",
        bottom: 50,
        flexDirection: "row",
      }}
    >
      {[...Array(count).keys()].map((_, i) => (
        <View
          key={`indicator-${i}`}
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: i === curIdx ? bgs[i] : "#333",
            margin: 5,
          }}
        ></View>
      ))}
    </View>
  );
}
