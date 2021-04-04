import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Modal, ScrollView } from "react-native";
import AppLoading from "expo-app-loading";
import styles from "./TrackerScreen.styles";
import IconsContainer from "../common/IconsContainer";
import * as Font from "expo-font";

import Search from "../common/Search";

const searchIconUrl =
  "https://firebasestorage.googleapis.com/v0/b/pain-tracker-934d3.appspot.com/o/assets%2Futility_icons%2Fsearch%2Fsearch_outline_ldpi.png?alt=media";

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
            // flex: 0.8,
            marginTop: data.options.length > 6 ? "2%" : "10%",
            marginHorizontal: "10%",
            height: screenHeight * 0.55,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
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
                      fontSize: 18,
                      color: "white",
                      fontFamily: "sans-serif-light",
                      textAlign: "center",
                    }}
                  >
                    {option.title}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
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
      <View style={{ position: "absolute", top: screenHeight * 0.8 }}>
        <Pressable
          style={{
            height: 30,
            width: 30,
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
    </View>
  );
}
