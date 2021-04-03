import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Modal } from "react-native";
import AppLoading from "expo-app-loading";
import styles from "./TrackerScreen.styles";
import IconsContainer from "../common/IconsContainer";
import * as Font from "expo-font";

import Search from "../common/Search";

const searchIconUrl =
  "https://firebasestorage.googleapis.com/v0/b/pain-tracker-934d3.appspot.com/o/assets%2Futility_icons%2Fsearch%2Fsearch_solid_ldpi.png?alt=media";

export default function TrackerScreen({
  data,
  screenWidth,
  screenHeight,
  onToggleOption,
  curIdx,
  bgs,
}) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      indieflower_regular: {
        uri: require("../../assets/fonts/indieflower_regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    return () => {};
  }, []);

  if (!fontsLoaded) return <AppLoading />;
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        alignItems: "center",
        paddingBottom: 100,
      }}
    >
      <View style={{ flex: 0.2, alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 40,
            marginTop: 50,
            color: "white",
            fontFamily: "sans-serif",
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
                    height: 100,
                    width: 100,
                  }}
                  source={{
                    uri: option.selected ? option.srcActive : option.src,
                  }}
                />
                <Text
                  key={"text" + option._id}
                  style={{
                    marginTop: 15,
                    fontSize: 20,
                    color: "white",
                    fontFamily: "sans-serif-light",
                  }}
                >
                  {option.title}
                </Text>
              </Pressable>
            ))}
        </View>
      </View>
      <Modal visible={isSearchOpen} animationType="fade">
        <Search
          bgs={bgs}
          curIdx={curIdx}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
          categoryId={data._id}
          onClose={() => setIsSearchOpen(false)}
        />
      </Modal>
      <Pressable
        style={{
          height: 30,
          width: 30,
          top: screenHeight * 0.5,
        }}
        onPress={() => setIsSearchOpen(true)}
      >
        <Image
          source={{
            height: 30,
            width: 30,
            uri: searchIconUrl,
          }}
        />
      </Pressable>
    </View>
  );
}
