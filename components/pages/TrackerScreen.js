import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import styles from "./TrackerScreen.styles";
import IconsContainer from "../common/IconsContainer";

export default function TrackerScreen({
  data,
  screenWidth,
  screenHeight,
  onToggleOption,
}) {
  return (
    <View
      style={{
        width: screenWidth,
        alignItems: "center",
        paddingBottom: 100,
      }}
    >
      <Text>Tracker Screen</Text>
      <View style={{ flex: 0.3, alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 40,
            marginTop: 100,
            color: "white",
          }}
        >
          {data.title}
        </Text>
        <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: "10%",
            marginHorizontal: "10%",
          }}
        >
          {data.options &&
            data.options.map((option) => (
              <Pressable
                key={"pressable" + option._id}
                onPress={() => onToggleOption(option._id, option.categoryId)}
                style={{
                  width: data.options.length > 4 ? "30%" : "40%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  // backgroundColor: "blue",
                  height: 100,
                  marginVertical: `${40 / data.options.length}%`,
                }}
              >
                <Image
                  key={"icon" + option._id}
                  style={{
                    width: 100,
                    height: "100%",
                    backgroundColor: option.selected ? "white" : "transparent",
                  }}
                  source={{
                    uri:
                      "https://img.icons8.com/windows/100/000000/smile-beam.png",
                  }}
                />
                <Text
                  key={"text" + option._id}
                  style={{ marginTop: 15, fontSize: 20, color: "white" }}
                >
                  {option.title}
                </Text>
              </Pressable>
            ))}
        </View>
      </View>
      <View style={{ flex: 0.87, justifyContent: "center" }}></View>
    </View>
  );
}
